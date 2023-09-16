import React, { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';

const StarRating = () => {

  const language = useContext(LanguageContext);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleRating = (rate) => {
    setRating(rate)
  }

  return (
    <div className='text-lg flex justify-center items-center'>
      <span className='mr-4'>{language === 'en' ? en.yourRate : ru.yourRate}: </span>
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
      <button className='ml-4 bg-blue-500 w-24 p-1 rounded text-white text-sm hover:bg-blue-800'>
        {language === 'en' ? en.submit : ru.submit}
      </button>
    </div>
  )
};

export default StarRating;