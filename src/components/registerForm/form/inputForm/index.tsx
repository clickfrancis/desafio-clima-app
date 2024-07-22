import React from 'react';
import { Input, Space } from 'antd';
import './style.scss'
import { SearchOutlined } from '@ant-design/icons';

const InputForm: React.FC = () => {

  return (
    <Space  className='areaSearchCity' direction="vertical">
      <span>
        Cidade*
      </span>
      <Input
        className='areaInputCity'
        placeholder="Busque por uma cidade"
        suffix={<SearchOutlined />}
      />
    </Space>
  );
};

export default InputForm;
