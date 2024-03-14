import React from 'react';
import { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useTasks } from "utils/ProviderContext";


  export function Identity() {

    const { formatCedula } = useTasks();

    const { TextArea } = Input;  
    const [cedula, setCedula] = useState('');
  
    
  
    const handleCedulaChange = (e) => {
      const newValue = formatCedula(e.target.value);
      setCedula(newValue);
    };
  
    const onFinish = (values) => {
      console.log('Received values of form:', values);    
      window.location.href = `/docs/user-identity?cedula=${encodeURIComponent(cedula)}`;
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 16 }}
        className="max-w-screen-md mx-auto"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label=""
          name="username"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su cédula!',
            },
            {
              min: 6,
              message: 'Su cédula debe tener al menos 6 caracteres',
            },
          ]}
          style={{ textAlign: 'center' }}
        >
          <div className="flex flex-col">
            <label htmlFor="cedula" className="text-lg font-bold mb-2 py-5 label-divider">
              INTRODUCE TU CEDULA
            </label>
          
              <Input
              name="cedula"
              placeholder="cedula"
              onChange={handleCedulaChange}                 
              value={cedula}
                                               
              className="w-full"
            />
          </div>
        </Form.Item>
  
        <Form.Item wrapperCol={{ span: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="default"
              htmlType="submit"
              className="bg-sky-400 text-white px-40 py-0 my-5 rounded hover:bg-sky-700"
            >
              CONTINUAR
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }