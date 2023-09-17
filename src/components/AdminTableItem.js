import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminTableItem = ({ user, users, setUsers }) => {

  const SERVER_URI = process.env.REACT_APP_SERVER_URI;
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(user.isBlocked ? "unblock" : "block");
  const [userRole, setUserRole] = useState(user.isAdmin ? "admin" : "non-admin");

  function deleteHandler(id) {
    const sure = window.confirm("Are you sure you want to remove this user?");
    if(sure) {
      fetch(`${SERVER_URI}/api/users/delete-user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id
        })
      })
      const filteredUsers = users.filter(user => user.id !== id);
      setUsers(filteredUsers);
    }
  }

  function changeStatusHandler(id) {
    fetch(`${SERVER_URI}/api/users/user-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        isBlocked: !user.isBlocked
      })
    })
    // setUserStatus(isBlocked ? "unblock" : "block")
  }

  function roleHandler(id) {
    fetch(`${SERVER_URI}/api/users/user-role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        isAdmin: !user.isAdmin 
      })
    })
    .then(res => res.json())
    .then((data) => setUserRole(data.role ? "admin" : "non-admin"))
    .catch(err => console.log(err));
  }

  function viewHandler(userId) {
    navigate(`/user-page/?type=userid&name=${userId}`);
  }

  return (
    <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>
        <button 
          className='w-20 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm' 
          onClick={()=>viewHandler(user.id)}
        >
          View
        </button>
      </td>
      <td>
        <button 
          className='w-20 h-7 bg-red-700 text-white rounded hover:bg-red-900 text-sm'
          onClick={() => changeStatusHandler(user.id)}
        >
          {userStatus}
        </button>
      </td>
      <td>
        <button 
          className='w-24 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm' 
          onClick={() => roleHandler(user.id)}
        >
          {userRole}
        </button>
      </td>
      <td>
        <button className='text-black rounded hover:text-red-600' onClick={() => deleteHandler(user.id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

export default AdminTableItem;