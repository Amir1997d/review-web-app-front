import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';

const LoginPage = () => {

  const SERVER_URI = process.env.REACT_APP_SERVER_URI;
  const language = useContext(LanguageContext);

  function googleAuth() {
    window.open(`${SERVER_URI}/auth/google/callback`, "_self");
  }

  function githubAuth() {
    window.open(`${SERVER_URI}/auth/github/callback`, "_self");
  }

  return (
    <div className='w-screen min-h-full dark:bg-slate-800 flex items-center justify-center'>
      <div className='w-80 h-96 p-10 m-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col justify-evenly items-center rounded-lg'>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-xl my-2 font-bold text-black text-center dark:text-white'>{language === 'en' ? en.sign : ru.sign} </h2>
          <p className='text-red-700 font-bold text-4xl'>Reviewer</p>
        </div>
        <div>
          <button onClick={googleAuth} className='w-28 h-10 bg-white rounded flex items-center justify-center m-2 p-2 hover:bg-red-500 text-red-500 hover:text-white'>
            <i className="fa-brands fa-google"></i>
            <span className='ml-2'>Google</span>
          </button>
          <button onClick={githubAuth} className='w-28 h-10 bg-white rounded flex items-center justify-center m-2 p-2 hover:bg-black text-black hover:text-white'>
            <i className="fa-brands fa-github"></i>
            <span className='ml-2'>GitHub</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;