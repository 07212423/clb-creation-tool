import React, { useState } from 'react';
import { Steps, Form, Input, Select, Radio, Button, Card, message, Descriptions, Spin, Result } from 'antd';
import './App.css';

const { Step } = Steps;
const { Option } = Select;

const regions = [
  { name: '北京', value: 'ap-beijing' },
  { name: '南京', value: 'ap-nanjing' },
  { name: '上海', value: 'ap-shanghai' },
  { name: '广州', value: 'ap-guangzhou' },
  { name: '成都', value: 'ap-chengdu' },
  { name: '重庆', value: 'ap-chongqing' },
  { name: '中国香港', value: 'ap-hongkong' },
  { name: '新加坡', value: 'ap-singapore' },
  { name: '首尔', value: 'ap-seoul' },
  { name: '曼谷', value: 'ap-bangkok' },
  { name: '东京', value: 'ap-tokyo' },
  { name: '硅谷（美西）', value: 'na-siliconvalley' },
  { name: '弗吉尼亚（美东）', value: 'na-ashburn' },
  { name: '法兰克福', value: 'eu-frankfurt' },
];

const API_BASE_URL = '/api';

const App = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    region: 'ap-beijing',
    networkType: 'OPEN',
  });
  const [vpcs, setVpcs] = useState([]);
  const [subnets, setSubnets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [creationResult, setCreationResult] = useState(null);
  const [form] = Form.useForm();

  const fetchVpcs = async (authData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/vpcs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      });
      if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Failed to fetch VPCs');
      }
      const data = await response.json();
      setVpcs(data.Response?.VpcSet || []);
    } catch (error) {
      message.error(error.message);
      setVpcs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubnets = async (authData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/subnets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      });
       if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Failed to fetch Subnets');
      }
      const data = await response.json();
      setSubnets(data.Response?.SubnetSet || []);
    } catch (error) {
      message.error(error.message);
      setSubnets([]);
    } finally {
        setLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      const newFormData = { ...formData, ...values };
      setFormData(newFormData);

      if (current === 0) {
        const auth = { 
            secretId: newFormData.secretId, 
            secretKey: newFormData.secretKey, 
            region: newFormData.region 
        };
        await fetchVpcs(auth);
        await fetchSubnets(auth);
      }

      setCurrent(current + 1);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };
  
  const handleCreate = async () => {
    setCreating(true);
    const { secretId, secretKey, region, networkType, loadBalancerName, vpcId, subnetId } = formData;

    const payload = {
        LoadBalancerType: networkType,
        Forward: 1,
        LoadBalancerName: loadBalancerName,
        VpcId: vpcId,
        ProjectId: 0,
        AddressIPVersion: 'IPV4',
        Number: 1,
    };

    if (networkType === 'INTERNAL') {
        payload.SubnetId = subnetId;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/create-load-balancer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secretId, secretKey, region, payload }),
        });

        const result = await response.json();

        if (response.ok && result.Response && !result.Response.Error) {
            message.success('负载均衡创建成功!');
            setCreationResult({ status: 'success', data: result.Response });
        } else {
            throw new Error(result.Response?.Error?.Message || result.error || '创建失败');
        }
    } catch (error) {
        message.error(error.message);
        setCreationResult({ status: 'error', message: error.message });
    } finally {
        setCreating(false);
    }
  };

  const onValuesChange = (changedValues, allValues) => {
     const newFormData = { ...formData, ...allValues };
     setFormData(newFormData);

    if (changedValues.vpcId) {
        form.setFieldsValue({ subnetId: undefined });
    }
  };
  
  const resetApp = () => {
      setCurrent(0);
      setFormData({ region: 'ap-beijing', networkType: 'OPEN' });
      setVpcs([]);
      setSubnets([]);
      setCreationResult(null);
      form.resetFields();
  }

  const steps = [
    {
      title: '身份和地域',
      content: (
        <Form form={form} layout="vertical" initialValues={formData}>
          <Form.Item label="SecretId" name="secretId" rules={[{ required: true, message: '请输入SecretId' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="SecretKey" name="secretKey" rules={[{ required: true, message: '请输入SecretKey' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="地域" name="region" rules={[{ required: true, message: '请选择地域' }]}>
            <Select showSearch>
              {regions.map(r => <Option key={r.value} value={r.value}>{r.name} ({r.value})</Option>)}
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: '网络和配置',
      content: (
        <Spin spinning={loading}>
            <Form form={form} layout="vertical" initialValues={formData} onValuesChange={onValuesChange}>
            <Form.Item label="负载均衡名称" name="loadBalancerName" rules={[{ required: true, message: '请输入负载均衡名称' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="网络类型" name="networkType" rules={[{ required: true, message: '请选择网络类型' }]}>
                <Radio.Group>
                <Radio value="OPEN">公网</Radio>
                <Radio value="INTERNAL">内网</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="VPC" name="vpcId" rules={[{ required: true, message: '请选择VPC' }]}>
                <Select showSearch placeholder="请选择VPC">
                    {vpcs.map(vpc => <Option key={vpc.VpcId} value={vpc.VpcId}>{vpc.VpcName} ({vpc.VpcId})</Option>)}
                </Select>
            </Form.Item>
            {formData.networkType === 'INTERNAL' && (
                <Form.Item
                label="子网"
                name="subnetId"
                rules={[{ required: true, message: '请选择子网' }]}
                dependencies={['vpcId']}
                >
                <Select showSearch placeholder="请先选择VPC" disabled={!formData.vpcId || !subnets.length}>
                    {subnets
                        .filter(subnet => subnet.VpcId === formData.vpcId)
                        .map(subnet => <Option key={subnet.SubnetId} value={subnet.SubnetId}>{subnet.SubnetId} ({subnet.CidrBlock})</Option>)}
                </Select>
                </Form.Item>
            )}
            </Form>
        </Spin>
      ),
    },
    {
      title: '确认并创建',
      content: creationResult ? (
          <Result
            status={creationResult.status}
            title={creationResult.status === 'success' ? '创建成功' : '创建失败'}
            subTitle={creationResult.message || `Request ID: ${creationResult.data?.RequestId}`}
            extra={[
              <Button type="primary" key="create" onClick={resetApp}>
                再次创建
              </Button>,
            ]}
          />
      ) : (
        <Spin spinning={creating}>
            <Descriptions title="配置总览" bordered column={1}>
                <Descriptions.Item label="SecretId">{formData.secretId}</Descriptions.Item>
                <Descriptions.Item label="地域">{formData.region}</Descriptions.Item>
                <Descriptions.Item label="负载均衡名称">{formData.loadBalancerName}</Descriptions.Item>
                <Descriptions.Item label="网络类型">{formData.networkType === 'OPEN' ? '公网' : '内网'}</Descriptions.Item>
                <Descriptions.Item label="VPC">{formData.vpcId}</Descriptions.Item>
                {formData.networkType === 'INTERNAL' && (
                    <Descriptions.Item label="子网">{formData.subnetId}</Descriptions.Item>
                )}
            </Descriptions>
        </Spin>
      ),
    },
  ];

  return (
    <div className="app-container">
      <Card>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current > 0 && !creationResult && <Button style={{ margin: '0 8px' }} onClick={handlePrev}>上一步</Button>}
          {current < steps.length - 1 && <Button type="primary" onClick={handleNext}>下一步</Button>}
          {current === steps.length - 1 && !creationResult && <Button type="primary" onClick={handleCreate} loading={creating}>确认创建</Button>}
        </div>
      </Card>
    </div>
  );
};

export default App;