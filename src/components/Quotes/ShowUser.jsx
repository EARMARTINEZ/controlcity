import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Result } from 'antd';



  export function ShowUser({DataUser}) {
    const { TextArea } = Input;

    const {nombre, cedula}=DataUser

  
    const onFinish = (values) => {
        console.log('Received values of form:', values);
        // Add your navigation logic or API calls here if needed
        window.location.href = `/docs/pdf-viewer-with-signature`;
      };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
<>
    <Form
            name="ShowUser"
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
                title={cedula}
                subTitle={nombre}
            
                extra={[
                    <div key='ShowUser'>
                    <header className="mb-1 space-y-1">
                    <h5 className="font-display text-2xl tracking-tight text-slate-900 dark:text-white">Banesco Seguro</h5>      
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