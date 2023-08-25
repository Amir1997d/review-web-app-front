import React from 'react';
import RecentlyReviews from '../components/RecentlyReviews';
import TopReviews from '../components/TopReviews';
import TagClould from '../components/TagCloud';

const HomePage = () => {
  return (
    <div>
      <RecentlyReviews />
      <TopReviews />
      <TagClould />
    </div>
  )
}

export default HomePage;