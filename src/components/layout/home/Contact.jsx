import React from 'react'

function Contact() {
  return (
    <section className='contact' id='contact'>
        <h1>Contact Us</h1>
        <p>Have a question or need assistance? Contact our friendly support team and we'll be happy to help you.</p>
        <ul className="links">
            <li>
                <span>Email</span>
                support@gasfee.com
            </li>
            <li>
                <span>Phone</span>
                +1 (123) 456-7890
            </li>
            <li>
                <span>Address</span>
                123 Gasfee Street, Cityville, USA
            </li>
        </ul>
    </section>
  )
}

export default Contact