import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";
function Footer() {
  const location = useLocation();
  const [dashboard, setDashboard] = useState(false)
  const { pathname } = location;
  useEffect(() => {
    setDashboard(!pathname.includes("user"))
  }, [pathname])
  return (
    <>
      {
        dashboard &&
        <footer>
          <p>Copyright &copy;2023 by Nuel</p>
          <ul className="links">
            <li>
              <a href="https://twitter.com/nuelyoungtech" target='_blank'><FaXTwitter className='icon' /></a>
            </li>
            <li>
              <a href="https://github.com/nuex001" target='_blank'><FaGithub className='icon' /></a>
            </li>
            <li>
              <a href="#" target='_blank'><SiGitbook className='icon' /></a>
            </li>
          </ul>
        </footer>
      }
    </>
  )
}

export default Footer