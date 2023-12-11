import React, { useState } from 'react'
import "../../../assests/reward.css";
import Select from 'react-select';
import stakeCover from "../../../assests/images/stake.jpeg"
import { errorMsgs, selectStyle, successMsg } from '../../utils/utils'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { ETH_ABI, ETH_CONTRACT_ADDRESS, MATIC_CONTRACT_ADDRESS } from '../../utils/constants';
import { useEthersSigner } from '../../utils/ethers';
import { useWalletClient } from 'wagmi';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
function Reward() {
    const [formdata, setFormdata] = useState({
        amount: 0,
        chain: "",
    })
    const options = [
        { value: 'eth', label: 'Etherum' },
        { value: 'matic', label: 'Polygon' },
    ];
    const { amount, chain } = formdata;
    const updateVal = async (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }
    const setSelectedOption = async (e) => {
        setFormdata({ ...formdata, chain: e.value });
    }
    const signer = useEthersSigner();
    const { data: walletClient } = useWalletClient();
    const claimReward = async (e) => {
        e.preventDefault();
        try {
            if (amount <= 0 || chain.trim() === "") {
                errorMsgs("Please fill all inputs");
            } else { //if user inputs all detials we move
                if (walletClient) {
                    if (chain === "eth") { //if eth
                        const eth_contract = new ethers.Contract(
                            ETH_CONTRACT_ADDRESS,
                            ETH_ABI,
                            signer
                        );
                        const amountInWei = ethers.utils.parseUnits(amount, 'ether');
                        console.log(Number(amountInWei));
                        // const tx = await eth_contract.claimReward();
                        const tx = await eth_contract.convertReward(amountInWei);
                        if (tx) {
                            const eth = ethers.utils.formatEther(amountInWei);
                            const amounEth = eth / 50; //one of our token is worth 50 now, might increase with time
                            const res = await axios.put(`${import.meta.env.VITE_ROUTE}wallet/deposit/`,
                                {
                                    amount: amounEth
                                },
                                {
                                    headers: {
                                        "auth-token": localStorage.getItem("token"),
                                    }
                                }
                            );
                            successMsg("Reward claimed successfully");
                            setTimeout(() => {
                                window.location.reload(false);
                            }, 5000);
                        }
                    } else { //if matic
                        const eth_contract = new ethers.Contract(
                            MATIC_CONTRACT_ADDRESS,
                            ETH_ABI,
                            signer
                        );
                        const amountInWei = ethers.utils.parseUnits(amount, 'ether');
                        // console.log(Number(amountInWei)); 1710.3400000000013
                        // const tx = await eth_contract.claimReward();
                        const tx = await eth_contract.convertReward(amountInWei);
                        if (tx) {
                            const eth = ethers.utils.formatEther(amountInWei);
                            const amounEth = eth / 50; //one of our token is worth 50 now, might increase with time
                            const res = await axios.put(`${import.meta.env.VITE_ROUTE}wallet/deposit/`,
                                {
                                    amount: amounEth
                                },
                                {
                                    headers: {
                                        "auth-token": localStorage.getItem("token"),
                                    }
                                }
                            );
                            console.log(res);
                            successMsg("Reward claimed successfully");
                            setTimeout(() => {
                                window.location.reload(false);
                            }, 5000);
                        }
                    }
                } else {
                    errorMsgs("Connect Wallet please");
                }
            }

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='reward'>
            <ToastContainer />
            <div className="row">
                <img src={stakeCover} alt="" />
                <div className="box">
                    <h1>Redeem Reward</h1>
                    <form action="">
                        <input type="number" name='amount' className='no' value={amount}
                            onChange={updateVal}
                        />
                        <Select
                            onChange={setSelectedOption}
                            options={options}
                            styles={selectStyle}
                            className='selectInput'
                        />
                        <div className="btns">
                            <ConnectButton className="connectBtn" />
                        </div>
                        <p>
                            <span>NOTE: </span>
                            wait for a while till you see a success or error alert before leaving window or else, your funds will be lost
                        </p>
                        <div className="btns">
                            <button className='rewardBtn' onClick={claimReward}>Redeem</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Reward