import React from 'react';
import { Input, Space } from 'antd';
import './style.scss'

const InputForm: React.FC = () => {

  return (
    <Space direction="vertical">
      <span>
        Cidade*
      </span>
      <Input.Search className='areaSearchCity'
        placeholder="Busque por uma cidade"
      />
    </Space>
  );
};

export default InputForm;
