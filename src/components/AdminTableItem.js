import React from 'react';

const AdminTableItem = ({ user }) => {
  return (
    <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td><button className='w-20 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm'>View</button></td>
      <td><button className='w-20 h-7 bg-red-700 text-white rounded hover:bg-red-900 text-sm'>{user.isBlocked ? "unblock" : "block"}</button></td>
      <td><button className='w-24 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm'>{user.isAdmin ? "admin" : "non-admin"}</button></td>
      <td><button className='text-black rounded hover:text-red-600'><i className="fa-solid fa-trash"></i></button></td>
    </tr>
  )
}

export default AdminTableItem;