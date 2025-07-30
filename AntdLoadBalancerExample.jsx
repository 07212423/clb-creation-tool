
import React, { useState } from 'react';
import 'antd/dist/reset.css'; // 引入 Ant Design 样式重置文件
import {
  Layout,
  Breadcrumb,
  Typography,
  Steps,
  Card,
  Form,
  Input,
  Select,
  Button,
  Space,
  Divider,
  message,
  Radio,
} from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;

// 步骤定义
const steps = [
  {
    title: '身份验证',
    content: 'Auth-content',
  },
  {
    title: '基本配置',
    content: 'Basic-content',
  },
  {
    title: '网络设置',
    content: 'Network-content',
  },
  {
    title: '确认创建',
    content: 'Confirm-content',
  },
];

// 表单布局配置
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const AntdLoadBalancerExample = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const [secretId, setSecretId] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [vpcList, setVpcList] = useState([]);
  const [subnetList, setSubnetList] = useState([]);
  const [selectedLoadBalancerType, setSelectedLoadBalancerType] = useState('OPEN'); // 默认为公网
  const [selectedVpcId, setSelectedVpcId] = useState(null);

  const regions = [
    { value: 'ap-beijing', label: '华北地区（北京）' },
    { value: 'ap-shanghai', label: '华东地区（上海）' },
    { value: 'ap-guangzhou', label: '华南地区（广州）' },
    { value: 'ap-chengdu', label: '西南地区（成都）' },
    { value: 'ap-singapore', label: '亚太东南（新加坡）' },
    { value: 'ap-seoul', label: '亚太东北（首尔）' },
    { value: 'ap-tokyo', label: '亚太东北（东京）' },
    { value: 'ap-bangkok', label: '亚太东南（曼谷）' },
    { value: 'na-siliconvalley', label: '美国西部（硅谷）' },
    { value: 'eu-frankfurt', label: '欧洲地区（法兰克福）' },
    { value: 'ap-qingyuan', label: '清远' },
  ];

  const fetchVpcs = async (currentSecretId, currentSecretKey, currentRegion) => {
    try {
      const response = await fetch(`http://localhost:4000/api/vpcs?secretId=${currentSecretId}&secretKey=${currentSecretKey}&region=${currentRegion}`);
      const data = await response.json();
      if (response.ok) {
        setVpcList(data.map(vpc => ({ id: vpc.VpcId, name: vpc.VpcName })));
      } else {
        message.error(`获取VPC列表失败: ${data.Message || JSON.stringify(data)}`);
        setVpcList([]);
      }
    } catch (error) {
      console.error('Error fetching VPCs:', error);
      message.error('获取VPC列表异常');
      setVpcList([]);
    }
  };

  const fetchSubnets = async (currentSecretId, currentSecretKey, currentRegion, currentVpcId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/subnets?secretId=${currentSecretId}&secretKey=${currentSecretKey}&region=${currentRegion}&vpcId=${currentVpcId}`);
      const data = await response.json();
      if (response.ok) {
        setSubnetList(data.map(subnet => ({ id: subnet.SubnetId, name: subnet.SubnetName })));
      } else {
        message.error(`获取子网列表失败: ${data.Message || JSON.stringify(data)}`);
        setSubnetList([]);
      }
    } catch (error) {
      console.error('Error fetching subnets:', error);
      message.error('获取子网列表异常');
      setSubnetList([]);
    }
  };

  const next = async () => {
    try {
      const values = await form.validateFields();
      console.log('表单校验成功:', values);

      if (current === 0) { // 身份验证步骤
        setSecretId(values.secretId);
        setSecretKey(values.secretKey);
      } else if (current === 1) { // 基本配置步骤
        // 在这里可以根据需要获取VPC列表
        await fetchVpcs(secretId, secretKey, values.region);
      } else if (current === 2) { // 网络设置步骤
        // 如果是内网且没有选择子网，则需要校验
        if (values.loadBalancerType === 'INTERNAL' && !values.subnetId) {
          message.error('内网负载均衡必须选择子网！');
          return;
        }
      }
      setCurrent(current + 1);
    } catch (info) {
      console.log('表单校验失败:', info);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      console.log('最终配置:', values);

      const createPayload = {
        secretId: secretId,
        secretKey: secretKey,
        region: values.region,
        instanceName: values.instanceName,
        loadBalancerType: values.loadBalancerType,
        vpcId: values.vpcId,
        subnetId: values.loadBalancerType === 'INTERNAL' ? values.subnetId : undefined, // 只有内网才传子网ID
      };

      const response = await fetch('http://localhost:4000/api/create-lb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createPayload),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('负载均衡实例创建成功！');
        console.log('创建成功响应:', data);
        // 可以跳转到成功页面或重置表单
      } else {
        message.error(`创建失败: ${data.Message || JSON.stringify(data)}`);
        console.error('创建失败响应:', data);
      }

    } catch (info) {
      console.log('最终校验失败:', info);
      message.error('请检查表单填写是否完整和正确。');
    }
  }

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" style={{ color: 'white', fontSize: '20px' }}>云平台 LOGO</div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>控制台</Breadcrumb.Item>
          <Breadcrumb.Item>云计算</Breadcrumb.Item>
          <Breadcrumb.Item>负载均衡</Breadcrumb.Item>
          <Breadcrumb.Item>创建实例</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ background: '#fff', padding: 24 }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
            创建负载均衡实例
          </Title>
          
          <Steps current={current} style={{ marginBottom: '48px', maxWidth: '1000px', margin: 'auto' }}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <Card style={{ maxWidth: '800px', margin: 'auto' }}>
            <Form {...formItemLayout} form={form} name="create_lb">
              {/* 步骤 0: 身份验证 */}
              <div style={{ display: current === 0 ? 'block' : 'none' }}>
                <Title level={4} style={{ marginBottom: '24px' }}>身份验证</Title>
                <Form.Item
                  name="secretId"
                  label="SecretId"
                  rules={[{ required: true, message: '请输入 SecretId!' }]}
                >
                  <Input placeholder="请输入您的 SecretId" />
                </Form.Item>
                <Form.Item
                  name="secretKey"
                  label="SecretKey"
                  rules={[{ required: true, message: '请输入 SecretKey!' }]}
                >
                  <Input.Password placeholder="请输入您的 SecretKey" />
                </Form.Item>
              </div>

              {/* 步骤 1: 基本配置 */}
              <div style={{ display: current === 1 ? 'block' : 'none' }}>
                <Title level={4} style={{ marginBottom: '24px' }}>基本配置</Title>
                <Form.Item
                  name="instanceName"
                  label="实例名称"
                  rules={[{ required: true, message: '请输入实例名称!' }]}
                >
                  <Input placeholder="例如：my-load-balancer" />
                </Form.Item>
                <Form.Item
                  name="region"
                  label="地域"
                  rules={[{ required: true, message: '请选择地域!' }]}
                >
                  <Select placeholder="请选择">
                    {regions.map(r => (
                      <Option key={r.value} value={r.value}>
                        {r.label} ({r.value})
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              {/* 步骤 2: 网络设置 */}
              <div style={{ display: current === 2 ? 'block' : 'none' }}>
                <Title level={4} style={{ marginBottom: '24px' }}>网络设置</Title>
                <Form.Item
                  name="loadBalancerType"
                  label="负载均衡类型"
                  rules={[{ required: true, message: '请选择负载均衡类型!' }]}
                  initialValue="OPEN"
                >
                  <Radio.Group onChange={(e) => {
                    setSelectedLoadBalancerType(e.target.value);
                    form.setFieldsValue({ subnetId: undefined }); // 切换类型时清空子网
                  }}>
                    <Radio value="OPEN">公网</Radio>
                    <Radio value="INTERNAL">内网</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="vpcId"
                  label="VPC ID"
                  rules={[{ required: true, message: '请选择一个VPC!' }]}
                >
                  <Select
                    placeholder="请选择VPC"
                    onChange={async (value) => {
                      setSelectedVpcId(value);
                      form.setFieldsValue({ subnetId: undefined }); // 清空子网选择
                      const currentRegion = form.getFieldValue('region');
                      await fetchSubnets(secretId, secretKey, currentRegion, value);
                    }}
                  >
                    {vpcList.map(vpc => (
                      <Option key={vpc.id} value={vpc.id}>{vpc.name} ({vpc.id})</Option>
                    ))}
                  </Select>
                </Form.Item>

                {selectedLoadBalancerType === 'INTERNAL' && (
                  <Form.Item
                    name="subnetId"
                    label="子网 ID"
                    rules={[{ required: true, message: '请选择一个子网!' }]}
                  >
                    <Select placeholder="请选择子网" disabled={!selectedVpcId}>
                      {subnetList.map(subnet => (
                        <Option key={subnet.id} value={subnet.id}>{subnet.name} ({subnet.id})</Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              </div>

              {/* 步骤 3: 确认创建 */}
              <div style={{ display: current === 3 ? 'block' : 'none' }}>
                <Title level={4} style={{ marginBottom: '24px' }}>确认配置</Title>
                <Form.Item label="SecretId">
                  <Input value={form.getFieldValue('secretId')} disabled />
                </Form.Item>
                <Form.Item label="SecretKey">
                  <Input.Password value={form.getFieldValue('secretKey')} disabled />
                </Form.Item>
                <Form.Item label="实例名称">
                  <Input value={form.getFieldValue('instanceName')} disabled />
                </Form.Item>
                <Form.Item label="地域">
                  <Input value={regions.find(r => r.value === form.getFieldValue('region'))?.label} disabled />
                </Form.Item>
                <Form.Item label="负载均衡类型">
                  <Input value={form.getFieldValue('loadBalancerType') === 'OPEN' ? '公网' : '内网'} disabled />
                </Form.Item>
                <Form.Item label="VPC ID">
                  <Input value={form.getFieldValue('vpcId')} disabled />
                </Form.Item>
                {form.getFieldValue('loadBalancerType') === 'INTERNAL' && (
                  <Form.Item label="子网 ID">
                    <Input value={form.getFieldValue('subnetId')} disabled />
                  </Form.Item>
                )}
              </div>
            </Form>
            
            <Divider />

            <div className="steps-action" style={{ textAlign: 'center' }}>
              <Space>
                {current > 0 && (
                  <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    上一步
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    下一步
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={handleCreate}>
                    完成创建
                  </Button>
                )}
              </Space>
            </div>
          </Card>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default AntdLoadBalancerExample;
