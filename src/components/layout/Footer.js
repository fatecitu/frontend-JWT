
import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2022, 100% software livre
            {<HeartFilled />} desenvolvido por
            <a href="mailto:ricardo.leme@fatec.sp.gov.br" rel="noreferrer" className="font-weight-bold" target="_blank">
              Prof. Ms. Ricardo Leme
            </a>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
