import React, { useState } from 'react'
import "../../assests/sign.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMsg, errorMsgs } from '../utils/utils';
function SignUp() {
    const [exists, setExists] = useState(false);
    const [pasmatch, setPasmatch] = useState(false);
    const [formdata, setFormdata] = useState({
        username: "",
        password: "",
        conPassword: ""
    });
    const navigate = useNavigate();
    const { username, password, conPassword } = formdata;

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            if (!exists && pasmatch) {
                const res = await axios.post(`${import.meta.env.VITE_ROUTE}`, formdata);
                successMsg(res.data.msg);
                setFormdata({
                    username: "",
                    password: "",
                    conPassword: ""
                });
                setTimeout(() => {
                    navigate("/signin");
                }, 5000);
            }
        } catch (error) {
            // console.log(error);
            errorMsgs(error.response.data.err);
        }
    }
    const checkUser = async (e) => {
        // console.log(e.target.value);
        const res = await axios.get(`${import.meta.env.VITE_ROUTE}${e.target.value}`);
        setExists(res.data.msg);
    }
    const checkPass = async (e) => {
        setPasmatch(e.target.value === password);
    }
    const changedata = async (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }
    return (
        <div className='sign'>
            <ToastContainer />
            <form action="" onSubmit={submitForm}>
                <h1>SIGN UP</h1>
                <div className="row">
                    <label htmlFor="username">username</label>
                    <input type="text"
                        placeholder='User name'
                        id='username'
                        value={username}
                        name='username'
                        required
                        onKeyUp={checkUser}
                        onChange={changedata}
                    />
                    {
                        exists &&
                        <span className='bad'>username already taken</span>
                    }
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        placeholder='Password'
                        id='password'
                        name='password'
                        required
                        value={password}
                        onChange={changedata}
                    />
                </div>
                <div className="row">
                    <label htmlFor="conPassword">Confirm Password</label>
                    <input type="password"
                        placeholder='Confirm Password'
                        id='conPassword'
                        name='conPassword'
                        required
                        onInput={checkPass}
                        value={conPassword}
                        onChange={changedata}
                    />
                    {conPassword && !pasmatch && <span className='bad'>Password didn't Match</span>}
                </div>
                <p>Already Signed In? <Link to="/signin">Sign In</Link></p>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp