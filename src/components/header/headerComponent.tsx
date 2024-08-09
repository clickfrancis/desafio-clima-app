import React from "react";
import { Layout, Menu, theme, Breadcrumb } from 'antd';
import './style.scss';
import logo from '../../resources/assets/logo.png'; 

const { Header, Content } = Layout;

const HeaderComponent: React.FC = () => {
    return (
        <Layout>
            <Header 
                className="header"
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ flex: 1, minWidth: 0 }}
                >
                    {/* Adicione itens de menu aqui 
                    <Menu.Item key="1">Inicial</Menu.Item>
                    <Menu.Item key="2">Cadastro</Menu.Item>*/}
                </Menu>
            </Header>
            <Layout>
                <Content style={{
                    background: theme.useToken().token.colorBgContainer,
                    padding: '40px 10%'
                }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Inicial</Breadcrumb.Item>
                        <Breadcrumb.Item>Cadastro de dados meteorológicos</Breadcrumb.Item>
                    </Breadcrumb>
                </Content>
            </Layout>
        </Layout>
    );
};

export default HeaderComponent;
