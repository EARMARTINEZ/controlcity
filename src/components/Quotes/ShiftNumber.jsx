import React from 'react';
import {useEffect, useState, useRef} from "react"; 
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Result } from 'antd';



  export function ShiftNumber() {
    const { TextArea } = Input;

    const [nTruno, setnTruno] = useState();

    useEffect(() => {
     
      const queryParams = new URLSearchParams(window.location.search);
      const truno = queryParams.get('turno');      
      setnTruno(truno)

      console.log('truno:', truno);  
     
    }, []);
  
    const onFinish = (values) => {
       
        window.location.href = `/`;
      };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
<>
    <Form
            name="ShiftNumber"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 16 }}
            className="max-w-screen-md mx-auto"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item >  
                <Result
                status="success"
                title="CARDIA SCHWARZ"
                subTitle=""
            
                extra={[
                    <div key='ShowUser'>
                    <header className="mb-1 space-y-1">
                    <h5 className="font-display text-2xl tracking-tight text-slate-900 dark:text-white">TURNO: {nTruno} </h5>      
                    </header>                
                
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                        type="default"
                        htmlType="submit"
                        className="bg-sky-400 text-white px-40 py-0 my-5 rounded hover:bg-sky-700"
                        >
                        CONTINUAR
                        </Button>
                    </div>
                    
                </div>
                ]}
            />
            </Form.Item>
    </Form>
      </>
    );
  }