import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Login from './login';
import Users from './users';



export default function Home() {

  const [loggedUser, setLoggedUser] = useState();

  const triggerAuth = () => {
    onAuthStateChanged(getAuth(), async (user)=>{
      if(user){
          console.log("Logged in ", user)
          setLoggedUser(user);
      }else{
          console.log("Logged out");
          setLoggedUser(null);
      }
    })
  }

  const getData = (data) => {
    if(data == 'userLoggedIn') {
      triggerAuth()
    }
  }

  useEffect(() => {

    triggerAuth();

  }, []);


  return (
  
    <>
        {
          loggedUser && <Users />
        }
        {
          !loggedUser && <Login onSubmit={getData} />
        }

    </>

  );
}
