import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormComponent from './index';
import { ClimateType } from '../../resources/enums/climaTypes';

describe('FormComponent', () => {
  const handleCityChange = jest.fn();
  const handleDateChange = jest.fn();
  const handleTemperatureMaxChange = jest.fn();
  const handleTemperatureMinChange = jest.fn();
  const handleClimateSelect = jest.fn();
  const handleShiftChange = jest.fn();
  const handlePrecipitation = jest.fn();
  const handleHumidity = jest.fn();
  const handleWind = jest.fn();

  const initialValues = {
    city: 'Salvador',
    date: '2024-08-12',
    climate: ClimateType.ENSOLARADO,
    shift: 'MANHA'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar todos os subcomponentes e permitir interação', () => {
    render(
      <FormComponent
        handleCityChange={handleCityChange}
        handleDateChange={handleDateChange}
        temperatureMin={10}
        temperatureMax={30}
        handleTemperatureMaxChange={handleTemperatureMaxChange}
        handleTemperatureMinChange={handleTemperatureMinChange}
        handleClimateSelect={handleClimateSelect}
        handleShiftChange={handleShiftChange}
        handlePrecipitation={handlePrecipitation}
        handleHumidity={handleHumidity}
        handleWind={handleWind}
        precipitation={5}
        humidity={60}
        wind={10}
        initialValues={initialValues}
      />
    );

    expect(screen.getByText('Buscar por cidade')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o nome da cidade')).toBeInTheDocument();
    expect(screen.getByText('Selecione a data')).toBeInTheDocument();
    expect(screen.getByText('Informe a temperatura')).toBeInTheDocument();
    expect(screen.getByText('Máxima')).toBeInTheDocument();
    expect(screen.getByText('Mínima')).toBeInTheDocument();
    expect(screen.getByText('Selecione o turno')).toBeInTheDocument();
    expect(screen.getByText('Informe o clima')).toBeInTheDocument();
    expect(screen.getByText('Informações adicionais')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Digite o nome da cidade'), { target: { value: 'Rio de Janeiro' } });
    expect(handleCityChange).toHaveBeenCalledWith(expect.anything());

    fireEvent.change(screen.getByPlaceholderText('Selecione a data'), { target: { value: '2024-08-13' } });
    expect(handleDateChange).toHaveBeenCalledWith('2024-08-13');

    fireEvent.change(screen.getByLabelText('Máxima'), { target: { value: 35 } });
    expect(handleTemperatureMaxChange).toHaveBeenCalledWith(35);

    fireEvent.change(screen.getByLabelText('Mínima'), { target: { value: 15 } });
    expect(handleTemperatureMinChange).toHaveBeenCalledWith(15);

    fireEvent.click(screen.getByLabelText('MANHÃ'));
    expect(handleShiftChange).toHaveBeenCalledWith('MANHA');

    fireEvent.click(screen.getByText('Summer'));
    expect(handleClimateSelect).toHaveBeenCalledWith(ClimateType.ENSOLARADO);

    fireEvent.change(screen.getByLabelText('Precipitação'), { target: { value: 10 } });
    expect(handlePrecipitation).toHaveBeenCalledWith(10);

    fireEvent.change(screen.getByLabelText('Umidade'), { target: { value: 70 } });
    expect(handleHumidity).toHaveBeenCalledWith(70);

    fireEvent.change(screen.getByLabelText('Velocidade do vento'), { target: { value: 15 } });
    expect(handleWind).toHaveBeenCalledWith(15);
  });
});
