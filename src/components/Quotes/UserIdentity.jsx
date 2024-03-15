import {useEffect, useState, useRef} from "react"; 
import { useTasks } from "utils/ProviderContext";

import {ShowUser} from  '@/components/Quotes/ShowUser'
import {InsertUser} from  '@/components/Quotes/InsertUser'

const UserIdentity = () => {
  const { getUserInf } = useTasks();
  const [User, setUser] = useState([]);
  
  

  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const cedula = queryParams.get('cedula');
    const TIMEOUT = 10000; // 10 segundos


    const timeoutId = setTimeout(() => {
        controller.abort();
        console.log('La solicitud ha excedido el tiempo máximo de espera.');
    }, TIMEOUT);
        
    if (cedula) {
      getUserInf(cedula)
        .then(MapData => {          
          setUser(...MapData);
          clearTimeout(timeoutId);
        }) 
        .then(data => {
              console.log('Datos de la respuesta:', data);
        })
        .catch(error => {
          setUser(null);  
          clearTimeout(timeoutId);        
          console.error('Error fetching user information:', error);
        });
    }
  }, []);

  return (
    <>   
    

      {User && Object.keys(User).length > 0 ? <ShowUser DataUser={User} /> : null}

      {!User ? <InsertUser /> : null}

    </>
  );
}

export default UserIdentity;