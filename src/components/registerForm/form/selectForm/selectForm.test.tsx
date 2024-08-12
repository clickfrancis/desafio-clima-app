import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectForm from './index';
import { ClimateType } from '../../../../resources/enums/climaTypes';

describe('SelectForm', () => {
  test('deve renderizar o seletor', () => {

    const handleSelect = jest.fn();

    render(<SelectForm onSelect={handleSelect} initialValue={ClimateType.ENSOLARADO}/>);
  });
});
