import React from 'react';

const TopReviews = () => {
  return (
    <div className='w-full m-2'>
        <h1 className='mb-2 dark:text-white'>Top Reviews</h1>
        <div className='w-full min-h-full p-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded'>
        {/* {topReviews.map(review  => {
            return (
                <div>
                    <p>{review.name}</p>
                    <p><i className="fa-solid fa-star text-slate-500"></i> {reviewRating}<span> out of 5</span></p>
                    <button>Read</button>
                </div>
            )
        })} */}
            <div className='p-4 m-1 bg-white rounded dark:bg-slate-400 dark:text-white flex justify-between items-center'>
                <div>
                    <p className='font-bold text-lg'>Should we watch Batman 2023?</p>
                    <p>avg rating: <i className="fa-solid fa-star text-yellow-400"></i> 4<span> out of 5</span></p>
                </div>
                <button className='w-24 mt-2 p-1 text-sm text-white bg-blue-600 hover:bg-white hover:text-blue-600 border-solid border-2 border-blue-600 rounded'>Read</button>
            </div>
        </div>
    </div>
  )
}

export default TopReviews;