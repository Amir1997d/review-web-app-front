import React from 'react'

const LoginPage = () => {

  function googleAuth() {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  }

  function githubAuth() {
    window.open("http://localhost:5000/auth/github/callback", "_self");
  }

  return (
    <div className='w-screen h-5/6 dark:bg-slate-800 flex items-center justify-center'>
      <div className='w-80 h-1/2 m-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col justify-evenly items-center rounded-lg'>
        <div>
          <h2 className='text-2xl font-bold text-black dark:text-white'>Sign up for <span className='text-red-700 font-bold'>Reviewly</span></h2>
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