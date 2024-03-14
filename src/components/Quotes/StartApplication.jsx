import {useEffect, useState, useRef} from "react"; 
import { SearchOutlined } from '@ant-design/icons';
import {ConfigProvider, Card, Input, Space, Table, Button  } from 'antd';

import {Identity} from  '@/components/Quotes/Identity'

const StartApplication = () => {

   
  return (  
    
    <>  
    <ConfigProvider

theme={{
    token: {      
       
    },
  }}
      
      >    


    <Identity  />

    
    </ConfigProvider>    

    </>
   
  )
}

export default StartApplication