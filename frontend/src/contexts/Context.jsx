import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const Context = createContext()


const ContextProvider = ({ children }) => {

      const [token, setToken] = useState(null)

      const [userData, setUserData] = useState(null)

      const [gender, setGender] = useState(false);

      const [selectedSort, setSelectedSort] = useState("");



      
  const getUserData = () => {
    if (!token) {
      return;
    }

    axios
      .get('/api/users/bytoken', {
      // .get('http://localhost:8080/api/users/bytoken', {
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
  };

  useEffect(() => {
    getUserData();
  }, [token]);







  return (
    <Context.Provider value={{ token, setToken, userData, setUserData, getUserData, setGender, gender, setSelectedSort ,selectedSort }} >
        {/* all children can access this data */}
        { children }
    </Context.Provider>
  )
}

export default ContextProvider