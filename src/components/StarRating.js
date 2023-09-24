import React, { useState, useContext, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';

const StarRating = ({userId, reviewId, setReviewAvgRate}) => {

  const SERVER_URI = process.env.REACT_APP_SERVER_URI;
  const language = useContext(LanguageContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [alreadyRated, setAlreadyRated] = useState(false);

  useEffect(() => {
    fetch(`${SERVER_URI}/api/ratings/get-rating`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reviewId,
        userId,
      })
    })
    .then((res => {
      if(res.ok) {
        setAlreadyRated(true);
      }
    }))
    .catch((err) => console.log(err));
  }, []);

  const handleRating = (rate) => {
    setRating(rate)
  }

  function ratingHandler() {
    fetch(`${SERVER_URI}/api/ratings/add-rating`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rating: rating,
        reviewId,
        userId,
      })
    })
    .then(()=> {
      return fetch(`${SERVER_URI}/api/ratings/get-avg-rating/${reviewId}`)
    })
    .then(res => res.json())
    .then(data => setReviewAvgRate(data.avgRate));
    setAlreadyRated(true);
  }

  return (
    <div className='text-lg flex justify-center items-center'>
      {/*<span className='mr-4'>{language === 'en' ? en.yourRate : ru.yourRate}: </span>*/}
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} >
            <input className="hidden" type="radio" name="rating" value={currentRating} onClick={()=>handleRating(currentRating)}/>
            <FaStar
              className="cursor-pointer"
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )})
      }
      <button onClick={ratingHandler} disabled={alreadyRated} 
        className='ml-4 bg-blue-500 w-24 p-1 rounded text-white text-sm hover:bg-blue-800 disabled:bg-slate-400'
        >
        {language === 'en' ? en.submit : ru.submit}
      </button>
    </div>
  )
};

export default StarRating;