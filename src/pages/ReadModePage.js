import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Comment from '../components/Comment';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';


const ReadModePage = () => {

    const SERVER_URI = process.env.REACT_APP_SERVER_URI;

    const language = useContext(LanguageContext);
    const [review, setReview] = useState({});
    const [comments, setComments] = useState([]);
    const [queryParameters] = useSearchParams()
    const reviewId = queryParameters.get("name");

    useEffect(() => {
        const urls = [`${SERVER_URI}/api/reviews/${reviewId}`, `${SERVER_URI}/api/comments/${reviewId}`];
        Promise.all(
        urls.map(async (url) => {
            const res = await fetch(url);
            return res.json();
        }))
        .then((results) => {
            setReview(results[0]);
            setComments(results[1]);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    return (
        <div className='h-screen flex justify-center items-start dark:bg-slate-700 dark:text-white'>
            <div className='w-full mx-24 my-10 rounded-lg'>
                <div>
                    {/* title */}
                    <div className='m-5 flex justify-start items-center'>
                        <h1 className='font-bold text-2xl'>{review?.name}</h1> 
                        <div className='ml-5 flex items-center'>
                            <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                            {review.avgRate === null 
                                ? <sapn className='text-slate-500 ml-2'>{language === 'en' ? en.noRating : ru.noRating}</sapn> 
                                : <span className='text-sm ml-1 text-slate-500 dark:text-slate-300'>{review.avgRate} {language === 'en' ? en.outOf : ru.outOf} 5</span>
                            }
                        </div>
                    </div>
                    <hr className=''/>

                    {/* review's information */}
                    <div className='m-5'>
                        <h2 className='mb-2'>
                            <span className='font-bold mr-1'>{language === 'en' ? en.author : ru.author}: </span>
                            {review?.author}<span className='ml-5'>
                                <i className="fa-solid fa-thumbs-up text-blue-600"></i> 3340
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
                        <p>{review?.text}</p>
                    </div>

                    {/* review's tags */}
                    <div className='m-5 text-blue-800 dark:text-blue-400'>
                        {review?.tags?.map((tag, index) => <span key={index}>#{tag.name} </span>)}
                    </div>

                    {/* review's image */}
                    <div className='m-5'>
                        {review.imgUrl === null ? <></> : <img  src={review?.imgUrl} alt="review" width="200px"/>}
                    </div>
                </div>
                
                <hr className='mb-4'/>

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

export default ReadModePage;