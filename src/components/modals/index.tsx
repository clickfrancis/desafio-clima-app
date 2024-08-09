import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './style.scss'


interface Props{
    isModalVisible: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    message?: string
}

const ModalForm: React.FC<Props> = ({isModalVisible, onOk, onCancel, message}) => {

  return (
    <>
      <Modal
       className='modal-form'
       open={isModalVisible}
       onOk={onOk}
       onCancel={onCancel}
       okButtonProps={{ style: {display: 'none'} }}
       cancelButtonProps={{ style: { display: 'none' } }}
      >
         <p>{message || 'Por favor, preencha todos os campos obrigatórios antes de salvar.'}</p>
      </Modal>
    </>
  );
};

export default ModalForm;