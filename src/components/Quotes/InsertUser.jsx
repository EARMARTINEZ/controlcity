import React from 'react';
import { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { toast } from "react-toastify";
import { saveWebsite, getWebsites, getWebsite, updateWebsite } from "../../firebase/api";
import { useTasks } from "utils/ProviderContext";

const currentDate = new Date();

const initialState = {
  order: 0,
  cedula: "",
  nombre: "",
  telefono: "",
  type: "unregistered",
  firma: "",
  date: currentDate 
};

  export function InsertUser() {

    const { validateCedula } = useTasks();
    
    const [customerAttention, setCustomerAttention] = useState(initialState);   
    const [clientes, setClientes] = useState([]);
    let RegistroId;
  
    const onFinish = async (values) => {
      try {
              getClientes();

              const orders = clientes.map(objeto => objeto.order);
              const maximo = orders.reduce((max, order) => Math.max(max, order), orders[0]);
              
              const UpdatedObject = {
                ...customerAttention, 
                order: maximo ? maximo + 1 : 1
              };  
              
              const Buscar = clientes.find(type => type.cedula == UpdatedObject.cedula )            

              if (!Buscar) {
                await saveWebsite(UpdatedObject)
                .then((docId) => {
                  RegistroId = docId._key.path.segments[1];
                  console.log('ID del documento guardado:', RegistroId);               
                })
                window.location.href = `/docs/pdf-viewer-with-signature?RegistroId=${encodeURIComponent(RegistroId)}`;

              } else {
                await saveWebsite(UpdatedObject)
                .then((docId) => {
                  RegistroId = docId._key.path.segments[1];
                  console.log('ID del documento guardado:', RegistroId);               
                })
                window.location.href = `/docs/pdf-viewer-with-signature?RegistroId=${encodeURIComponent(RegistroId)}`;
                // await updateWebsite(Buscar.id, UpdatedObject);
                // toast("Updated", {
                //   type: "success",
                // });
               
              }
     
       

      } catch (error) {
        console.error(error);
      }
    };

    const handleInputChange = ({ target: { name, value } }) =>{
      setCustomerAttention({ ...customerAttention, [name]: value });
      
    }

   
    
    const getClientes = async () => {
      const querySnapshot = await getWebsites();   
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      // console.log(docs)
      setClientes(docs) 
    };
  
    useEffect(() => {   
      getClientes();
    
    }, []);

  
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
              name="cedula"                    
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
              value={customerAttention.cedula}
                                               
              className="w-full"
            />
         </Form.Item>

            <Form.Item
                label="Nombre" 
                name="nombre"                
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                >
                
                  <Input 
                    name="nombre"  
                    value={customerAttention.nombre}
                    onChange={handleInputChange}
                  />
              </Form.Item> 

              <Form.Item
              label="Telefono" 
              name="telefono"              
              rules={[
                  {
                  required: true,
                  message: 'Please input your username!',
                  },
              ]}
              >
              <Input 
              name="telefono"  
              value={customerAttention.telefono}
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