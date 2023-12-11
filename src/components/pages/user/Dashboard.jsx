import React, { useEffect, useRef, useState } from 'react'
import "../../../assests/user.css"
import dp from "../../../assests/images/dp.png"
import { Routes, Route, Link } from "react-router-dom";
import { AiFillPlusCircle, AiTwotoneHome, AiOutlineTransaction, AiOutlineShoppingCart, AiFillWallet, AiOutlinePayCircle } from "react-icons/ai"
import { BsChevronDoubleLeft, BsGift, BsWalletFill } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaTimesCircle } from 'react-icons/fa';
import { TbLogout2 } from "react-icons/tb";
import Gas from './Gas'
import Transactions from './Transactions';
import Wallet from './Wallet';
import Reward from './Reward';
import axios from "axios";

function Dashboard() {
    const menu = useRef();
    const [balance, setBalance] = useState(0);
    const goBack = () => {
        history.back();
    }
    const menuPopUp = () => {
        menu.current.classList.toggle("active");
    }
    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        window.location.href = "/";
    }
    const fetchBalance = async () => {
        const res = await axios.get(`${import.meta.env.VITE_ROUTE}wallet/`, {
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
        })
        setBalance(res.data?.msg?.balance);
    }
    useEffect(() => {
        fetchBalance();
    }, [])
    return (
        <div className='user'>
            <div className="sidebar" ref={menu}>
                <BsChevronDoubleLeft className='icon' onClick={goBack} />
                <FaTimesCircle className='cancel' onClick={menuPopUp} />
                <div className="cont">
                    <img src={dp} alt="" />
                    <h1>{localStorage.name && localStorage.name}</h1>
                    <h2>{balance? balance : 0}
                        <Link to="">
                            <AiFillPlusCircle />
                        </Link>
                    </h2>
                    <ul>
                        <li>
                            <Link to="/">
                                <AiTwotoneHome className='lIcon' />Home</Link>
                        </li>
                        <li>
                            <Link to={"/user/"} onClick={menuPopUp}><AiOutlineShoppingCart className='lIcon' />Gas</Link>
                        </li>
                        <li>
                            <Link to={"/user/wallet/"} onClick={menuPopUp}><BsWalletFill className='lIcon' />wallet</Link>
                        </li>
                        <li>
                            <Link to={"/user/transaction/"} onClick={menuPopUp}><AiOutlineTransaction className='lIcon' />Transactions</Link>
                        </li>
                        <li>
                            <Link to={"/user/reward"} onClick={menuPopUp}><BsGift className='lIcon' />Redem Rewards</Link>
                        </li>
                        <li>
                            <Link to={"#"} onClick={logOut}><TbLogout2 className='lIcon' />Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <main>
                <div className="subNav">
                    <h1>welcome , {localStorage.name && localStorage.name}</h1>
                    <HiMenuAlt3 className='menu' onClick={menuPopUp} />
                </div>
                <Routes>
                    <Route exact path="/" element={<Gas />} />
                    <Route exact path="/transaction" element={<Transactions />} />
                    <Route exact path="/wallet" element={<Wallet />} />
                    <Route exact path="/reward" element={<Reward />} />
                </Routes>
            </main>
        </div>
    )
}

export default Dashboard