import React from 'react'
import Header from '../layout/home/Header'
import "../../assests/home.css"
import Works from '../layout/home/Works'
import Benefits from '../layout/home/Benefits'
import Faqs from '../layout/home/Faqs'
import Contact from '../layout/home/Contact'
function Home() {
  return (
    <div className='home'>
        <Header/>
        <Works/>
        <Benefits/>
        <Faqs/>
        <Contact/>
    </div>
  )
}

export default Home