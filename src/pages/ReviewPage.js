import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import Comment from '../components/Comment';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';
import io from 'socket.io-client';
import { tagOnClickHandler } from '../helpers/tagHelpers';
import MDEditor from '@uiw/react-md-editor';

const ReviewPage = ({ currentUser }) => {

    const SERVER_URI = process.env.REACT_APP_SERVER_URI;
    const SOCKET_IO_URI = process.env.REACT_APP_SOCKET_IO_URI;
    
    const navigate = useNavigate();
    const language = useContext(LanguageContext);
    const [review, setReview] = useState({});
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [queryParameters] = useSearchParams()
    const [isLiked, setIsLiked] = useState(false);
    const [sumOfLikes, setSumOfLikes] = useState(0);
    const [reviewAvgRate, setReviewAvgRate] = useState(0);
    const reviewId = queryParameters.get("name");
    
    const socket = io(SOCKET_IO_URI, {
        transports: ["websocket", "polling"]
    });

    useEffect(() => {
        const urls = [
            `${SERVER_URI}/api/reviews/${reviewId}`, 
            `${SERVER_URI}/api/comments/${reviewId}`,
            `${SERVER_URI}/api/likes/${reviewId}`
        ];
        Promise.all(
        urls.map(async (url) => {
            const res = await fetch(url);
            return res.json();
        }))
        .then((results) => {
            setReview(results[0]);
            setReviewAvgRate(results[0].avgRate);
            setComments(results[1]);
            setSumOfLikes(results[2].count);
            return fetch(`${SERVER_URI}/api/likes/get-like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: currentUser.id,
                    reviewId, 
                })
            })
        })
        .then((res => {
            if(res.ok) {
                setIsLiked(true);
            }
            else {
                setIsLiked(false);
            }
        }))
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

        socket.on('new-comment', (data) => {
            setComments((prevComments) => [...prevComments, data]);
        });
        return () => {
            socket.off('new-comment');
        }
    }, []);

    function addCommentHandler(e) {
        e.preventDefault();
        if(commentInput !== "") {
            socket.emit("new-comment", { 
                username: currentUser.username,
                text: commentInput,
                reviewId,
                userId: currentUser.id 
            });
            setCommentInput('');
        }
    }

    function likeHandler() {
        const likeBtn = document.querySelector('#like-btn');
        likeBtn.classList.remove('fa-regular');
        likeBtn.classList.add('fa-solid');
        setIsLiked(true);
        setSumOfLikes(prevSum => prevSum + 1);
        fetch(`${SERVER_URI}/api/likes/add-like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: currentUser.id,
                reviewId: reviewId, 
            })
        })
    }

    function dislikeHandler() {
        const likeBtn = document.querySelector('#like-btn');
        likeBtn.classList.remove('fa-solid');
        likeBtn.classList.add('fa-regular');
        setIsLiked(false);
        setSumOfLikes(prevSum => prevSum - 1);
        fetch(`${SERVER_URI}/api/likes/delete-like`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: currentUser.id,
                reviewId: reviewId, 
            })
        })
    }

    return (
        <div className='flex justify-center items-start dark:bg-slate-700 dark:text-white'>
            <div className='w-full mx-24 my-10 rounded-lg'>
                <div>
                    {/* title */}
                    <div className='m-5 flex justify-start items-center'>
                        <h1 className='font-bold text-2xl'>{review?.name}</h1> 
                        <div className='ml-5 flex items-center'>
                            <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                            {review.avgRate === null 
                                ? <span className='text-slate-500 ml-2'>{language === 'en' ? en.noRating : ru.noRating}</span> 
                                : <span className='text-sm ml-1 text-slate-500 dark:text-slate-300'>{reviewAvgRate} {language === 'en' ? en.outOf : ru.outOf} 5</span>
                            }
                        </div>
                    </div>
                    <hr className=''/>
                    
                    {/* review's information */}
                    <div className='m-5'>
                        <h2 className='mb-2'>
                            <span className='font-bold mr-1'>{language === 'en' ? en.author : ru.author}: </span>
                            {review?.author}<span className='ml-5'>
                                <i className="mr-2 fa-solid fa-thumbs-up text-blue-600"></i> 
                                {sumOfLikes} 
                            </span>
                        </h2>
                        <h2 className='mb-2'>
                            <span className='font-bold mr-1'>{language === 'en' ? en.reviewItemName : ru.reviewItemName}: </span>
                            {review?.reviewedItemName}
                        </h2>
                        <h2 className='mb-2'>
                            <span className='font-bold mr-1'>{language === 'en' ? en.authorRate : ru.authorRate}: </span>
                            {review?.grade} 
                            {<span> {language === 'en' ? en.outOf : ru.outOf} 10</span>}
                        </h2>
                        <h2>
                            <span className='font-bold mr-1'>{language === 'en' ? en.group : ru.group}: </span>
                            {review?.group}
                        </h2>
                    </div>

                    {/* review's text */}
                    <div className='m-5'>
                        <MDEditor.Markdown source={review?.text} />
                    </div>

                    {/* review's tags */}
                    <div className='m-5 text-blue-800 dark:text-blue-400'>
                        {review?.tags?.map((tag, index) => <span className="hover:text-yellow-500 cursor-pointer" key={index} onClick={()=>tagOnClickHandler(tag.name, navigate)}>#{tag.name} </span>)}
                    </div>

                    {/* review's image */}
                    <div className='m-5'>
                        {review.imgUrl === null ? <></> : <img  src={review?.imgUrl} alt="review" width="200px"/>}
                    </div>
                </div>
                <hr />

                {/* review's rating and like section */}
                {currentUser ? <div className='m-5 flex justify-between items-center'>
                    <div className="flex">                        
                        <StarRating userId={currentUser.id} reviewId={reviewId} setReviewAvgRate={setReviewAvgRate}/>
                    </div>
                    {/* Like button */}
                    <div>
                        <span>{language === 'en' ? en.likeThisReview : ru.likeThisReview}: </span>
                        { isLiked 
                            ? <i id="like-btn" 
                                className="fa-solid fa-thumbs-up ml-1 text-xl text-blue-500  hover:text-sky-400" 
                                onClick={dislikeHandler}></i>
                            : <i id="like-btn" 
                                className="fa-regular fa-thumbs-up ml-1 text-xl text-blue-500  hover:text-sky-400" 
                                onClick={likeHandler}></i>
                        }
                    </div>
                </div> : <></>}
                <hr className='mb-4'/>

                {/* comment form */}
                {currentUser ? <form className='my-4 flex justify-between items-center'>
                    <input 
                        type="text" 
                        placeholder={language === 'en' ? en.addComment : ru.addComment}
                        onChange={e => setCommentInput(e.target.value)}
                        value={commentInput}
                        className='w-full mx-5 pl-4 rounded-md h-10 border-solid border-2 border-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 dark:text-black'
                    />
                    <button 
                        onClick={e => addCommentHandler(e)} 
                        className='bg-yellow-400 w-32 p-2 rounded hover:bg-yellow-500'
                    >
                        {language === 'en' ? en.post : ru.post}
                    </button>
                </form> : <></>}
                
                {/* comment section */}
                <h3 className='mx-5 font-bold text-lg'>{language === 'en' ? en.comments : ru.comments}</h3>
                <div className='mx-5 my-5 flex flex-col justify-center items-start'>
                    {comments.length === 0 
                    ? <p>{language === 'en' ? en.noComment : ru.noComment}</p> 
                    : comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
                </div>
            </div>
        </div>
    )
}

export default ReviewPage;