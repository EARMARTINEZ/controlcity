import { useSession } from 'next-auth/react';
import { useState, createContext, useContext } from "react";
import {fetchAPI } from "utils/api";  
export const UserContext = createContext({ isAuthenticated: false });
export const useTasks = () => useContext(UserContext);




const UserProvider = ({ children }) => { 
  
      /******************************************** */  
  async function getUserInf(values) {
    try {
      
        const cedula = values ? values : ''      
        
        const pageData = await fetchAPI("/user-info-seguro?id_card="+cedula, {            
          }).then( MapData => {                 
              
         
                     
        
          return MapData;
  });           
            
      return pageData;
        
      } catch (error) {
          console.log("error", error)
          
        }          
  }  


  const formatCedula = (value) => {
    // Implement your own formatting logic here
    // For example, add a dot after every 3 characters
    const formattedCedula = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    return formattedCedula;
  };

  const formatPhoneNumber = (phoneNumber) => {    
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');      
    const formattedPhoneNumber = cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    
    return formattedPhoneNumber;
  };
  
 
  const formatName = (name) => {   
    const formattedName = name.replace(/\b\w/g, (char) => char.toUpperCase());    
    return formattedName;
  };

  const validateCedula = (_, value) => {
    if (!value || /^\d+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('La cédula solo puede contener números.'));
  };


  const [InsertUser, setInsertUser] = useState({});

  const useract = {

    getUserInf:getUserInf,

    formatCedula:formatCedula,
    formatPhoneNumber:formatPhoneNumber,
    formatName:formatName,
    validateCedula:validateCedula,
    
    InsertUser:InsertUser,
    setInsertUser:setInsertUser,


  };
  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>

    
  );
};

export default UserProvider;