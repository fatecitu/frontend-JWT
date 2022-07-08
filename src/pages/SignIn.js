/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  message
} from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import signinbg from "../assets/images/img-signin.png"
import { signIn } from "../resources/api/API"

const { Title } = Typography;
const { Header, Footer, Content } = Layout;


export default function SignIn() {
  const history = useHistory() //redirecionar a página
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [lembrarUsuario, setLembrarUsuario] = useState(false)
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true)
  const [carregando, setCarregando] = useState(false)



  useEffect(() => {
    if (email.trim() && senha.trim()) {
      setBotaoDesabilitado(false);
    } else {
      setBotaoDesabilitado(true);
    }
  }, [email, senha]);

  useEffect(() => {
    if (lembrarUsuario) {
      localStorage.setItem("usuario", email);
    } else {
      localStorage.removeItem("usuario");
    }
  }, [lembrarUsuario, email]);

  const alteraLembrar = e => {
    setLembrarUsuario(!lembrarUsuario);
  }

  const validaLogin = async () => {

    if (email && senha) {
      setCarregando(true)
      let res = await signIn(email, senha)
      if (res.access_token) {
        localStorage.setItem("token", res.access_token)
        let payload = JSON.parse(window.atob(res.access_token.split('.')[1]))
        localStorage.setItem("usuario", payload.usuario.id)
        history.push("/dashboard")
      } else {
        message.error(`‼️Erro: ${res.errors[0].msg}`);
      }
      setCarregando(false)
    }
  }
  const onFinish = (values) => {
    //console.log("Success:", values);
    validaLogin()
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>Área Reservada</h5>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-8">Klienta</Title>
              <Title className="font-regular text-muted" level={5}>
                Informe os dados para o acesso
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                       rules={[
                    {
                      required: true,
                      type: 'email',
                      message: "Por favor, informe um email válido!",
                    },
                  ]}
                >
                  <Input placeholder="Email"
                    onChange={e => setEmail(e.target.value)} />
                </Form.Item>


                <Form.Item
                  className="username"
                  label="Senha"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, informe a sua senha!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Senha"
                    onChange={e => setSenha(e.target.value)}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={alteraLembrar} />
                  Lembrar o usuário
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={botaoDesabilitado}
                    style={{ width: "100%" }}
                    loading={carregando}
                  >
                    ACESSAR
                  </Button>
                </Form.Item>
               
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <p className="copyright">
            {" "}
            Copyright © 2022 - Klienta Gerencial{" "}
          </p>
        </Footer>
      </Layout>
    </>
  );
}

