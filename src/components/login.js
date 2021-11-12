import React, { useState } from "react";
import Axios from "axios";
import FeedPage from "./feedPage";
import "./css/Login.css";

function LoginScreen() {
  const [userName, setUser] = useState("");
  const [passWord, setPass] = useState("");
  const handleUser = (event) => {
    setUser(event.target.value);
  };
  const handlePass = (event) => {
    setPass(event.target.value);
  };
  async function handleLogin() {
    try {
      const response = await Axios.post("http://localhost:5000/login", {
        user: userName,
        pass: passWord,
      });
      if (response.data.ok === true) {
        localStorage.setItem("cookie", response.data.cookie);
        sessionStorage.setItem("id", response.data.id);
        sessionStorage.setItem("name", response.data.name);
        window.location.reload()
      } else {
        alert("Login failed");
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
      });
      console.log(response.data);
      if (response.data.ok === true) {
        localStorage.setItem("cookie", response.data.cookie);
        sessionStorage.setItem("id", response.data.id);
        sessionStorage.setItem("name", response.data.name);
        window.location.reload()
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="loginPage">
      <form className="login-block">
        <input type="text" placeholder="Username" onChange={handleUser}></input>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePass}
        ></input>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleSubmit}>
          Signup
        </button>
      </form>
    </div>
  );
}

function Login() {
  const data = localStorage.getItem("cookie");
  async function checkCookie(data) {
    try {
      const response = await Axios.post("http://localhost:5000/ifcookie", {
        cookie: data,
      });
      if (response.data.ok === true) {
        console.log("Cookie found");
        sessionStorage.setItem("id", response.data.id);
        sessionStorage.setItem("name", response.data.name);
        // setCookie(true);
        return <FeedPage />;
      } else {
        return <LoginScreen />;
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(data);
  if (data != null) {
    if (checkCookie(data)) return <FeedPage />;
    else return <LoginScreen />;
  } else {
    console.log("LoginScreen");
    return <LoginScreen />;
  }
}

export default Login;
