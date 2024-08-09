import React from 'react';
import { Select } from 'antd';
import { ClimateType } from '../../../../resources/enums/climaTypes';
import './style.scss';

interface Props {
  onSelect: (value: ClimateType) => void;
  initialValue?: ClimateType
}

const SelectForm: React.FC<Props> = ({ onSelect , initialValue}) => {

  const generateOptionsFromEnum = (enumObj: object) => {
    return Object.keys(enumObj).map(key => ({
      value: enumObj[key as keyof typeof enumObj],
      label: key.charAt(0) + key.slice(1).toLowerCase() 
    }));
  };

  const options = generateOptionsFromEnum(ClimateType);
  return (
    <Select
      showSearch
      className='select-climate-form'
      placeholder="Search to Select"
      optionFilterProp="label"
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      onChange={value => onSelect(value as ClimateType)}
      options={options}
      value={initialValue}
    />)
};

export default SelectForm;