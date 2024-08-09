import React, { useState, useEffect } from 'react';
import { InputNumber, Row , Col, Flex} from 'antd';
import './style.scss';

function InputNumberForm(props: { title : String, information : number, measure? : String, onValueChange?: (value: number) => void, className?: string}) {
  const {title, information, measure, onValueChange, className} = props;
  const [value, setValue] = useState(information);

  useEffect(() => {
    setValue(information);
  }, [information]);

  const increaseValue = () => {
    const newValue = value + 1;
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const decreaseValue = () => {
    const newValue = value - 1;
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };
  
  return (
    <div className={className}>
      <Row>
        <Col>
          {title}
        </Col>
      </Row>
      
      <Flex justify='space-between' style={{paddingTop: 10}}>
        <div>
          <button 
            onClick={increaseValue}         
            className ='button-input-number-form'>
              {">"}
          </button>
        </div>
        
        <div>
          {value} {measure}
        </div>
        
        <div>
          <button
            onClick={decreaseValue}
            className='button-input-number-form button-input-number-form-adapter '>
            {">"}
          </button>
        </div>
      </Flex>
    </div>
  )
}

export default InputNumberForm;
