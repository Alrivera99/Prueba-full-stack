import React from 'react';
import {Modal as ModalAntd} from 'antd';

export default function Modal(props){
    const{ children, title, isVisble, setIsVisible} = props;

    return(
        <ModalAntd
        title={title}
        centered
        visible={isVisble}
        onCancel={()=>setIsVisible(false)}
        footer={false}
        >
            {children}
        </ModalAntd>
    );
}