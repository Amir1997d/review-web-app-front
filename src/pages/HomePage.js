import React from 'react';
import RecentlyReviews from '../components/RecentlyReviews';
import TopReviews from '../components/TopReviews';
import TagClould from '../components/TagCloud';

const HomePage = () => {
  return (
    <div className='w-screen min-h-screen p-10 dark:bg-slate-800 flex flex-col justify-start items-center'>
      <div className='w-full mb-8 flex flex-col justify-evenly items-start lg:flex-row'>
        <RecentlyReviews />
        <TopReviews />
      </div>
      <TagClould />
    </div>
  )
}

export default HomePage;