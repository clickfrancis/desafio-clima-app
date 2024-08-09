import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, theme, Flex } from 'antd';
import { AppStrings } from "../../resources/strings/app_strings";
import { ClimateType } from "../../resources/enums/climaTypes";
import ButtonApp from "../../components/buttons";
import './style.scss';
import ModalForm from "../../components/modals";
import axios from 'axios';
import FormComponent from "../../components/registerForm";

const { Content } = Layout;

const RegisterPage: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

        const navigate = useNavigate();
        const [selectCity, setSelectCity] = useState<string>("");
        const [selectedDate, setSelectedDate] = useState<string>("");
        const [selectedClimate, setSelectedClimate] = useState<ClimateType | undefined>(undefined);
        const [temperatureMax, setTemperatureMax] = useState<number>(0);
        const [temperatureMin, setTemperatureMin] = useState<number>(0);
        const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
        const [selectedShift, setSelectedShift] = useState<string>("");
        const [selectedPrecipatation, setSelectedPrecipatation] = useState<number>(0);
        const [selectedHumidity, setSelectedHumidity] = useState<number>(0);
        const [selectedWind, setSelectedWind] = useState<number>(0);

        const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSelectCity(e.target.value); 
        }

        const handleDateChange = (date: string) => {
            setSelectedDate(date);
        };

        const handleClimateSelect = (value: ClimateType) => {
            setSelectedClimate(value);
        };

        const handleTemperatureMaxChange = (value: number) => {
            setTemperatureMax(value);
        };
          
        const handleTemperatureMinChange = (value: number) => {
            setTemperatureMin(value);
        };

        const handleShiftChange = (value: string) => {
            setSelectedShift(value);
        }

        const handlePrecipitation = (value: number) => {
            setSelectedPrecipatation(value);
        }

        const handleHumidity = (value: number) => {
            setSelectedHumidity(value);
        }

        const handleWindd = (value: number) => {
            setSelectedWind(value);
        }

        const validateFields = (): boolean => {
            if (!selectedDate || !selectedClimate || temperatureMax <= 0 || temperatureMin <= 0) {
                return false;
            }
            return true;
        };
    
        const handleSubmit = async () => {
            if (!validateFields()) {
                setIsModalVisible(true); 
                return;
            }
    
            try {
                const payload = {
                    cidade: selectCity,
                    data: selectedDate,
                    tempMin: temperatureMin,
                    tempMax: temperatureMax,
                    turno: selectedShift,
                    clima: selectedClimate,
                    precipitacao: selectedPrecipatation,
                    umidade: selectedHumidity,
                    velDoVento: selectedWind, 
                };
        
                await axios.post('http://localhost:8080/dados-metereologicos', payload);
                navigate('/');
        
            } catch (error) {
                throw new Error("Erro ao enviar dados:");
            }
        };
        
        const handdleCancel = () => {
            navigate('/');
        }

        const handleOk = () => {
            setIsModalVisible(false);
        };
    
        const handleCancel = () => {
            setIsModalVisible(false);
        };

    return (
        <Layout>
            <Content
                style={{
                    background: colorBgContainer,
                    padding: '0 10%'
                }}>
                <div>
                    <h2>Cadastro de Dados Meteorológicos</h2>
                </div>
               <FormComponent 
                    handleCityChange={handleCityChange}
                    handleDateChange={handleDateChange}
                    temperatureMin={temperatureMin}
                    temperatureMax={temperatureMax}
                    handleTemperatureMaxChange={handleTemperatureMaxChange}
                    handleTemperatureMinChange={handleTemperatureMinChange}
                    handleClimateSelect={handleClimateSelect}
                    handleShiftChange={handleShiftChange}
                    handleHumidity={handleHumidity}
                    handlePrecipitation={handlePrecipitation}
                    handleWind={handleWindd}
                    humidity={selectedHumidity}
                    precipitation={selectedPrecipatation}
                    wind={selectedPrecipatation}
                    initialValues={{
                        city: selectCity,
                        date: selectedDate,
                        climate: selectedClimate,
                        shift: selectedShift
                }}
               />
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
                            onClick={handdleCancel}
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

export default RegisterPage;
