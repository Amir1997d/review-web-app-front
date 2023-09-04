import React, { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';
import myimage from '../images/bookimg.jpeg';
const ReviewPage = () => {

    const [review, setReview] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/api/reviews/${4}`)
        .then(res => res.json())
        .then(data => setReview(data));
    },[]);

    return (
        <div className='flex justify-center items-start dark:bg-slate-700 dark:text-white'>
            <div className='w-full mx-24 my-10 rounded-lg'>
                <div>
                    <h1 className='font-bold text-2xl ml-5 mb-5'>{review.name}
                        <span className='ml-2'>
                            <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                            <span className='text-sm ml-1 text-slate-500 dark:text-slate-300'>4.6 out of 5</span>
                        </span>
                    </h1> 
                    <hr className=''/>
                    <div className='m-5'>
                        <h2 className='mb-2'><span className='font-bold mr-1'>Author:</span>Amir1997d<span className='ml-5'><i className="fa-solid fa-thumbs-up text-blue-600"></i> 3340</span></h2>
                        <h2 className='mb-2'><span className='font-bold mr-1'>Reviewed Item Name:</span>{review.reviewedItemName}</h2>
                        <h2 className='mb-2'><span className='font-bold mr-1'>Author rate:</span>{review.grade} out of 10</h2>
                        <h2><span className='font-bold mr-1'>Group:</span>{review.group}</h2>
                    </div>
                    <div className='m-5'>
                        <p>{review.text}</p>
                    </div>
                    <div className='m-5 text-blue-800 dark:text-blue-400'>
                        {/* {review.tags.map(tag => <p>#{tag.tag_name}</p>)} */}
                        #book #harry #potter #suggest
                    </div>
                    <div className='m-5'>
                        <img  src={myimage} alt="review" width="200px"/>
                    </div>
                </div>
                <hr />
                <div className='m-5 flex justify-between items-center'>
                    <div className='flex justify-between items-center'>
                        <span className='mr-4'>Your rate to this review: </span>
                        <div className='text-lg'>
                            <i className="fa-solid fa-star text-slate-400 hover:text-yellow-400"></i>
                            <i className="fa-solid fa-star text-slate-400 hover:text-yellow-400"></i>
                            <i className="fa-solid fa-star text-slate-400 hover:text-yellow-400"></i>
                            <i className="fa-solid fa-star text-slate-400 hover:text-yellow-400"></i>
                            <i className="fa-solid fa-star text-slate-400 hover:text-yellow-400"></i>
                        </div>
                        <button className='ml-4 bg-blue-500 w-20 p-1 rounded text-white text-sm hover:bg-blue-800'>Submit</button>
                    </div>
                    <div>
                        <span>Like this review: </span><i className="fa-regular fa-thumbs-up ml-1 text-xl text-blue-400  hover:text-blue-800"></i>
                    </div>
                </div>
                <hr />
                <form className='flex justify-between items-center'>
                    <input type="text" placeholder='Add a comment...' className='w-full my-4 mx-5 pl-4 rounded-md h-10 border-solid border-2 border-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 dark:text-black'/>
                    <button className='bg-yellow-400 w-20 p-2 rounded hover:bg-yellow-500'>post</button>
                </form>
                {/* <hr /> */}
                <h3 className='mx-5 font-bold text-lg'>Comments</h3>
                <div className='mx-5 my-5 flex flex-col justify-center items-start'>
                    {/* {comments.map(comment => <Comment key={comment.id} comment={comment}/>)} */}
                    <div className='mb-4'>
                        <div className='mb-4'>
                            <h3 className='text-xs font-bold'>maxim1996</h3>
                            <p>i love this book too!</p>
                            <button className='text-xs text-blue-500'>Reply</button>
                        </div>
                        <div className='ml-10'>
                            <h3 className='text-xs font-bold'>maxim1996</h3>
                            <p>me too!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewPage;