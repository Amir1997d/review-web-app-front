import React,{ useContext } from 'react';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';

const Comment = ({ comment }) => {
  const language = useContext(LanguageContext);
  return (
    <div className='mb-4'>
      <h3 className='text-xs font-bold'>{comment.username}</h3>
      <p>{comment.text}</p>
      {comment.createdAt === undefined 
        ? <span className='text-xs text-slate-400'>
            {language === 'en' ? en.aFewSecAgo : ru.aFewSecAgo}
          </span> 
        : <span className='text-xs text-slate-400'>
          {comment.createdAt.slice(0, 10)} {language === 'en' ? en.at : ru.at} {comment.createdAt.slice(11, 16)}
          </span>
      }
    </div>
  )
}

export default Comment;