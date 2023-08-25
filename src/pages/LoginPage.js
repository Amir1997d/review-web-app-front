import React from 'react'

const LoginPage = () => {
  return (
    <div className='w-screen h-96 dark:bg-slate-800'>
      <div className='login-box'>
        <div>
          <h2>Sign up for Reviewly</h2>
        </div>
        <div className='log-provider-box'>
          <div>
            <i className="fa-brands fa-google text-red-500"></i>
            <span className='text-red-600'>Google</span>
          </div>
          <div>
            <i className="fa-brands fa-square-facebook text-blue-600"></i>
            <span className='text-blue-600'>Facebook</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;