import React from "react";
import { Flex, Col } from "antd";
import InputForm from "./form/inputForm";
import CalendarForm from "./form/calendarForm";
import InputNumberForm from "./form/inputNumberForm";
import RadioForm from "./form/radioForm";
import SelectForm from "./form/selectForm";
import { ClimateType } from "../../resources/enums/climaTypes";
import './style.scss'

interface FormComponentProps {
    handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (date: string) => void;
    temperatureMin: number;
    temperatureMax: number;
    handleTemperatureMaxChange: (value: number) => void;
    handleTemperatureMinChange: (value: number) => void;
    handlePrecipitation: (value: number) => void;
    handleHumidity: (value: number) => void;
    handleWind: (value: number) => void;
    handleClimateSelect: (value: ClimateType) => void;
    handleShiftChange: (value: string) => void;
    precipitation: number;
    humidity: number;
    wind: number;
    initialValues?: {
        city?: string;
        date?: string;
        climate?: ClimateType;
        shift?: string;
    };
}

const FormComponent: React.FC<FormComponentProps> = ({
    handleCityChange,
    handleDateChange,
    temperatureMin,
    temperatureMax,
    handleTemperatureMaxChange,
    handleTemperatureMinChange,
    handleClimateSelect,
    handleShiftChange,
    handlePrecipitation,
    handleHumidity,
    handleWind,
    precipitation,
    humidity,
    wind,
    initialValues
}) => {

    return (

        <div className="area-form">
            <div className="area-form-column-a">
                <Flex vertical justify="space-between">
                    <div className="areaSearchCity">
                        <h3>
                            Buscar por cidade
                        </h3>
                        <InputForm
                            onTextChange={handleCityChange}
                            value={initialValues?.city || ""}
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
            <div className="area-form-column-b">
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
                                            className="area-input-number-form"
                                        />
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <div>
                                        <InputNumberForm
                                            title={"Mínima"}
                                            information={temperatureMin}
                                            onValueChange={handleTemperatureMinChange}
                                            className="area-input-number-form"
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
                            <RadioForm
                                onChange={handleShiftChange}
                                initialValue={initialValues?.shift} 
                            />

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
                                initialValue={initialValues?.climate}
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
                                            information={precipitation}
                                            measure={"mm"}
                                            onValueChange={handlePrecipitation}
                                            className="area-input-number-form area-input-number-form-b"
                                    
                                        />
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <div>
                                        <InputNumberForm
                                            title={"Umidade"}
                                            information={humidity}
                                            measure={"%"}
                                            onValueChange={handleHumidity}
                                            className="area-input-number-form area-input-number-form-b"
                                        />
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <div>
                                        <InputNumberForm
                                            title={"Velocidade do vento"}
                                            information={wind}
                                            measure={"km/h"}
                                            onValueChange={handleWind}
                                            className="area-input-number-form area-input-number-form-b"
                                        />
                                    </div>
                                </Col>
                            </Flex>
                        </div>
                    </div>
                </Flex>

            </div>
        </div>

    )
}

export default FormComponent;