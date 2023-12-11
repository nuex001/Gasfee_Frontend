import React from 'react'

function Works() {
  return (
    <section className='works' id='about'>
        <div className="row">
            <h1>How It Works</h1>
            <div className="child">
                <div className="box">
                    <h2>Paying with Fiat</h2>
                    <p>Forget complicated crypto transactions. We accept traditional fiat currency for your convenience.</p>
                </div>
                <div className="box">
                    <h2>Submitting Address</h2>
                    <p>Share your address with us securely. We use industry-standard encryption to protect your data.</p>
                </div>
                <div className="box">
                    <h2>Piling Up Address Requests</h2>
                    <p>See the counter go up as we pile up your address requests within just 1 minute.</p>
                </div>
                <div className="box">
                    <h2>Sending Requests to Contract</h2>
                    <p>Once your address requests are piled up, we automatically send them to the contract for hassle-free gas fee purchase.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Works