import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';

const Header = ({ currentUser, setLanguage }) => {
  
  const SERVER_URI = process.env.REACT_APP_SERVER_URI;
  
  const language = useContext(LanguageContext);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');

  function logout() {
    window.open(`${SERVER_URI}/auth/logout`, "_self");
    localStorage.removeItem("user");
  }

  function themeHandler() {
    const htmlElement = document.querySelector('html');
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
    }
  }

  function languageSelectorHandler(e) {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    if(currentUser) {
      fetch(`${SERVER_URI}/api/users/preferred-lang`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          preferredLanguage: newLanguage,
          userId: currentUser.id
        })
      }).then(()=>{
        let user = localStorage.getItem("user");
        user = JSON.parse(user)
        user.preferredLanguage = newLanguage;
        localStorage.setItem("user", JSON.stringify(user))
      })
    }
  }

  function openUserPage() {
    const htmlElement = document.querySelector('html');
    const hasDarkTheme = htmlElement.classList.contains('dark');
    navigate(`/user-page/?type=userid&name=${currentUser.id}`);
    navigate(0);
    if(hasDarkTheme) {
      htmlElement.classList.add('dark');
    }
  }

  function searchHandler(e) {
    e.preventDefault();
    if(searchInput!==""){
      navigate(`/search/?search-for=${searchInput}`);
      setSearchInput("");
      navigate(0);
    }

  }

  return (
    <div className='w-screen h-20 flex items-center justify-between bg-yellow-400 dark:bg-slate-500'>
      {/* logo */}
      <div className='p-2 ml-5 cursor-pointer hidden md:block sm:hidden'>
        <Link to="/">
          <img src={logo} alt='logo' width="100px" title="Reviwer"/>
        </Link>
      </div>



      {/* username */}
      <div>
        {currentUser ? <span className='mr-8 text-red-600 dark:text-white hidden md:block sm:hidden'>{currentUser.username.split(' ')[0]}</span> : <></> }
      </div>

      {/* search bar */}
      <form>
        <input 
          type="text" 
          placeholder={language === 'en' ? en.search : ru.search} 
          className='pl-3 rounded-md h-8 md:w-80 sm:w-70 focus:outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1'
          value={searchInput}
          onChange={(e)=>setSearchInput(e.target.value)}
        />
        <button 
          type='submit' 
          onClick={(e)=>searchHandler(e)} 
          title="search" 
          className='ml-1 bg-red-500 w-8 h-8 hover:bg-black border-re rounded-lg'
        >
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
      </form>

      {/* rightside controllers and buttons */}
      <div className='sm: hidden'>
        { currentUser  
          ? <button title="admin page" id="theme-btn">
            <Link to="/admin">
              <i className="fa-solid fa-user-gear text-red-500 mr-5 hover:text-black"></i>
            </Link>
          </button> 
          : <></> }
        <button title="dark/light" id="theme-btn" onClick={themeHandler}><i className="fa-solid fa-circle-half-stroke text-red-500 mr-5 hover:text-black"></i></button>
        <select
          className='mr-5 rounded bg-red-500 text-white'
          value={language}
          onChange={(e) => languageSelectorHandler(e)}
          title="language"
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>
        {currentUser ? <></> : <button title="Log in"><Link to="/login"><i className="fa-solid fa-right-to-bracket text-red-500 mr-5 hover:text-black"></i></Link></button>}
        {currentUser ? <button title="Log out" onClick={logout}><i className="fa-solid fa-right-from-bracket text-red-500 mr-5 hover:text-black"></i></button> : <></>}
        {currentUser ? <button title="User Page" onClick={openUserPage}><i className="fa-solid fa-user text-red-500 mr-5 hover:text-black"></i></button> : <></> }
        <button title="Home"><Link to="/"><i className="fa-solid fa-house text-red-500 mr-5 hover:text-black"></i></Link></button>
      </div>
      {/* bottom buttons section for small screen width */}
      <div className='btn-div sm: sticky bottom-0'>
        { currentUser && currentUser.isAdmin 
          ? <button title="admin page" id="theme-btn">
            <Link to="/admin">
              <i className="fa-solid fa-user-gear text-red-500 mr-5 hover:text-black"></i>
            </Link>
          </button> 
          : <></> }
        <button title="dark/light" id="theme-btn" onClick={themeHandler}><i className="fa-solid fa-circle-half-stroke text-red-500 mr-5 hover:text-black"></i></button>
        <select
          className='mr-5 rounded bg-red-500 text-white'
          value={language}
          onChange={(e) => languageSelectorHandler(e)}
          title="language"
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>
        {currentUser ? <></> : <button title="Log in"><Link to="/login"><i className="fa-solid fa-right-to-bracket text-red-500 mr-5 hover:text-black"></i></Link></button>}
        {currentUser ? <button title="Log out" onClick={logout}><i className="fa-solid fa-right-from-bracket text-red-500 mr-5 hover:text-black"></i></button> : <></>}
        {currentUser ? <button title="User Page" onClick={openUserPage}><i className="fa-solid fa-user text-red-500 mr-5 hover:text-black"></i></button> : <></> }
        <button title="Home"><Link to="/"><i className="fa-solid fa-house text-red-500 mr-5 hover:text-black"></i></Link></button>
      </div>
    </div>
  )
}

export default Header;