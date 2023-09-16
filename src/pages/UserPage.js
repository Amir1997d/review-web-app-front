import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserTableItem from '../components/UserTableItem';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';


const UserPage = ({ currentUser }) => {

    const SERVER_URI = process.env.REACT_APP_SERVER_URI;
    const language = useContext(LanguageContext);
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
        fetch(`${SERVER_URI}/api/reviews/user-reviews/${currentUser.id}`)
        .then(res => res.json())
        .then(data => setReviews(data));
    }, []);  
    
    function deleteHandler(reviewId) {
        const sure = window.confirm(language === 'en' ? en.sureDeleteReview : ru.sureDeleteReview);
        if(sure) {
            fetch(`${SERVER_URI}/api/reviews/delete-review/${reviewId}`,{
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }})
            const filteredReviews = reviews.filter(review => review.id !== reviewId);
            setReviews(filteredReviews);
        }
    }

    return (
        <div className='w-screen min-h-screen dark:bg-slate-800 dark:text-slate-200 m-0 p-10 flex flex-col justify-start items-center'>
            <h1 className='mb-5 font-bold text-xl'>{language === 'en' ? en.myReviews : ru.myReviews}</h1>
            <div className='w-full h-14 mb-4 flex justify-between items-center'>
                <div>
                    <label>{language === 'en' ? en.filterBy : ru.filterBy}:</label>
                    <select defaultValue='no filter' className='ml-2 mr-10 p-1 rounded bg-yellow-400 dark:bg-red-500'>
                        <option>{language === 'en' ? en.noFilter : ru.noFilter}</option>
                        <option>{language === 'en' ? en.byGroup : ru.byGroup}</option>
                        <option>{language === 'en' ? en.addedToday : ru.addedToday}</option>
                        <option>{language === 'en' ? en.addedLastWeek : ru.addedLastWeek}</option>
                    </select>
                    <label>{language === 'en' ? en.sortedBy : ru.sortedBy}:</label>
                    <select defaultValue='index' className='ml-2 p-1 rounded bg-yellow-400 dark:bg-red-500'>
                        <option>{language === 'en' ? en.byIndex : ru.byIndex}</option>
                        <option>{language === 'en' ? en.byName : ru.byName}</option>
                        <option>{language === 'en' ? en.recentlyAdded : ru.recentlyAdded}</option>
                       
                    </select>
                </div>
                <button className='py-2 px-4 bg-green-600 hover:bg-green-800 text-white rounded'>
                    <Link to="/create-review">
                        {language === 'en' ? en.createReview : ru.createReview}
                    </Link>
                </button>
            </div>
            <table className='w-full border-collapse bg-yellow-100 dark:bg-red-200'>
                <thead>
                    <tr>
                        <th className='p-3 bg-yellow-400 dark:bg-red-500'>
                            {language === 'en' ? en.index : ru.index}
                        </th>
                        <th className='p-3 bg-yellow-400 dark:bg-red-500'>
                            {language === 'en' ? en.reviewName : ru.reviewName}
                        </th>
                        <th className='p-3 bg-yellow-400 dark:bg-red-500'>
                            {language === 'en' ? en.group : ru.group}
                        </th>
                        <th className='p-3 bg-yellow-400 dark:bg-red-500'>
                            {language === 'en' ? en.deleteReview : ru.deleteReview}
                        </th>
                        <th className='p-3 bg-yellow-400 dark:bg-red-500'>
                            {language === 'en' ? en.editReview : ru.editReview}
                        </th>
                        <th className='p-3 bg-yellow-400 dark:bg-red-500'>
                            {language === 'en' ? en.openReadMode : ru.openReadMode}
                        </th>
                        <th className='p-3 bg-yellow-400 dark:bg-red-500'>
                            {language === 'en' ? en.avgRating : ru.avgRating}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => <UserTableItem 
                                                        key={review.id} 
                                                        review={review} 
                                                        index={index} 
                                                        deleteHandler={deleteHandler}
                                                    />)
                    }
                </tbody>
            </table>
        </div> 
    )
}

export default UserPage;