import React from 'react'

function Faqs() {
  return (
    <section className='faqs' id='faqs'>
        <h1>FAQs</h1>
    <div className="row">
            <div className="box">
                <h2>
                  <div className="count">
                    1
                  </div>
                  How do I pay with fiat currency?</h2>
                <p>We accept a wide range of fiat currencies. Simply select your preferred currency during checkout.</p>
            </div>
            <div className="box">
                <h2>
                <div className="count">
                    2
                  </div>
                  Is my personal information safe?</h2>
                <p>Yes, we take your privacy seriously. All personal information is encrypted and stored securely.</p>
            </div>
            <div className="box">
                <h2>
                <div className="count">
                    3
                  </div>
                  What happens after I submit my address?</h2>
                <p>Once you've submitted your address, we pile up the requests for 1 minute before sending them to the contract.</p>
            </div>
            <div className="box">
                <h2>
                <div className="count">
                    4
                  </div>
                  How long does it take to receive the gas fees?</h2>
                <p>Once the address requests are sent to the contract, the gas fees are usually received within a few minutes.</p>
            </div>
    </div>
</section>
  )
}

export default Faqs