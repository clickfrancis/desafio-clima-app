import React from "react";
import { Breadcrumb, Layout, Menu, theme, Flex, Row, Col } from 'antd';
import InputForm from "./form/inputForm";
import CalendarForm from "./form/calendarForm";
import InputNumberForm from "./form/inputNumberForm";
import RadioForm from "./form/radioForm";
import SelectForm from "./form/selectForm";
import { AppStrings } from "../../resources/strings/app_strings";
import ButtonApp from "../buttons";
import './style.scss';

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
                    padding: '40px 120px'
                }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <h2>Cadastro de Dados Meteorológicos</h2>
                </div>
                <Flex justify="flex-start">
                    <div
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Flex vertical align="center" justify="space-between">
                            <div className="areaSearchCity">
                                <h3>
                                    Buscar por cidade
                                </h3>
                                <InputForm />
                            </div>
                            <div className="area-input-date">
                                <h3>
                                    Selecione a data
                                </h3>
                                <CalendarForm />
                            </div>
                        </Flex>
                    </div>
                    <div
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            paddingLeft: 120
                        }}
                    >
                        <Flex vertical align="center" justify="space-between">
                            <div className="area-input-number">
                                <div>
                                    <h3>Informe a temperatura</h3>
                                </div>

                                <div>
                                    <Flex justify="space-between">
                                     <Col span={10}>
                                            <div>
                                                <InputNumberForm
                                                    title={"Máxima"}
                                                    information={0}
                                                />
                                            </div>
                                        </Col>
                                        <Col span={10}>
                                            <div>
                                                <InputNumberForm
                                                    title={"Mínima"}
                                                    information={0}
                                                />
                                            </div>
                                        </Col>

                                    </Flex>

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
                                <Flex justify="space-between">
                                     <Col span={10}>
                                            <div>
                                                <InputNumberForm
                                                    title={"Precipitação"}
                                                    information={0}
                                                    measure={"mm"}
                                                />
                                            </div>
                                        </Col>
                                        <Col span={10}>
                                            <div>
                                                <InputNumberForm
                                                    title={"Umidade"}
                                                    information={0}
                                                    measure={"%"}
                                                />
                                            </div>
                                        </Col>
                                        <Col span={10}>
                                            <div>
                                                <InputNumberForm
                                                    title={"Velocidade do vento"}
                                                    information={0}
                                                    measure={"km/h"}
                                                />
                                            </div>
                                        </Col>
                                    </Flex>
                                </div>
                            </div>
                        </Flex>

                    </div>
                </Flex>
            </Content>

            <Content
                style={{
                    background: colorBgContainer,
                    padding: '0px'
                }}>
                <div>
                    <ButtonApp text={AppStrings.buttonCancel} />
                    <ButtonApp text={AppStrings.buttonSave} />
                </div>
            </Content>
        </Layout>
    );
};

export default RegisterForm;
