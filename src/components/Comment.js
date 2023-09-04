import React from 'react';
import ReplyComment from '../pages/ReplyComment';

const Comment = ({ comment }) => {
  return (
    <div className='mb-4'>
      <div className='mb-4'>
        <h3 className='text-xs font-bold'>{comment.username}</h3>
        <p>{comment.text}</p>
        <button className='text-xs text-blue-500'>Reply</button>
      </div>
      <ReplyComment commentId={comment.id} />
    </div>
  )
}

export default Comment;