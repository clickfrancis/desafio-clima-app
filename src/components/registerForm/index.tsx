import React from "react";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import InputForm from "./form/inputForm";
import CalendarForm from "./form/calendarForm";
import InputNumberForm from "./form/inputNumberForm";
import RadioForm from "./form/radioForm";
import SelectForm from "./form/selectForm";
import { AppStrings } from "../../resources/strings/app_strings";
import ButtonApp from "../buttons";

const { Header, Content } = Layout;

const RegisterForm: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content
                style={{
                    background: colorBgContainer,
                    padding: '0px'
                }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <h2>Cadastro de Dados Meteorológicos</h2>
                </div>
                <div
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div>
                        <h3>
                            Buscar por cidade
                        </h3>
                        <InputForm />
                    </div>
                    <div>
                        <CalendarForm />
                    </div>
                </div>
                <div
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div>
                        <div>
                            <h3>Informe a temperatura</h3>
                        </div>

                        <div>
                            <div>
                                <InputNumberForm />
                            </div>
                            <div>
                                <InputNumberForm />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h3>Selecione o turno</h3>
                        </div>
                        <div>
                            <span>Turno*</span>
                            <RadioForm />

                        </div>
                    </div>

                    <div>
                        <div>
                            <h3>Informe o clima</h3>
                        </div>
                        <div>
                            <span>Clima*</span>
                            <SelectForm />
                        </div>
                    </div>

                    <div>
                        <div>
                            <h3>Informações adicionais</h3>
                        </div>
                        <div>
                            <div>
                                <InputNumberForm />
                            </div>
                            <div>
                                <InputNumberForm />
                            </div>
                            <div>
                                <InputNumberForm />
                            </div>
                        </div>
                    </div>

                </div>
            </Content>
           
            <Content
                style={{
                    background: colorBgContainer,
                    padding: '0px'
                }}>
                <div>
                    <ButtonApp text = {AppStrings.buttonCancel} />
                    <ButtonApp text = {AppStrings.buttonSave} />
                </div>
            </Content>
        </Layout>
    );
};

export default RegisterForm;
