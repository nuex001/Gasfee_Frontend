import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header id='home'>
            <div className="text">
                <h1>Gas Fee Payment Made Easy</h1>
                <p>
                    At GasFee.com, we offer a seamless way to pay for gas fees using fiat currency. Simply submit your address and let us handle the rest. Watch as your address requests pile up in just 1 minute, and we automatically send them to the contract as if you were buying gas fees.
                </p>
                <Link to="#">Get started</Link>
            </div>
            <div className="scene">
                <div className="cube">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face right"></div>
                    <div className="face left"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                </div>
            </div>


        </header>
    )
}

export default Header