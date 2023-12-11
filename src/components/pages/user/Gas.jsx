import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import Select from 'react-select';
import "../../../assests/gas.css";
import { selectStyle, successMsg, errorMsgs } from '../../utils/utils';
import axios from "axios"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Gas() {
  const amountRef = useRef();
  const userCountRef = useRef();
  const feeRef = useRef();
  const feeRef1 = useRef();
  const countMin = useRef();
  const countSec = useRef();
  const socket = io("https://gasfee-backend.onrender.com"); // Replace with your server URL

  const options = [
    { value: 'eth', label: 'Etherum' },
    { value: 'matic', label: 'Polygon' },
  ];
  const [formdata, setFormdata] = useState({
    amount: 0,
    address: "",
    chain: "",
  })
  const [stage2, setStage2] = useState(false);
  const [txproccessing, setTxproccessing] = useState(false);
  const { amount, address, chain } = formdata;

  const getandInputMax = () => {
    // amountRef.current.value=100;
    setFormdata({ ...formdata, amount: 5 });
    if (chain.trim() !== "" && address.trim() !== "") {
      const amount = 5;
      socket.emit('checkFee', { chain, address, amount });
    }
  }

  const updateVal = async (e) => {
    // amountRef.current.value=100;
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    if (e.target.value > 0 && chain.trim() !== "" && address.trim() !== "") {
      if (e.target.name === "address") {
        const address = e.target.value;
        socket.emit('checkFee', { chain, address, amount });
      } else {
        const amount = e.target.value;
        socket.emit('checkFee', { chain, address, amount });
      }
    }
  }

  const setSelectedOption = async (e) => {
    // amountRef.current.value=100;
    setFormdata({ ...formdata, chain: e.value });
    if (amount > 0 && e.value !== "" && address.trim() !== "") {
      const chain = e.value;
      const token = localStorage.getItem("token");
      socket.emit('checkFee', { chain, address, amount });
    }
  }

  const joinTransaction = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (chain.trim() !== "" && address.trim() !== "" && amount > 0) {
      socket.emit('joinTransaction', { chain, address, amount, token });
    }
  };


  /**@LISTENERS */
  socket.on('transaction Successfull', (data) => {
    console.log('transaction Successfull:', data);
    setStage2(false);
    setTxproccessing(false);
    successMsg("Transaction Made Successfully");
    setFormdata({
      amount: 0,
      address: "",
      chain: "",
    });
  });

  socket.on('feechecked', (data) => {
    // Handle the fetch transaction join response
    console.log('feechecked Response:', data);
    const roundedFee = Math.ceil(data?.fee * 10000) / 10000;
    // console.log(feeRef);
    feeRef.current.innerHTML = `$${roundedFee}`;
  });

  // Event listener for transaction update
  socket.on('transactionUpdate', (data) => {
    // Handle the transaction join response
    console.log('transactionUpdate Join Response:', data);
    const timeParts = data?.timeRemaining.split(':');
    const roundedFee = Math.ceil(data?.fee * 10000) / 10000;
    const userCount = data?.numUsers;
    setStage2(true);
    userCountRef.current.innerHTML = userCount;
    feeRef1.current.innerHTML = `$${roundedFee}`;
    countMin.current.innerHTML = timeParts[0];
    countSec.current.innerHTML = timeParts[1];
  });
  // Event listener for transaction end
  socket.on('transactionEnd', (data) => {
    // Handle the transaction join response
    console.log('transactionEnd Response:', data);
    setStage2(false);
    setTxproccessing(true);
  });
  // Event listener for optOut
  socket.on('optOut', (data) => {
    // Handle the transaction join response
    console.log('optOut:', data);
    setStage2(false);
    userCountRef.current.innerHTML = 0;
    feeRef.current.innerHTML = 0;
    countMin.current.innerHTML = 0;
    countSec.current.innerHTML = 0;
  });
  socket.on('authenticationError', (data) => {
    // Handle the transaction join response
    console.log('authenticationError:', data);
    setStage2(false);
    setTxproccessing(false);
    errorMsgs(data.msg);
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    return () => {
      socket.off('joinTransaction');
      socket.off('transactionUpdate');
      socket.off('checkFee');
      // socket.disconnect();
    };
  }, []); // Empty dependency array to ensure this effect runs once

  const opoutOfTransaction = () => {
    const token = localStorage.getItem("token");
    socket.emit('optOut', { chain, token });
    setStage2(false);
  }

  return (
    <section className='gas'>
      <ToastContainer />
      <div className="child">
        <h1>GAS FEE</h1>
        <form action="" onSubmit={joinTransaction} className={stage2 || txproccessing ? "close" : "open"}>
          <div className="row">
            <div className="box">
              <input type="number"
                onKeyUp={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value > 5) {
                    e.target.value = '20';
                  } else if (value < 0) {
                    e.target.value = '0';
                  }
                }}
                name='amount'
                ref={amountRef}
                value={amount}
                onChange={updateVal}
              /> <span onClick={getandInputMax}>MAX</span>
            </div>
          </div>
          <div className="row">
            <div className="box">
              <input type="address" name='address' value={address} onChange={updateVal} placeholder='0X.....1' />
            </div>
          </div>
          <div className="row">
            <Select
              onChange={setSelectedOption}
              options={options}
              styles={selectStyle}
              className='selectInput'
            />
          </div>
          <h3>Fee: <span ref={feeRef}>$0</span></h3>
          <p ><span>NOTE:</span>
            The price may varry depending on how many request going on and you can opt out before the end of the transaction timer.
              <br/>
              And pease i don't have much matic,just a lil below 1$ is good.
          </p>
          <button>Submit</button>
        </form>
        <div className={stage2 ? "pendingBox open" : "pendingBox"}>
          <div className='infoCont'>
            <h2>Users:<span className='users' ref={userCountRef}>30 </span></h2>
            <h2>Fee:<span className='fee' ref={feeRef1}>$200</span></h2>
          </div>
          <div className="count">
            <div className="box" ref={countMin}>0</div>
            <h3>:</h3>
            <div className="box" ref={countSec}>0</div>
            {/* <div className="box">1</div> */}
          </div>
          <button onClick={opoutOfTransaction}>Opt out</button>
        </div>
        <div className={txproccessing ? "processBox open" : "processBox"}>
          <div className="loader"></div>
          <h2>Transaction proccessing</h2>
          <h2><span>PS:</span> Don't move out or close window</h2>
        </div>
      </div>
    </section>
  )
}

export default Gas