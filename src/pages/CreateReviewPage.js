import React, { useState } from 'react';

const CreateReviewPage = () => {

  const [review, setReview] = useState({
    id: null,
    name: '',
    reviewedItemName: '',
    group: '',
    text: '',
    imgUrl: '',
    grade: ''
  });

  const [rate, setRate] = useState(5);

  function handleChange() {

  }

  return (
    <div className='w-screen min-h-screen dark:bg-slate-800 dark:text-white flex flex-col justify-start items-center'>
        <h1 className='m-10 font-bold text-xl'>Create Review</h1>
        <form className='w-1/2 min-h-full mb-10 p-10 rounded-lg flex flex-col bg-gradient-to-r from-violet-500 to-fuchsia-500'>
            <lable className='ml-2'>Review Name:</lable>
            <input className='m-2 p-2 rounded dark:bg-slate-300 dark:text-black' type="text" />

            <lable className='ml-2 mt-4'>Name of What you are going to review:</lable>
            <input className='m-2 p-2 rounded dark:bg-slate-300 dark:text-black' type="text" />

            <lable className='ml-2 mt-4'>Review Name:</lable>
            <input className='m-2 p-2 rounded dark:bg-slate-300 dark:text-black' type="text" />

            <lable className='ml-2 mt-4'>Group:</lable>
            <select className='m-2 p-2 rounded dark:bg-slate-300 dark:text-black' onChange={handleChange}>
                <option value='Movie' selected='selected'>Movie</option>
                <option value='TV Show'>TV Show</option>
                <option value='Book'>Book</option>
                <option value='Game'>Game</option>
                <option value='Device'>Device</option>
                <option value='Car'>Car</option>
            </select>

            <label className='ml-2 mt-4'>Tags:</label>
            <input className='m-2 p-2 rounded dark:bg-slate-300 dark:text-black' type="text" />

            <label className='ml-2 mt-4'>Your Review:</label>
            <textarea className='h-64 m-2 p-2 rounded dark:bg-slate-300 dark:text-black'></textarea>

            <label className='ml-2 mt-8' for="image-review">Image(optional):</label>
            <input className='m-2' type="file" id="image-review" name="image-review"></input>

            <label className='ml-2 mt-8'>Your Rate To This Item:(0 to 10):<span className='ml-5'>{rate}</span></label>
            <input className='m-2 accent-yellow-500' type="range" min={0} max={10} step={0.5} value={rate} onChange={(e) => setRate(e.target.value)}/>
            
            
            <button type="button" className='h-10 mt-12 rounded text-white bg-red-600 hover:bg-yellow-500 hover:text-white'>Create</button>
        </form>
    </div>
  )
}

export default CreateReviewPage;