import React from 'react';

const EditReviewPage = () => {
  return (
    <div>
        <h1>Edit Review</h1>
        <form>
            <lable>Review Name:</lable>
            <input type="text" />

            <lable>Name of What you are going to review:</lable>
            <input type="text" />

            <lable>Review Name:</lable>
            <input type="text" />

            <lable>Group:</lable>
            <select>
                <option>Movie</option>
                <option>TV Show</option>
                <option>Book</option>
                <option>Game</option>
                <option>Device</option>
                <option>Car</option>
            </select>

            <label>Tags:</label>
            <input type="text" />

            <label>Your Review:</label>
            <textarea></textarea>

            <label for="image-review">Image(optional):</label>
            <input type="file" id="image-review" name="image-review"></input>

            <label>Your Rate to what you are reviewing(0 to 10):</label>
            <input type="range" />

            <button type="button">Save Changes</button>
        </form>
    </div>
  )
}

export default EditReviewPage;