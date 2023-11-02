import { GridContent } from '@ant-design/pro-components';
import { Button, Col, Input, Row, Space } from 'antd';
import { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
  const [path, setPath] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    // console.log('window',(window as any).$api)
  }, []);

  return (
    <GridContent>
      <Row>
        <Col span={6}>
          <div>
            <Space.Compact block>
              <Input
                readOnly
                onClick={async () => {
                  const res = await window.$api.fs.openDirectory();
                  if (res?.length > 0) {
                    setPath(res[0]);
                  }
                }}
                style={{ width: 'calc(100% - 200px)' }}
                value={path}
              />
              <Button
                onClick={async () => {
                  const res = await window.$api.fs.readdir(path);
                  if (res) {
                    setList(res);
                  }
                }}
                type="primary"
              >
                确定
              </Button>
            </Space.Compact>

            <div>
              {list.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </GridContent>
  );
};

export default HomePage;
