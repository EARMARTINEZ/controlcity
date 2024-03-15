import React from 'react';
import { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Result } from 'antd';
import { saveWebsite, getWebsites, getWebsite, updateWebsite } from "../../firebase/api";


  export function ShowUser({DataUser}) {
    const { TextArea } = Input;

    const {nombre, cedula, telefonocelular}=DataUser

    const initialState = {
      order: "",
      cedula: cedula,
      nombre: nombre,
      telefono: telefonocelular,
      type: "registered",
      firma: "",
    };

    const [customerAttention, setCustomerAttention] = useState(initialState);   
    const [clientes, setClientes] = useState([]);
    let RegistroId;
   

    const getClientes = async () => {
      const querySnapshot = await getWebsites();   
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
       console.log(docs)
      setClientes(docs) 
    };
  
    useEffect(() => {   
      getClientes();
    
    }, []);

  
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
              
               
              }
     
       

      } catch (error) {
        console.error(error);
      }
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
                    <h5 className="font-display text-2xl tracking-tight text-slate-900 dark:text-white">Seguro: xxxxxx</h5>      
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