import React, { useState } from 'react';
import Axios from 'axios';
import FeedPage from './feedPage';
import './css/Login.css'
import 'tachyons'

function LoginScreen() {
  const [userName, setUser] = useState("");
  const [passWord, setPass] = useState("");

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
        window.location.reload()
      }
      else {
        alert("failed")
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

    <article className="br3 ba white b--green-10 mv4 w-200 w-500-m w-250-l mw6 center shadow-5">
      
      <main className="pa4 purple-80">
        <h2 className="center">Login/Signup form</h2>
        <div className="container">
          <label htmlFor="uname">Username </label>
          <input type="text" placeholder="username" onChange={handleUser}></input>
          <br></br>
          <br></br>
          <label htmlFor="pass">Password </label>
          <input type="password" placeholder="password" onChange={handlePass}></input>
        </div>
        <br></br>
        <div className="center">
          <button className="shadow-5 green pa1 bg-white br2" type="button" onClick={handleLogin}>Login</button>
        </div>
        
        <br></br>

        <h4 className="center">Don't have an account? Then register now!</h4>

        <div className="center">   
          <button className="shadow-5 green pa1 bg-white br2" type="button" onClick={handleSubmit}>Signup</button>
        </div>
      </main>

    
    </article>
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
