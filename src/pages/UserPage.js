import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const UserPage = () => {
  
  return (
    <div className='w-screen min-h-screen dark:bg-slate-800 dark:text-slate-200 m-0 p-10 flex flex-col justify-start items-center'>
        <h1 className='mb-5 font-bold text-xl'>My Reviews</h1>
        <div className='w-full h-14 mb-4 flex justify-between items-center'>
            <div>
                <label>filter by added date:</label>
                <select className='ml-2 mr-10 p-1 rounded bg-yellow-400 dark:bg-red-500'>
                    <option>today</option>
                    <option>this week</option>
                    <option>this month</option>
                    <option>this year</option>
                    <option selected="selected">life time</option>
                </select>
                <label>sorted by:</label>
                <select className='ml-2 p-1 rounded bg-yellow-400 dark:bg-red-500'>
                    <option selected="selected">id</option>
                    <option>name</option>
                    <option>added date</option>
                </select>
            </div>
            <button className='py-2 px-4 bg-green-600 hover:bg-green-800 text-white rounded'><Link to="/create-review">Create a Review</Link></button>
        </div>
        <table className='w-full border-collapse bg-yellow-100 dark:bg-red-200'>
            <thead>
                <tr>
                    <th className='p-3 bg-yellow-400 dark:bg-red-500'>Id</th>
                    <th className='p-3 bg-yellow-400 dark:bg-red-500'>Review Name</th>
                    <th className='p-3 bg-yellow-400 dark:bg-red-500'>Delete Review</th>
                    <th className='p-3 bg-yellow-400 dark:bg-red-500'>Edit Review</th>
                    <th className='p-3 bg-yellow-400 dark:bg-red-500'>Open in Read Mode</th>
                    <th className='p-3 bg-yellow-400 dark:bg-red-500'>Likes</th>
                    <th className='p-3 bg-yellow-400 dark:bg-red-500'>Avg Rating</th>
                </tr>
            </thead>
            <tbody>
                {/* {users.map(user => <UserTableItem key={user.id} user={user} />)} */}
                <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
                    <td>1</td>
                    <td>sjkvbkrvbsvbjetvb</td>
                    <td><button className='text-black rounded hover:text-red-600' title="Delte Review"><i className="fa-solid fa-trash"></i></button></td>
                    <td><button className='w-20 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm'>Edit</button></td>
                    <td><button className='w-24 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm'>Read Mode</button></td>
                    <td>1234</td>
                    <td><i className="fa-solid fa-star text-yellow-400"></i>4.6</td>
                </tr>
                <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
                    <td>1</td>
                    <td>sjkvbkrvbsvbjetvb</td>
                    <td><button className='text-black rounded hover:text-red-600' title="Delte User"><i className="fa-solid fa-trash"></i></button></td>
                    <td><button className='w-20 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm'>Edit</button></td>
                    <td><button className='w-24 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm'>Read Mode</button></td>
                    <td>1234</td>
                    <td><i className="fa-solid fa-star text-yellow-400"></i>4.6</td>
                </tr>
                <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
                    <td>1</td>
                    <td>sjkvbkrvbsvbjetvb</td>
                    <td><button className='text-black rounded hover:text-red-600' title="Delte User"><i className="fa-solid fa-trash"></i></button></td>
                    <td><button className='w-20 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm'>Edit</button></td>
                    <td><button className='w-24 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm'>Read Mode</button></td>
                    <td>1234</td>
                    <td><i className="fa-solid fa-star text-yellow-400"></i>4.6</td>
                </tr>
            </tbody>
        </table>
    </div> 
  )
}

export default UserPage;