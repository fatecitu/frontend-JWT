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

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Rotas from "./routes/rotas";
import {ConfigProvider} from 'antd'
import ptBR from 'antd/lib/locale/pt_BR';

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={ptBR}>
      <Rotas />
      </ConfigProvider>
    </div>
  );
}

export default App;
