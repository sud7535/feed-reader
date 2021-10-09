import React, { useState } from 'react';
import Axios from 'axios';
import FeedPage from './feedPage';
import './css/Login.css'

function LoginScreen() {
  const [userName, setUser] = useState("");
  const [passWord, setPass] = useState("");
  const [userPlaceHolder, setUserPlaceHolder] = useState("username");

  const handleUser = (event) => {
    setUser(event.target.value);
  }

  const handlePass = (event) => {
    setPass(event.target.value);
  }

  async function handleLogin() {
    try {
      const response = await Axios.post("http://localhost:5000/login", {
        user: userName,
        pass: passWord,
      });
      if (response.data.ok === true) {
        localStorage.setItem('cookie',response.data.cookie)
        sessionStorage.setItem('id', response.data.id);
        sessionStorage.setItem('name',response.data.name);
        return <FeedPage/>
      }
      else {
        setUserPlaceHolder("Incorrect username or password")
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit() {
    try {
      const response = await Axios.post("http://localhost:5000/signup", {
        user: userName,
        pass: passWord,
      })
      console.log(response.data);
      if (response.data.ok === true) {
        localStorage.setItem('cookie',response.data.cookie)
        sessionStorage.setItem('id', response.data.id);
        sessionStorage.setItem('name',response.data.name);
        window.location.reload()
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login">
      <div className="container">
        <label htmlFor="uname">Username</label>
        <input type="text" placeholder={userPlaceHolder} onChange={handleUser}></input>
        <label htmlFor="pass">Password</label>
        <input type="password" placeholder="password" onChange={handlePass}></input>
      </div>
      <div className="btn">
        <button type="button" onClick={handleLogin}>Login</button>
        <p>OR</p>
        <button type="button" onClick={handleSubmit}>Signup</button>
      </div>
    </div>
  );
}

function Login() {
  const [cookee,setCookie] = useState(false);
  async function checkCookie() {
    try {
      const data = localStorage.getItem('cookie')
      const response = await Axios.post("http://localhost:5000/ifcookie", {
        cookie: data,
      });
      if (response.data.ok === true) {
        console.log("Cookie found")
        sessionStorage.setItem('id', response.data.id);
        sessionStorage.setItem('name',response.data.name);
        setCookie(true);
      }
      // else {
      //   return false;
      // }
    } catch (err) {
      console.log(err);
    }
  }
  checkCookie();
  if (cookee === true){
    console.log("ha hain");
    return <FeedPage/>
  }
  else {
    return <LoginScreen/>
  }
}

export default Login
