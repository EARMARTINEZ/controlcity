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
    
    if (cedula) {
      getUserInf(cedula)
        .then(MapData => {
          setUser(...MapData);
        })
        .catch(error => {
          setUser(null);
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