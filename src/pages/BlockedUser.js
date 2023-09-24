import React from 'react';

const BlockedUser = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center dark:bg-slate-700">
    	<i className="fa-solid fa-user-lock m-2 text-3xl text-slate-700 dark:text-white"></i>
        <h1 className="font-bold text-2xl text-slate-700 dark:text-white">You Are Blocked!</h1>
    </div>
  )
}

export default BlockedUser;