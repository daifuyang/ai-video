import { PlayCircleOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-components';
import {
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Slider,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

const HomePage: React.FC = () => {
  const [data, setData] = useState();

  const [active, setActive] = useState<string>('basic');

  const fetchDir = async () => {
    const res = await window.$api.fs.readdir(
      'D:/learn/electron/antd-pro/场景素材',
    );
    setData(res);
  };

  useEffect(() => {
    fetchDir();
  }, []);

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: '素材名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: '视频数量',
      dataIndex: 'videoCount',
      ellipsis: true,
      key: 'videoCount',
    },
    {
      title: '操作',
      width: 80,
      key: 'action',
      render: (_, record) => <Checkbox>原声</Checkbox>,
    },
  ];

  const tabList = [
    {
      key: 'basic',
      tab: '基础配置',
    },
    {
      key: 'file',
      tab: '素材配置',
    },
    {
      key: 'style',
      tab: '样式配置',
    },
    {
      key: 'voice',
      tab: '配音配置',
    },
    {
      key: 'template',
      tab: '模板配置',
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    basic: (
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginTop: 16 }}
      >
        <Form.Item label="空间名称" initialValue="测试空间">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="单图转视频" style={{ marginBottom: 0 }}>
          <Form.Item
            name="year"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 100 }}
          >
            <InputNumber suffix="秒" />
          </Form.Item>

          <span
            style={{
              display: 'inline-block',
              lineHeight: 2.2,
              minHeight: '32px',
            }}
          >
            至
          </span>

          <Form.Item
            name="month"
            rules={[{ required: true }]}
            style={{
              display: 'inline-block',
              width: 100,
              margin: '0 8px',
            }}
          >
            <InputNumber suffix="秒" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="视频裁切" style={{ marginBottom: 0 }}>
          <Form.Item
            name="year"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 100 }}
          >
            <InputNumber suffix="秒" />
          </Form.Item>

          <span
            style={{
              display: 'inline-block',
              lineHeight: 2.2,
              minHeight: '32px',
            }}
          >
            至
          </span>

          <Form.Item
            name="month"
            rules={[{ required: true }]}
            style={{
              display: 'inline-block',
              width: 100,
              margin: '0 8px',
            }}
          >
            <InputNumber suffix="秒" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="输出比例">
          <Select
            defaultValue="vertical"
            style={{ width: '100%' }}
            options={[
              { value: 'vertical', label: '竖屏 9:16 （1080×1920）' },
              { value: 'horizontal', label: '横屏 16:9 （1920×1080）' },
            ]}
          />
        </Form.Item>

        <Form.Item label="其他配置">
          <Checkbox.Group
            options={['显示字幕', '无缝模式', '字幕转语音']}
            defaultValue={['Apple']}
          />
        </Form.Item>

        <Form.Item label="文案模式">
          <Radio.Group options={['长文案', '片段文案', '长文案随机']} />
        </Form.Item>

        <Title style={{ marginBottom: 24 }} level={5}>
          主播配置
        </Title>
        <Form.Item label="主播列表" style={{ marginBottom: 0 }}>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(90% - 8px)' }}
          >
            <Select
              defaultValue="vertical"
              style={{ width: '100%' }}
              options={[
                { value: 'vertical', label: '竖屏 9:16 （1080×1920）' },
                { value: 'horizontal', label: '横屏 16:9 （1920×1080）' },
              ]}
            />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', padding: '0 12px' }}>
            <Tooltip title="试听">
              <PlayCircleOutlined style={{ fontSize: 20 }} />
            </Tooltip>
          </Form.Item>
        </Form.Item>
        <Form.Item label="配音语速">
          <Slider />
        </Form.Item>
        <Form.Item label="主播音量">
          <Slider />
        </Form.Item>
        <Form.Item label="背景音量">
          <Slider />
        </Form.Item>
      </Form>
    ),
    file: <p>content2</p>,
  };

  const onTabChange = (key: string) => {
    setActive(key);
  };

  return (
    <GridContent>
      <Row>
        <Col span={10}>
          <div className="flex flex-col">
            <Card
              title="素材列表"
              size="small"
              style={{ margin: 12 }}
              bodyStyle={{ padding: 0 }}
              bordered
            >
              <Table
                size="small"
                columns={columns}
                rowKey={(record, index) => {
                  return `${index}`;
                }}
                scroll={{ x: 400, y: 600 }}
                dataSource={data}
                pagination={false}
              />
            </Card>
            <div className="h-10"></div>
          </div>
        </Col>
        <Col span={14}>
          {/* <Button type='primary'>打开素材目录</Button>
        <Button type='primary'>打开文案创作</Button> */}
          <div className="flex flex-col">
            <Card
              size="small"
              style={{ margin: 12 }}
              tabList={tabList}
              onTabChange={onTabChange}
              bordered
            >
              {contentList[active]}
            </Card>
          </div>
        </Col>
      </Row>
    </GridContent>
  );
};

export default HomePage;
