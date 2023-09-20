import React, { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import UserTableItem from '../components/UserTableItem';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';


const UserPage = ({ currentUser }) => {

    const SERVER_URI = process.env.REACT_APP_SERVER_URI;
    const language = useContext(LanguageContext);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState('allGroups');
    const [reviews, setReviews] = useState([]);
    const [queryParameters] = useSearchParams()
    const userId = queryParameters.get("name");
    const [originalReviews, setOriginalReviews] = useState([]);
    
    useEffect(() => {
        const urls = [`${SERVER_URI}/api/groups`, `${SERVER_URI}/api/reviews/user-reviews/${userId}`];
        Promise.all(
          urls.map(async (url) => {
            const res = await fetch(url);
            return res.json();
          }))
          .then((results) => {
            setGroups(results[0]);
            setOriginalReviews(results[1]);
            setReviews(results[1]);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
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

    // function filterDateHandler(filteredBy) {
    //     // const chosenDate = e.target.value;
    //     // setGroup(chosenDate);
    //     // if (chosenGroup === 'allTime') {
    //     //     setReviews(originalReviews);
    //     // } else {
    //     //     const filteredReviews = originalReviews.filter(review => review.group === chosenGroup);
    //     //     setReviews(filteredReviews);
    //     // }
    // }
    // {/* filter by date */}
    // <label>{language === 'en' ? en.filterByDate : ru.filterByDate}:</label>
    // <select defaultValue='allTime' 
    //     className='ml-2 mr-10 p-1 rounded bg-yellow-400 dark:bg-red-500' 
    //     onChange={(e)=>filterGroupHandler(e)}
    // >
    //     <option value="allTime">{language === 'en' ? en.lifeTime : ru.lifeTime}</option>
    //     <option value="addedToday">{language === 'en' ? en.addedToday : ru.addedToday}</option>
    //     <option value="addedThisMonth">{language === 'en' ? en.addedThisMonth : ru.addedThisMonth}</option>
    // </select>

    function filterGroupHandler(e) {
        const chosenGroup = e.target.value;
        setGroup(chosenGroup);
        if (chosenGroup === 'allGroups') {
            setReviews(originalReviews);
        } else {
            const filteredReviews = originalReviews.filter(review => review.group === chosenGroup);
            setReviews(filteredReviews);
        }
    }

    //----------------------------sorting test---------------------------
    const [selectedSorting, setSelectedSorting] = useState('index');
    function sortByIndex(a, b) {
        return a.id - b.id;
    }
      
    // Sort by name
    function sortByName(a, b) {
        return a.name.localeCompare(b.name);
    }
    
    // Sort by most recently added
    function sortByMostRecentlyAdded(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }

    const handleSortingChange = (e) => {
        const newSorting = e.target.value;
        setSelectedSorting(newSorting);
        let sortedReviews = [...reviews];
    
        if (newSorting === 'index') {
          sortedReviews.sort(sortByIndex);
        } else if (newSorting === 'name') {
          sortedReviews.sort(sortByName);
        } else if (newSorting === 'recentlyAdded') {
          sortedReviews.sort(sortByMostRecentlyAdded);
        }
    
        setReviews(sortedReviews);
    };
    
    return (
        <div className='w-screen min-h-screen dark:bg-slate-800 dark:text-slate-200 m-0 p-10 flex flex-col justify-start items-center'>
            <h1 className='mb-5 font-bold text-xl'>{language === 'en' ? en.myReviews : ru.myReviews}</h1>
            <div className='w-full h-14 mb-4 flex justify-between items-center'>
            <div>
                    {/* filter by group */}
                    <label>{language === 'en' ? en.filterByGroup : ru.filterByGroup}:</label>
                    <select 
                        className='ml-2 mr-10 p-1 rounded bg-yellow-400 dark:bg-red-500' 
                        value={group} 
                        onChange={(e)=>filterGroupHandler(e)}
                    >
                        <option value="allGroups">{language === 'en' ? en.allGroups : ru.allGroups}</option>
                        {groups?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                    </select>
                    {/* sorting */}
                    <label>{language === 'en' ? en.sortBy : ru.sortBy}:</label>
                    <select defaultValue='index' onChange={handleSortingChange} className='ml-2 p-1 rounded bg-yellow-400 dark:bg-red-500'>
                        <option value="index">{language === 'en' ? en.notSorted : ru.notSorted}</option>
                        <option value="name">{language === 'en' ? en.byName : ru.byName}</option>
                        <option value="recentlyAdded">{language === 'en' ? en.recentlyAdded : ru.recentlyAdded}</option>
                       
                    </select>
                </div>
                {/* cerate review button */}
                <button className='py-2 px-4 bg-green-600 hover:bg-green-800 text-white rounded'>
                    <Link to={`/create-review/?type=userid&name=${userId}`}>
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
                                                        userId={userId}
                                                    />)
                    }
                </tbody>
            </table>
        </div> 
    )
}

export default UserPage;