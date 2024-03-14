import React from 'react';
import { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useTasks } from "utils/ProviderContext";

const initialState = {
  cedula: "",
  nombre: "",
  telefono: "",
};

  export function InsertUser() {

    const { validateCedula } = useTasks();
    const { TextArea } = Input;

    const [website, setWebsite] = useState(initialState);
    const [cedula, setCedula] = useState('');
    const [InsertUser, setInsertUser] = useState({});
  
    const onFinish = (values) => {
      // console.log('Received values of form:', values);

      setInsertUser(values);

      console.log('Received values of form:', website);
     
      // window.location.href = `/docs/pdf-viewer-with-signature?cedula=${encodeURIComponent(values.cedula)}`;
    };

    const handleInputChange = ({ target: { name, value } }) =>{
      setWebsite({ ...website, [name]: value });
      console.log(website);



    }
    

     
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    
  
    return (
<>
        
   
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
        <header className="mb-9 space-y-1">
        <h1 className="font-display text-2xl tracking-tight text-slate-900 dark:text-white">INGRESA TUS DATOS</h1>
        <p className="font-display text-sm font-medium text-blue-500"></p>
    </header> 
          <Form.Item
              label="Cedula"  
              name="forcedula"                    
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese su cédula!',
                },
                {
                  min: 6,
                  message: 'Su cédula debe tener al menos 6 caracteres',
                },
                {
                  max: 9,
                  message: 'Su cédula no debe ser mayor 9 caracteres',
                },
                {
                  validator: validateCedula, 
                },
               
               
              ]}
            >
            <Input
              name="cedula"
              onChange={handleInputChange}    
              placeholder=""
              value={website.cedula}
                                               
              className="w-full"
            />
         </Form.Item>

            <Form.Item
                label="Nombre" 
                name="forNombre"                
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                >
                
                  <Input 
                    name="nombre"  
                    value={website.nombre}
                    onChange={handleInputChange}
                  />
              </Form.Item> 

              <Form.Item
              label="Telefono" 
              name="forTelefono"              
              rules={[
                  {
                  required: true,
                  message: 'Please input your username!',
                  },
              ]}
              >
              <Input 
              name="telefono"  
              value={website.telefono}
              onChange={handleInputChange}
              />
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

      </>
    );
  }