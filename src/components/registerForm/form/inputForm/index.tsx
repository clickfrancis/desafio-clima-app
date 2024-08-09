import React from 'react';
import { Input, Space } from 'antd';
import './style.scss'
import { SearchOutlined } from '@ant-design/icons';

interface Props {
  onTextChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
  value?: string
}

const InputForm: React.FC<Props> = (props: Props) => {
  const { onTextChange , value} = props;

  return (
    <Space  className='areaSearchCity' direction="vertical">
      <span>
        Cidade*
      </span>
      <Input
        onChange={onTextChange}
        value={value || ""}
        className='areaInputCity'
        placeholder="Busque por uma cidade"
        suffix={<SearchOutlined />}
      />
    </Space>
  );
};

export default InputForm;
