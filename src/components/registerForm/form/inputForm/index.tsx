import React from 'react';
import { Input, Space } from 'antd';

const InputForm: React.FC = () => {

  return (
    <Space direction="vertical">
      <span>
        Cidade*
      </span>
      <Input.Search
        placeholder="Busque por uma cidade"
      />
      <Space direction="horizontal">
      </Space>
    </Space>
  );
};

export default InputForm;
