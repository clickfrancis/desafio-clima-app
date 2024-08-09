import React from 'react';
import { Flex, Radio } from 'antd';
import './style.scss';

interface RadioFormProps {
  onChange: (value: string) => void;
  initialValue?: string;
}

const RadioForm: React.FC<RadioFormProps> = ({ onChange, initialValue }) => {
  return (
    <Flex vertical gap="middle">
      <Radio.Group 
        value={initialValue}
        onChange={(e) => onChange(e.target.value)}
        buttonStyle="solid" 
        className='custom-radio-group'
      >
        <Radio.Button value="MANHA" className='custom-radio'>MANHÃ</Radio.Button>
        <Radio.Button value="TARDE" className='custom-radio custom-radio-adapter'>TARDE</Radio.Button>
        <Radio.Button value="NOITE" className='custom-radio custom-radio-adapter'>NOITE</Radio.Button>
      </Radio.Group>
    </Flex>
  );
};

export default RadioForm;
