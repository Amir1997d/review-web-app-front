import React, { useState } from 'react'


const AdminPage = () => {
  // isEnglish = redux state
  return (
    <div className='w-screen min-h-screen dark:bg-slate-800 dark:text-slate-200 m-0 p-10'>
      <table className='w-full border-collapse bg-yellow-100 dark:bg-red-200'>
        <caption className='mb-5 font-bold text-xl'>Users</caption>
        <thead>
          <tr>
            <th className='p-3 bg-yellow-400 dark:bg-red-500'>Id</th>
            <th className='p-3 bg-yellow-400 dark:bg-red-500'>Username</th>
            <th className='p-3 bg-yellow-400 dark:bg-red-500'>View Page</th>
            <th className='p-3 bg-yellow-400 dark:bg-red-500'>Block/Unblock User</th>
            <th className='p-3 bg-yellow-400 dark:bg-red-500'>User Role</th>
            <th className='p-3 bg-yellow-400 dark:bg-red-500'>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map(user => <AdminTableItem key={user.id} user={user} />)} */}
          <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
            <td>1</td>
            <td>234r3r</td>
            <td><button className='w-20 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm'>View</button></td>
            <td><button className='w-20 h-7 bg-red-700 text-white rounded hover:bg-red-900 text-sm'>Block</button></td>
            <td><button className='w-24 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm'>non-admin</button></td>
            <td><button className='text-black rounded hover:text-red-600' title="Delte User"><i className="fa-solid fa-trash"></i></button></td>
          </tr>
          <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
            <td>1</td>
            <td>234r3r</td>
            <td><button className='w-20 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm'>View</button></td>
            <td><button className='w-20 h-7 bg-red-700 text-white rounded hover:bg-red-900 text-sm'>Block</button></td>
            <td><button className='w-24 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm'>non-admin</button></td>
            <td><button className='text-black rounded hover:text-red-600'><i className="fa-solid fa-trash"></i></button></td>
          </tr>
          <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
            <td>1</td>
            <td>234r3r</td>
            <td><button className='w-20 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm'>View</button></td>
            <td><button className='w-20 h-7 bg-red-700 text-white rounded hover:bg-red-900 text-sm'>Block</button></td>
            <td><button className='w-24 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm'>non-admin</button></td>
            <td><button className='text-black rounded hover:text-red-600'><i className="fa-solid fa-trash"></i></button></td>
          </tr>
          <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
            <td>1</td>
            <td>234r3r</td>
            <td><button className='w-20 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm'>View</button></td>
            <td><button className='w-20 h-7 bg-red-700 text-white rounded hover:bg-red-900 text-sm'>Block</button></td>
            <td><button className='w-24 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm'>non-admin</button></td>
            <td><button className='text-black rounded hover:text-red-600' title="Delete"><i className="fa-solid fa-trash"></i></button></td>
          </tr>
        </tbody>
      </table>
    </div> 
  )
}

export default AdminPage;