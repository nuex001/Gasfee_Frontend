import React, { useState } from 'react'
import "../../assests/sign.css"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMsg, errorMsgs } from '../utils/utils';
import axios from 'axios';
function SignIn() {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { username, password } = formdata;

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (username.trim() !== "" && password.trim() !== "") {
        const res = await axios.put(`${import.meta.env.VITE_ROUTE}`, formdata);
        successMsg(res.data.msg);
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.username);
        setFormdata({
          username: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/user/");
        }, 5000);
      }
    } catch (error) {
      // console.log(error);
      errorMsgs(error.response.data.err);
    }
  }
  const changedata = async (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }
  return (
    <div className='sign'>
      <ToastContainer />
      <form action="" onSubmit={submitForm}>
        <h1>SIGN IN</h1>
        <div className="row">
          <label htmlFor="username">username</label>
          <input type="text"
            placeholder='User name'
            id='username'
            name='username'
            value={username}
            onChange={changedata}
          />
          {/* <span className='bad'>username already taken</span> */}
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input type="password"
            placeholder='Password'
            id='password'
            name='password'
            value={password}
            onChange={changedata}
          />
        </div>
        <p>Don't have an account with us? <Link to="/signup">Sign Up</Link></p>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn