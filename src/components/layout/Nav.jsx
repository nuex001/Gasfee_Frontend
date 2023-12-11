import { useEffect, useRef, useState } from 'react'
import { TfiWorld } from "react-icons/tfi";
import { HiMenuAlt1 } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
function Nav() {
  const contRef = useRef();
  const menuRef = useRef();
  const location = useLocation();
  const [dashboard, setDashboard] = useState(false)
  const toggleCont = () => {
    contRef.current.classList.toggle("active");
  }
  const togglemenu = () => {
    menuRef.current.classList.toggle("active");
  }
  function handleLangSelect(event) {
    event.preventDefault();
    const selectedLang = event.currentTarget.getAttribute('data-lang');
    const selectElement = document.querySelector('.goog-te-combo'); // This selects the Google Translate widget on your page. The .goog-te-combo class is added by the Google Translate script to the select element it creates.
    selectElement.value = selectedLang;

    selectElement.dispatchEvent(new Event('change'));
    contRef.current.classList.remove("active");
  }
  const { pathname } = location;
  useEffect(() => {
    setDashboard(!pathname.includes("user"))
  }, [pathname])
  return (
    <>
      {
        dashboard &&
        <nav>
          <a a href="/" className='logo' > GassFee</a >
          <ul ref={menuRef}>
            <li onClick={togglemenu}><a href="/#home">Home</a></li>
            <li onClick={togglemenu}><a href="/#about">About us</a></li>
            <li onClick={togglemenu}><a href="/#faqs">FAQs</a></li>
            <li onClick={togglemenu}><a href="/#contact">Contact</a></li>
            <li onClick={togglemenu}><a href="/stake">Stake</a></li>
            {
              localStorage.token?
              <li onClick={togglemenu}><Link to="/user/">Dashboard</Link></li>
              :
              <li onClick={togglemenu}><Link to="/signin">Sign In</Link></li>
            }
            <li onClick={toggleCont}>
              <TfiWorld className='icon' /> <span>Languages</span>
            </li>
            <div id="google_translate_element" style={{ opacity: "0", position: "absolute", zIndex: "-1" }} />
            <div className='cont' ref={contRef}>
              <li data-lang="en" onClick={handleLangSelect}>English</li>
              <li data-lang="es" onClick={handleLangSelect}>Spanish</li>
              <li data-lang="zh-CN" onClick={handleLangSelect}>Chinese</li>
              <li data-lang="hi" onClick={handleLangSelect}>Hindi</li>
              <li data-lang="fr" onClick={handleLangSelect}>French</li>
            </div>
          </ul>
          <HiMenuAlt1 className='menu' onClick={togglemenu} />
        </nav >
      }
    </>

  )
}

export default Nav