import React, { useState } from 'react'
import Select from 'react-select';
import "../../assests/stake.css"
import stakeCover from "../../assests/images/stake.jpeg"
import { errorMsgs, selectStyle, successMsg } from '../utils/utils'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { ETH_ABI, ETH_CONTRACT_ADDRESS, MATIC_CONTRACT_ADDRESS } from '../utils/constants';
import { useEthersSigner } from '../utils/ethers';
import { useWalletClient } from 'wagmi';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Stake() {
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
    const processStake = async (e) => {
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
                        const tx = await eth_contract.stake({ value: amountInWei });
                        successMsg("Stake made successfully");
                        setFormdata({
                            amount: 0,
                            chain: "",
                        });
                    } else { //if matic
                        const eth_contract = new ethers.Contract(
                            MATIC_CONTRACT_ADDRESS,
                            ETH_ABI,
                            signer
                        );
                        const amountInWei = ethers.utils.parseUnits(amount, 'ether');
                        const tx = await eth_contract.stake({ value: amountInWei });
                        successMsg("Stake made successfully");
                        setFormdata({
                            amount: 0,
                            chain: "",
                        });
                    }
                } else {
                    errorMsgs("Connect Wallet please");
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    const withdrawStake = async (e) => {
        e.preventDefault();
        try {
            if (chain.trim() === "") {
                errorMsgs("Please fill all inputs");
            } else { //if user inputs all detials we move
                if (walletClient) {
                    if (chain === "eth") { //if eth
                        const eth_contract = new ethers.Contract(
                            ETH_CONTRACT_ADDRESS,
                            ETH_ABI,
                            signer
                        );
                        const tx = await eth_contract.withdrawStake();
                        successMsg("Withdraw Stake made successfully");
                        setFormdata({
                            amount: 0,
                            chain: "",
                        });
                    } else { //if matic
                        const eth_contract = new ethers.Contract(
                            MATIC_CONTRACT_ADDRESS,
                            ETH_ABI,
                            signer
                        );
                        const tx = await eth_contract.withdrawStake();
                        successMsg("Withdraw Stake made successfully");
                        setFormdata({
                            amount: 0,
                            chain: "",
                        });
                    }
                } else {
                    errorMsgs("Connect Wallet please");
                }
            }

        } catch (error) {
            console.log(error);
            if (error.toString().includes("cannot estimate gas")) {
                errorMsgs("Low funds currently in the contract");
            }
        }
    }

    return (
        <div className='stake'>
            <ToastContainer />
            <div className="child">
                <img src={stakeCover} alt="" />
                <div className="box">
                    <h1>Stake</h1>
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
                        <div className="btns first">
                            <ConnectButton className="connectBtn" />
                        </div>
                        <p>
                            <span>NOTE: </span>
                            The withdraw only needs the chain, once you click the withdraw Button, you are withdrawing all your funds and we will seize to reward you
                        </p>
                        <div className="btns">
                            <button className='stakeBtn' onClick={withdrawStake}>Withdraw</button>
                            <button className='stakeBtn' onClick={processStake}>Stake</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Stake