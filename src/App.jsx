import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import { AppRouter } from './routers/AppRouter';

const { Header, Content, Footer } = Layout;

export const App = () => {

  const navigate = useNavigate();

  const menuClick = ({ item, key, keyPath, domEvent }) => {
    switch (key) {
      case 'character':
        navigate('/characters')
        break;
    
      default:
        navigate('/')
        break;
    }
  }


  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        {/* <h1>Logo</h1> */}
        <Menu
          theme='dark'
          mode='horizontal'
          onClick={menuClick}
        >
          <Menu.Item key="films">
            Filmes
          </Menu.Item>
          <Menu.Item key="character">
            Personajes
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          marginTop: 64,
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >

          <AppRouter />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Enrique Tun ©2022 prueba para Netactica 
      </Footer>
    </Layout>
  )
}