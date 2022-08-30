import {
  Card,
  Col,
  Row,
  Typography
} from "antd"
import { blue } from '@ant-design/colors'
import {
  RightOutlined
} from "@ant-design/icons"




function Home() {
  const { Title } = Typography



  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: blue[7] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: blue[2] }}>
                  🔐Área Protegida
                  </Title>
                  <Title level={5}>Se você está vendo essa página, é porque passou pelo login.</Title>
                </Col>
              </Row>
            </Card>
          </Col>
              </Row>




        <Row gutter={[24, 0]}>

          <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>100% Open Source</Title>
                  <p>
                   Esse software foi construído com tecnologia 100% Open Source
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="https://pt-br.reactjs.org/" target="_blank" rel="noreferrer">
                    Documentação do ReactJS
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;

