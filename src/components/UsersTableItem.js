import React from 'react'

const UsersTableItem = ({ user }) => {
  return (
    <tr>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td><button>View</button></td>
        <td><button>{user.user_status}</button></td>
        <td><button>Delete</button></td>
        <td><button>{user.role}</button></td>
    </tr>
  )
}

export default UsersTableItem;