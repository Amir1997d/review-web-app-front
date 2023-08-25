import React from 'react';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <div className='w-screen h-20 flex items-center justify-between bg-yellow-400'>
      <div className='p-2 ml-5 cursor-pointer'>
        <img src={logo} alt='logo' width="100px" title="Reviwer"/>
      </div>
      <form>
        <input type="text" placeholder='Search...' className='pl-3 rounded-md h-8 w-80 focus:outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1'/>
        <button type='submit' title="search" className='ml-1 bg-red-500 w-8 h-8 hover:bg-black border-re rounded-lg'><i className="fa-solid fa-magnifying-glass text-white"></i></button>
      </form>
      <div className='btn-div'>
        <button title="dark/light"><i class="fa-solid fa-circle-half-stroke text-red-500 mr-5 hover:text-black"></i></button>
        <select className='mr-5 rounded bg-red-500 text-white'>
          <option>EN</option>
          <option>RU</option>
        </select>
        <button title="Sign up"><i className="fa-solid fa-right-to-bracket text-red-500 mr-5 hover:text-black"></i></button>
        <button title="Profile"><i className="fa-solid fa-user text-red-500 mr-5 hover:text-black"></i></button>
        <button title="Home"><i className="fa-solid fa-house text-red-500 mr-5 hover:text-black"></i></button>
        
      </div>
    </div>
  )
}

export default Header;