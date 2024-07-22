import React from 'react';
import { Flex, Radio } from 'antd';
import './style.scss'

const RadioForm: React.FC = () => (
  <Flex vertical gap="middle">
    <Radio.Group defaultValue="" buttonStyle="solid" className='custom-radio-group' >
      <Radio.Button value="a" className='custom-radio'>MANHÃ</Radio.Button>
      <Radio.Button value="b" className='custom-radio custom-radio-adapter'>TARDE</Radio.Button>
      <Radio.Button value="c" className='custom-radio custom-radio-adapter'>NOITE</Radio.Button>
    </Radio.Group>
  </Flex>
);

export default RadioForm;