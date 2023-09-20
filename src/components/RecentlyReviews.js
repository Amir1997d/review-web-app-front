import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';


const RecentlyReviews = () => {

    const SERVER_URI = process.env.REACT_APP_SERVER_URI;
    const language = useContext(LanguageContext);
    const [recentlyReviews, setRecentlyReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${SERVER_URI}/api/reviews/recently-reviews`)
        .then(res => res.json())
        .then(data => setRecentlyReviews(data));
    }, []);

    function readHandler(id) {
        navigate(`/review/?type=reviewId&name=${id}`)
    }

    return (
        <div className='w-full m-2'>
            <h2 className='mb-2 dark:text-white'>{language === 'en' ? en.recentlyReviews : ru.recentlyReviews}</h2>
            <div className='w-full min-h-full p-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded'>
            {recentlyReviews?.length === 0 ? <p>no review</p> : recentlyReviews?.map((review, index) => {
                return (
                    <div key={index} className='p-4 m-2 bg-white rounded dark:bg-slate-400 dark:text-white flex justify-between items-center'>
                        <div>
                            <p className='font-bold text-lg'>{review.name}</p>
                            <p>{language === 'en' ? en.avgRating : ru.avgRating} :
                                <i className="fa-solid fa-star text-yellow-400"></i> 
                                {review.avgRate === null 
                                    ? <span>{language === 'en' ? en.noRating : ru.noRating}</span> 
                                    : <span>{review.avgRate} {language === 'en' ? en.outOf : ru.outOf} 5</span>
                                }
                            </p>
                        </div>
                        <button 
                            className='w-24 p-1 text-sm text-white bg-blue-600 hover:bg-white hover:text-blue-600 border-solid border-2 border-blue-600 rounded'
                            onClick={() => readHandler(review.id)}
                        >
                            {language === 'en' ? en.read : ru.read}
                        </button>                    
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default RecentlyReviews;