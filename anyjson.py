import json
from collections import defaultdict

def describe_json_structure(data, indent=0, path="", structure=None):
    """
    递归描述JSON数据的结构
    """
    if structure is None:
        structure = defaultdict(int)
    
    if isinstance(data, dict):
        structure[f"{path} (dict)"] += 1
        for key, value in data.items():
            new_path = f"{path}.{key}" if path else key
            describe_json_structure(value, indent + 2, new_path, structure)
    elif isinstance(data, list):
        structure[f"{path} (list[{len(data)}])"] += 1
        if data:  # 只检查第一个元素，假设列表是同构的
            describe_json_structure(data[0], indent + 2, f"{path}[]", structure)
    else:
        type_name = type(data).__name__
        structure[f"{path} ({type_name})"] += 1
    
    return structure

def analyze_json(json_str):
    """
    分析JSON字符串并返回其结构描述
    """
    try:
        # 解析JSON字符串
        json_obj = json.loads(json_str)
        
        # 描述JSON结构
        structure = describe_json_structure(json_obj)
        
        # 打印结果
        print("\n解析成功！JSON对象结构描述：")
        print("=" * 50)
        for item, count in structure.items():
            parts = item.split(" (")
            path = parts[0]
            type_info = "(" + parts[1]
            indent_level = path.count('.') + path.count('[]')
            print("  " * indent_level + f"- {path}: {type_info}")
        
        print("\n原始JSON内容：")
        print(json.dumps(json_obj, indent=2, ensure_ascii=False))
        
        return json_obj
    except json.JSONDecodeError as e:
        print(f"JSON解析错误: {e}")
        return None

# 示例使用
if __name__ == "__main__":
    # 示例JSON字符串
    example_json = """
    {
    "Response": {
        "VpcSet": [
            {
                "VpcNumId": 15220046,
                "VpcId": "vpc-5witbbr0",
                "VpcName": "ga_20_rs(勿删)",
                "CidrBlock": "10.0.0.0\/12",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2025-06-26 15:04:56",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-fxho7ui1",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": [
                    {
                        "VpcId": "vpc-5witbbr0",
                        "CidrBlock": "192.168.0.0\/16",
                        "AssistantType": 1,
                        "Region": "ap-jakarta",
                        "SubnetSet": []
                    }
                ]
            },
            {
                "VpcNumId": 15213930,
                "VpcId": "vpc-0v92cib6",
                "VpcName": "banksy_test_barad",
                "CidrBlock": "10.8.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2025-06-19 14:38:08",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-2vv7bhyn",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [
                    {
                        "Key": "banksy_test",
                        "Value": "barad"
                    }
                ],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 12902559,
                "VpcId": "vpc-qaa22wyi",
                "VpcName": "banksy_test_barad",
                "CidrBlock": "10.8.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2025-06-19 14:37:09",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-jvudn4a7",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [
                    {
                        "Key": "banksy_test",
                        "Value": "barad"
                    }
                ],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 12907144,
                "VpcId": "vpc-5kwlr2ew",
                "VpcName": "banksy_test_barad",
                "CidrBlock": "10.8.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2025-06-19 14:36:48",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-ok9nzw1z",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [
                    {
                        "Key": "banksy_test",
                        "Value": "barad"
                    }
                ],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 15219799,
                "VpcId": "vpc-7ummnz14",
                "VpcName": "alonzo-vpc",
                "CidrBlock": "10.0.0.0\/12",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2025-04-27 15:34:09",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-5iuuy6qt",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 12904831,
                "VpcId": "vpc-g2asjyhk",
                "VpcName": "leon-test-jkt-2",
                "CidrBlock": "172.16.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2025-04-15 14:33:39",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-7xp7svoh",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 12909822,
                "VpcId": "vpc-pndd90e4",
                "VpcName": "leon-test-jkt-1",
                "CidrBlock": "10.0.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2025-04-15 14:33:05",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-fe8pgz2j",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 15213591,
                "VpcId": "vpc-j8p3k5ei",
                "VpcName": "ryann-JKT-VPC",
                "CidrBlock": "10.201.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2025-03-31 15:21:25",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-p3r348fd",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 12906580,
                "VpcId": "vpc-nn2sd1aq",
                "VpcName": "ivan_vpc",
                "CidrBlock": "10.0.0.0\/12",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2024-12-19 19:16:39",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-o211blyf",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 6689643,
                "VpcId": "vpc-6z1tumqe",
                "VpcName": "kenn-ipv62.0-test",
                "CidrBlock": "10.0.0.0\/12",
                "Ipv6CidrBlock": "240d:c000:f0ff:a700::\/56",
                "Ipv6CidrBlockSet": [
                    {
                        "IPv6CidrBlock": "240d:c000:f0ff:a700::\/56",
                        "ISPType": "BGP",
                        "AddressType": "GUA"
                    },
                    {
                        "IPv6CidrBlock": "fd76:3600:f00:300::\/56",
                        "ISPType": "",
                        "AddressType": "ULA"
                    }
                ],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2024-11-25 23:20:00",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-god3aaw7",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 15218592,
                "VpcId": "vpc-a1ienynq",
                "VpcName": "ryann-goto-VPC",
                "CidrBlock": "10.177.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2024-11-21 11:28:54",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-m6up6mll",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 15219988,
                "VpcId": "vpc-s17xhrpw",
                "VpcName": "雅加达三区 11-04",
                "CidrBlock": "10.0.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2024-11-04 17:11:52",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-mqg1rwzz",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 6692846,
                "VpcId": "vpc-fiiflg1o",
                "VpcName": "garendu-test",
                "CidrBlock": "192.168.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2024-10-09 16:48:13",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-cbp8em81",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 12909125,
                "VpcId": "vpc-ipas242m",
                "VpcName": "network_support",
                "CidrBlock": "30.166.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2024-08-14 19:39:18",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-3875f9s3",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [
                    {
                        "Key": "network_support",
                        "Value": "abelbai"
                    }
                ],
                "AssistantCidrSet": [
                    {
                        "VpcId": "vpc-ipas242m",
                        "CidrBlock": "192.168.0.0\/22",
                        "AssistantType": 1,
                        "Region": "ap-jakarta",
                        "SubnetSet": []
                    }
                ]
            },
            {
                "VpcNumId": 12903077,
                "VpcId": "vpc-ctevl6my",
                "VpcName": "lackyli",
                "CidrBlock": "10.0.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2023-06-10 08:58:55",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-f8lzjjzd",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": [
                    {
                        "VpcId": "vpc-ctevl6my",
                        "CidrBlock": "9.0.0.0\/16",
                        "AssistantType": 0,
                        "Region": "ap-jakarta",
                        "SubnetSet": []
                    },
                    {
                        "VpcId": "vpc-ctevl6my",
                        "CidrBlock": "192.168.0.0\/16",
                        "AssistantType": 0,
                        "Region": "ap-jakarta",
                        "SubnetSet": []
                    },
                    {
                        "VpcId": "vpc-ctevl6my",
                        "CidrBlock": "30.0.0.0\/16",
                        "AssistantType": 0,
                        "Region": "ap-jakarta",
                        "SubnetSet": []
                    }
                ]
            },
            {
                "VpcNumId": 6687642,
                "VpcId": "vpc-bgm06ut2",
                "VpcName": "vpc27",
                "CidrBlock": "10.27.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2022-12-14 17:43:53",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-ht0w1dkb",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 6684994,
                "VpcId": "vpc-p2no6ot8",
                "VpcName": "oscarlhu-test1",
                "CidrBlock": "10.0.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2022-04-22 11:27:16",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-hjguz2ch",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 6686130,
                "VpcId": "vpc-kt0t73o8",
                "VpcName": "graydong",
                "CidrBlock": "10.0.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2022-03-24 18:40:31",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-46hcf227",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 6684717,
                "VpcId": "vpc-dkyiqcv2",
                "VpcName": "xiaooliang_test",
                "CidrBlock": "192.168.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": false,
                "EnableMulticast": false,
                "CreatedTime": "2021-09-15 14:59:02",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-e9ld0se9",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            },
            {
                "VpcNumId": 6685351,
                "VpcId": "vpc-35uukncg",
                "VpcName": "Default-VPC",
                "CidrBlock": "10.223.0.0\/16",
                "Ipv6CidrBlock": "",
                "Ipv6CidrBlockSet": [],
                "IsDefault": true,
                "EnableMulticast": false,
                "CreatedTime": "2021-03-30 14:38:28",
                "EnableDhcp": true,
                "DhcpOptionsId": "dopt-mwqz57l9",
                "DnsServerSet": [
                    "183.60.83.19",
                    "183.60.82.98"
                ],
                "DomainName": "",
                "VpcFlag": 0,
                "IsShare": false,
                "EnableRouteVpcPublish": false,
                "EnableMultiCcn": false,
                "CdcId": "",
                "EnableCdcPublish": false,
                "EnableRouteVpcPublishIpv6": false,
                "Region": "ap-jakarta",
                "TagSet": [],
                "AssistantCidrSet": []
            }
        ],
        "TotalCount": 20,
        "RegionStatistics": [
            {
                "TotalCount": 20,
                "Region": "ap-jakarta"
            }
        ],
        "RequestId": "ac95ef49-c021-4517-9b1b-6a34c69975ec"
    }
}
    """
    
    print("开始解析JSON字符串...")
    json_object = analyze_json(example_json)
