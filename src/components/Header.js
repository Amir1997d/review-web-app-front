import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../images/logo.png';

const Header = ({user}) => {
  
  function logout() {
    window.open("http://localhost:5000/auth/logout", "_self");
  }

  function themeHandler() {
    const htmlElement = document.querySelector('html');
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
    }
  }

  return (
    <div className='w-screen h-20 flex items-center justify-between bg-yellow-400 dark:bg-slate-500'>
      <div className='p-2 ml-5 cursor-pointer'>
        <Link to="/">
          <img src={logo} alt='logo' width="100px" title="Reviwer"/>
        </Link>
      </div>
      <form>
        <input type="text" placeholder='Search...' className='pl-3 rounded-md h-8 w-80 focus:outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1'/>
        <button type='submit' title="search" className='ml-1 bg-red-500 w-8 h-8 hover:bg-black border-re rounded-lg'><i className="fa-solid fa-magnifying-glass text-white"></i></button>
      </form>
      <div className='btn-div'>
        {user ? <span>{user.displayName}</span> : <></> }
        <button title="dark/light" id="theme-btn" onClick={themeHandler}><i className="fa-solid fa-circle-half-stroke text-red-500 mr-5 hover:text-black"></i></button>
        <select className='mr-5 rounded bg-red-500 text-white'>
          <option>EN</option>
          <option>RU</option>
        </select>
        {user ? <></> : <button title="Log in"><Link to="/login"><i className="fa-solid fa-right-to-bracket text-red-500 mr-5 hover:text-black"></i></Link></button>}
        {user ? <button title="Log out" onClick={logout}><i className="fa-solid fa-right-from-bracket text-red-500 mr-5 hover:text-black"></i></button> : <></>}
        {user ? <button title="User Page"><Link to="/user-page"><i className="fa-solid fa-user text-red-500 mr-5 hover:text-black"></i></Link></button> : <></> }
        <button title="Home"><Link to="/"><i className="fa-solid fa-house text-red-500 mr-5 hover:text-black"></i></Link></button>
      </div>
    </div>
  )
}

export default Header;