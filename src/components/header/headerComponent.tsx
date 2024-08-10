import React from "react";
import { Layout, Menu, theme, Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import './style.scss';
import logo from '../../resources/assets/logo.png'; 
import { title } from "process";

const { Header, Content } = Layout;

const HeaderComponent: React.FC = () => {
    const location = useLocation(); // Hook usado dentro do componente

    // Função para gerar itens de breadcrumb com base no pathname
    const getBreadcrumbItems = () => {

    const pathnames = location.pathname.split('/').filter((x) => x);

        // Define os itens baseados na rota atual
        const breadcrumbItems = [
            { title: <Link to="/">Inicial</Link> }
        ];

        if (pathnames.length === 0) {
            return breadcrumbItems; // Retorna apenas "Inicial" para a página inicial
        }

        // Adiciona os itens adicionais com base na rota atual
        if (pathnames[0] === 'atualizar') {
            breadcrumbItems.push({ title: <Link to="/atualizar">Atualizar Dados Meteorológicos</Link> });
        } else if (pathnames[0] === 'cadastro') {
            breadcrumbItems.push({ title: <Link to="/cadastro">Cadastrar Dados Meteorológicos</Link> });
        }
        

        return breadcrumbItems;
    };

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
                        {getBreadcrumbItems().map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                {item.title}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </Content>
            </Layout>
        </Layout>
    );
};

export default HeaderComponent;
