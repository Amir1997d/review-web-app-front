// import React from 'react';

// const ReviewPage = () => {
//   return (
//     <div>
//         <div>
//             <h1>{review.name}</h1> 
//             <span>users' rate to this review: {review.avg_users_rate}</span>
//             <h2>Author: {review.author_name}</h2>
//             <span>How many Likes this review has got: {review.like_count}<i className="fa-solid fa-thumbs-up"></i></span>
//             <h2>What is got reviewed: {review.waht_got_reviewed}</h2>
//             <h2>Group: {review.group}</h2>
//             <div>
//                 <h2>Tags:</h2>
//                 {review.tags.map(tag => <p>#{tag.tag_name}</p>)}
//             </div>
//             <div>
//                 <p>{review.text}</p>
//             </div>
//             <div>
//                 <img src={review.img_url} alt="review's image" />
//             </div>
//             <h3>Author rate(0 to 10): {review.rate}</h3>
//         </div>
//         <div>
//             Stars user's rate to the review from 0 to 5
//         </div>
//         <div>
//             <span>Like this review:</span><i className="fa-solid fa-thumbs-up"></i>
//         </div>
//         <div>
//             {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
//         </div>
//     </div>
//   )
// }

// export default ReviewPage;