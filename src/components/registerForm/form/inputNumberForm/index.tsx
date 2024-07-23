import React from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber, Row , Col, Flex} from 'antd';
import './style.scss';

function InputNumberForm(props: { title : String, information : number, measure? : String}) {
  const {title, information, measure} = props;
  return (
    <div className='area-input-number-form'>
      <Row>
        <Col>
          {title}
        </Col>
      </Row>
      
      <Flex justify='space-between' style={{paddingTop: 10}}>
        <div>
          <button className='button-input-number-form'>
            {">"}
          </button>
        </div>
        
        <div>
          {information} {measure}
        </div>
        
        <div>
          <button className='button-input-number-form button-input-number-form-adapter '>
            {">"}
          </button>
        </div>
      </Flex>
    </div>
  )
}

export default InputNumberForm;
