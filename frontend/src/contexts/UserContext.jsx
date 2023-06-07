import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const UserContext = createContext()


const UserContextProvider = ({ children }) => {

      const [token, setToken] = useState(null)

      const [userData, setUserData] = useState()

      
      useEffect(() => {
        if(!token) {
          return
        }
        axios.get('http://localhost:8080/api/users/bytoken', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      }, [token])

      useEffect(() => {
        if(userData) {
          console.log(userData)
        }
      }, [userData])





  return (
    <UserContext.Provider value={{ token, setToken, userData, setUserData }} >
        {/* all children can access this data */}
        { children }
    </UserContext.Provider>
  )
}

export default UserContextProvider