import React from 'react';
import notFound from '../images/404.png';

const PageNotFound = () => {
  return (
    <div className='w-screen h-screen dark:bg-slate-400 flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-3xl text-slate-700'>Page Not Found!</h1>
            <img src={notFound} alt="not found" width="400px" />
        </div>
    </div>
  )
}

export default PageNotFound;