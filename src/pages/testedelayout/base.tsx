/* import React, { useState } from "react";
import { Breadcrumb, Modal, Layout, Menu, theme, Flex, Row, Col } from 'antd';
import InputForm from "./form/inputForm";
import CalendarForm from "./form/calendarForm";
import InputNumberForm from "./form/inputNumberForm";
import RadioForm from "./form/radioForm";
import SelectForm from "./form/selectForm";
import { AppStrings } from "../../resources/strings/app_strings";
import { ClimateType } from "../../resources/enums/climaTypes";
import ButtonApp from "../buttons";
import './style.scss';
import ModalForm from "../modals";
import axios from 'axios';
import HeaderComponent from "../header/headerComponent";

const { Header, Content } = Layout;

const RegisterForm: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

        const [selectCity, setSelectCity] = useState<string>("");
        const [selectedDate, setSelectedDate] = useState<string>("");
        const [selectedClimate, setSelectedClimate] = useState<ClimateType | undefined>(undefined);
        const [temperatureMax, setTemperatureMax] = useState<number>(0);
        const [temperatureMin, setTemperatureMin] = useState<number>(0);
        const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

        const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSelectCity(e.target.value); 

            console.log(selectCity);
        }

        const handleDateChange = (date: string) => {
            console.log('Data antes:', selectedDate)

            setSelectedDate(date);

            console.log('Data selecionada', date);
        };

        const handleClimateSelect = (value: ClimateType) => {
            console.log('Clima selecionado:', value);
            setSelectedClimate(value);
        };

        const validateFields = (): boolean => {
            if (!selectedDate || !selectedClimate || temperatureMax <= 0 || temperatureMin <= 0) {
                return false;
            }
            return true;
        };

        const handleTemperatureMaxChange = (value: number) => {
            setTemperatureMax(value);
          };
          
          const handleTemperatureMinChange = (value: number) => {
            setTemperatureMin(value);
          };
    
        const handleSubmit = async () => {
            if (!validateFields()) {
                console.log(selectedDate,selectedClimate,selectCity,temperatureMax,temperatureMin)
                setIsModalVisible(true); // Exibe o modal se a validação falhar
                return;
            }
    
            try {
                const payload = {
                    cidade: selectCity,
                    data: selectedDate,
                    tempMin: temperatureMin.toString(), // Convertendo para string conforme esperado
                    tempMax: temperatureMax.toString(), // Convertendo para string conforme esperado
                    turno: "MANHA", // Altere conforme necessário
                    clima: selectedClimate, // Certifique-se de que está enviando o valor correto
                    precipitacao: "0", // Valor padrão ou ajuste conforme necessário
                    umidade: "0", // Valor padrão ou ajuste conforme necessário
                    velDoVento: "0", // Valor padrão ou ajuste conforme necessário
                };
        
                // Enviando o payload via POST
                const response = await axios.post('http://localhost:8080/dados-metereologicos', payload);
        
                // Log da resposta para confirmação
                console.log('Dados enviados com sucesso:', response.data);
                // Aqui você pode limpar o formulário ou redirecionar o usuário conforme necessário
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
            }
        };
    
        const handleOk = () => {
            setIsModalVisible(false);
        };
    
        const handleCancel = () => {
            setIsModalVisible(false);
        };

    return (
        <Layout>
            <HeaderComponent />
            <Content
                style={{
                    background: colorBgContainer,
                    padding: '0 10%'
                }}>
                <div>
                    <h2>Cadastro de Dados Meteorológicos</h2>
                </div>
                <div className="area-form">
                    <div className="area-form-column-a"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Flex vertical justify="space-between">
                            <div className="areaSearchCity">
                                <h3>
                                    Buscar por cidade
                                </h3>
                                <InputForm 
                                    onTextChange={handleCityChange}
                                />
                            </div>
                            <div className="area-input-date">
                                <h3>
                                    Selecione a data
                                </h3>
                                <CalendarForm 
                                onDateSelect={handleDateChange}
                                />
                            </div>
                        </Flex>
                    </div>
                    <div className="area-form-column-b"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Flex vertical justify="space-between">
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
                                                    information={temperatureMax}
                                                    onValueChange={handleTemperatureMaxChange}
                                                />
                                            </div>
                                        </Col>
                                        <Col span={10}>
                                            <div>
                                                <InputNumberForm
                                                    title={"Mínima"}
                                                    information={temperatureMin}
                                                    onValueChange={handleTemperatureMinChange}
                                                />
                                            </div>
                                        </Col>
                                    </Flex>

                                </div>
                            </div>

                            <div className="area-turn-form">
                                <div>
                                    <h3>Selecione o turno</h3>
                                </div>
                                <div>
                                    <span>Turno*</span>
                                    <RadioForm />

                                </div>
                            </div>

                            <div className="area-climate-form">
                                <div>
                                    <h3>Informe o clima</h3>
                                </div>
                                <div>
                                    <span className="text-climate-form">Clima*</span>
                                    <SelectForm 
                                        onSelect={handleClimateSelect}
                                    />
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
                </div>
            </Content>

            <Content
                style={{
                    background: colorBgContainer,
                    padding: '0px'
                }}>
                <Flex justify="center">
                    <div className="area-button-save-cancel">
                        <ButtonApp
                            text={AppStrings.buttonCancel}
                            className="button-cancel"
                        />
                        <ButtonApp 
                            onClick={handleSubmit}
                            text={AppStrings.buttonSave} 
                        />
                    </div>
                </Flex>
            </Content>

            <ModalForm
                isModalVisible= {isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
             />
        </Layout>
    );
};

export default RegisterForm; */
<div></div>