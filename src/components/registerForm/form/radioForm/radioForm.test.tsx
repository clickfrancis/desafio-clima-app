import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioForm from './index';

describe('RadioForm', () => {
  test('deve renderizar os botões de rádio corretamente', () => {
    render(
        <RadioForm
            onChange={() => {}} 
        />
    );

    expect(screen.getByText('MANHÃ')).toBeInTheDocument();
    expect(screen.getByText('TARDE')).toBeInTheDocument();
    expect(screen.getByText('NOITE')).toBeInTheDocument();
  });

  test('deve chamar a função onChange quando um botão de rádio é selecionado', () => {
    const handleChange = jest.fn();
    render(
        <RadioForm
            onChange={handleChange}
        />
    );

    fireEvent.click(screen.getByText('TARDE'));

    expect(handleChange).toHaveBeenCalledWith('TARDE');
  });

  test('deve renderizar opções e selecionar o valor correto', () => {
    
    const handleChange = jest.fn();
    render(
        <RadioForm
            onChange= 
                {handleChange}
                initialValue="NOITE"
        />
    );
   
    fireEvent.click(screen.getByText('MANHÃ'))
    expect(handleChange).toHaveBeenCalledWith('MANHA');  });
});
