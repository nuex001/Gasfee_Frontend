import React, { useEffect, useState } from 'react'
import "../../../assests/wallet.css"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { successMsg, errorMsgs } from '../../utils/utils';

function Wallet() {
    const [balance, setBalance] = useState(0);
    const deposit = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_ROUTE}wallet/deposit/`,
                {
                    amount: 50
                },
                {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    }
                }
            );
            successMsg(res.data.msg);
            setTimeout(() => {
                fetchBalance();
            }, 5000);
        } catch (error) {
            console.log(error);
            errorMsgs(error.data);
        }
    }
    const withdraw = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_ROUTE}wallet/withdraw/`,
                {
                    amount: 50
                },
                {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    }
                }
            );
            successMsg(res.data.msg);
            setTimeout(() => {
                fetchBalance();
            }, 5000);
        } catch (error) {
            console.log(error);
            errorMsgs(error.data);
        }
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
        <div className='wallet'>
            <ToastContainer/>
            <div className="walletChild">
                <h1>MY WALLET</h1>
                <h1>${balance}</h1>
                <div className="box">
                    <div className="innerbox">
                        <h3>$50</h3>
                        <button onClick={deposit}>Deposit</button>
                    </div>
                    <div className="innerbox">
                        <h3>$50</h3>
                        <button onClick={withdraw}>Withdraw</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet