import React from 'react'

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>View Page</th>
              <th>User Status</th>
              <th>Delete User</th>
              <th>User Role</th>
            </tr>
          </thead>
          {/* <tbody>
            {users.map(user => <UsersTableItem key={user.id} user={user} />)}
          </tbody> */}
        </table>
      </div> 
    </div>
  )
}

export default AdminPage;