import React, { useEffect, useState } from 'react';
import AdminTableItem from '../components/AdminTableItem';


const AdminPage = () => {
  
  const SERVER_URI = process.env.REACT_APP_SERVER_URI;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URI}/api/users`)
    .then(res => res.json())
    .then(data => {
      setUsers(data)
    })
    .catch(err => console.log(err))
  }, []);

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
          {users.map(user => <AdminTableItem key={user.id} user={user} />)}
        </tbody>
      </table>
    </div> 
  )
}

export default AdminPage;