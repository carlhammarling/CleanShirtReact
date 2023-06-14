import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const UserContext = createContext()


const UserContextProvider = ({ children }) => {

      const [token, setToken] = useState(null)

      const [userData, setUserData] = useState()

      const [gender, setGender] = useState(false);

      const [selectedSort, setSelectedSort] = useState("");



      
  const getUserData = () => {
    if (!token) {
      return;
    }

    axios
      .get('http://localhost:8080/api/users/bytoken', {
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
    <UserContext.Provider value={{ token, setToken, userData, setUserData, getUserData, setGender, gender, setSelectedSort ,selectedSort }} >
        {/* all children can access this data */}
        { children }
    </UserContext.Provider>
  )
}

export default UserContextProvider