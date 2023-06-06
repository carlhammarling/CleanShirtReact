import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import "./Login.scss";
import { UserContext } from '../../contexts/UserContext'

const Login = () => {

  const { setUser, user } = useContext(UserContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Visible errormessage.
  const [error, setError] = useState(null);

  //To be able to change input values.
  const handleChange = (e) => {
    e.preventDefault()

    setFormData({...formData, 
      [e.target.name]: e.target.value
    })
  };

  //Send form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null)

    if(formData.email == '' || formData.password == '') {
      setError('You have to fill in all fields!')
      return
    }

    try {

    const res = await axios.post('http://localhost:8080/api/users/login', formData)
      if(res.data) {
        // //Setting user to the data stored in the MongoDB
        setUser(res.data)
        
        //Save usertoken 
        localStorage.setItem('token', res.data)

        //Resets the login-form
        setFormData({
          email: '',
          password: ''
        })
        navigate('/checkout')

      }
    } catch (err) {
      if(err.response.status == 401) {
        console.log('Wrong email or password')
        setError('Wrong email or password')
      }
    }
  };

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <p>Allready have a user? Sign in!</p>
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <p className="error">{error}</p>

        <button>
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
