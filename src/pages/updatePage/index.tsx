// src/pages/EditPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormComponent from "../../components/registerForm";
import { ClimateType } from '../../resources/enums/climaTypes';
import { Layout, theme, Flex} from 'antd';
import ButtonApp from '../../components/buttons';
import { AppStrings } from '../../resources/strings/app_strings';

const { Content } = Layout;


interface WeatherData {
    cidade: string;
    data: string;
    tempMin: number;
    tempMax: number;
    clima: ClimateType;
    turno: string;
    precipitacao: number;
    umidade: number;
    velDoVento: number;
}

const EditPage: React.FC = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const params = useParams<Record<string, string | undefined>>();
    const { city, date, shift } = params;
    const navigate = useNavigate();
    const [data, setData] = useState<WeatherData | null>(null);
    const [selectCity, setSelectCity] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedClimate, setSelectedClimate] = useState<ClimateType | undefined>(undefined);
    const [temperatureMax, setTemperatureMax] = useState<number>(0);
    const [temperatureMin, setTemperatureMin] = useState<number>(0);
    const [precipitation, setPrecipitation] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    const [wind, setWind] = useState<number>(0);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedShift, setSelectedShift] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/dados-metereologicos/${city}/${date}/${shift}`);
                setData(response.data);
                setSelectCity(response.data.cidade);
                setSelectedClimate(response.data.clima);
                setSelectedDate(response.data.data);
                setSelectedShift(response.data.turno);
                setTemperatureMin(response.data.tempMin);
                setTemperatureMax(response.data.tempMax);
                setHumidity(response.data.umidade);
                setPrecipitation(response.data.precipitacao);
                setWind(response.data.velDoVento);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };
        fetchData();
    }, [city, date, shift]);

    const handleSave = async () => { 

        try {

            const payload = {
                cidade: selectCity,
                data: selectedDate,
                tempMin: temperatureMin,
                tempMax: temperatureMax,
                turno: selectedShift,
                clima: selectedClimate,
                precipitacao: precipitation,
                umidade: humidity,
                velDoVento: wind
            }
            await axios.put(`http://localhost:8080/dados-metereologicos/${city}/${date}/${shift}`, payload);
            navigate('/');

        } catch (error) {
            console.error('Failed to update data', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    }

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectCity(e.target.value);
    };

    const handleTemperatureMaxChange = (value: number) => {
        setTemperatureMax(value);
    };
      
    const handleTemperatureMinChange = (value: number) => {
        setTemperatureMin(value);
    };

    const handleDateChange = (value: string) => {
        setSelectedDate(value);
    };

    const handleClimateSelect = (value: ClimateType) => {
        setSelectedClimate(value);
    };

    const handleShiftChange = (value: string) => {
        setSelectedShift(value);
    }

    const handlePrecipitation = (value: number) => {
        setPrecipitation(value);
    }
    
    const handleHumidity = (value: number) => {
        setHumidity(value);
    }

    const handleWind = (value: number) => {
        setWind(value);
    }

    if (!data) return <p>Loading...</p>;

    return (
        <Layout>
        <Content
            style={{
                background: colorBgContainer,
                padding: '0px 10%'
            }}>
            <h2>Editar Dados Meteorológicos</h2>

            <FormComponent 
                handleCityChange={handleCityChange}
                handleDateChange={handleDateChange}
                temperatureMin={temperatureMin}
                temperatureMax={temperatureMax}
                precipitation={precipitation}
                humidity={humidity}
                wind={wind}
                handleTemperatureMaxChange={handleTemperatureMaxChange}
                handleTemperatureMinChange={handleTemperatureMinChange}
                handleClimateSelect={handleClimateSelect}
                handleShiftChange={handleShiftChange}
                handleHumidity={handleHumidity}
                handleWind={handleWind}
                handlePrecipitation={handlePrecipitation}
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
                    padding: '0px 10%'
                }}>
                <Flex justify="center">
                    <div className="area-button-save-cancel">
                        <ButtonApp
                            text={AppStrings.buttonCancel}
                            className="button-cancel"
                            onClick={handleCancel}
                        />
                        <ButtonApp 
                            onClick={handleSave}
                            text={AppStrings.buttonSave} 
                        />
                    </div>
                </Flex>
            </Content>
        </Layout>
    );
};

export default EditPage;
