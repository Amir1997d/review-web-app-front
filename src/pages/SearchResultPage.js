import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';
import MiniSearch from 'minisearch';


const SearchResultPage = () => {

    const SERVER_URI = process.env.REACT_APP_SERVER_URI;

    const [queryParameters] = useSearchParams()
    const keywordToSearch = queryParameters.get("search-for");

    const navigate = useNavigate();

    const language = useContext(LanguageContext);
    const [result, setResult] = useState([]);

    useEffect(() => {
        fetch(`${SERVER_URI}/api/reviews`)
        .then(res => res.json())
        .then(data => {
            const flattenedData = data.flatMap(review => {
                return [
                    { ...review, commentsText: review.comments.map(comment => comment.text).join(' ') },
                ];
            });
            let miniSearch = new MiniSearch({
                fields: ['name', 'reviewedItemName', 'text', 'tags', 'commentsText'], 
                storeFields: ['id', 'name', 'avgRate'], 
                searchOptions: {
                    tokenize: text => text.split(/\s+/),
                },
            });
            miniSearch.addAll(flattenedData);
            let results = miniSearch.search(keywordToSearch, { prefix: true });
            setResult(results);
        })
    }, []);
   
    function readHandler(id) {
        navigate(`/review/?type=reviewId&name=${id}`)
    }

    return (
        <div className='dark:bg-slate-600 h-screen flex flex-col items-center justify-start'>
            <h1 className='mt-8 dark:text-white'>{language === 'en' ? en.searchFor : ru.searchFor}: {keywordToSearch}</h1>
            <div className='w-3/4 m-4 p- bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded'>
            {result?.length === 0 ? <p className='text-center text-white p-4'>No Result</p> : result?.map((review, index) => {
                return (
                    <div key={index} className='m-2 p-4 bg-white rounded dark:bg-slate-400 dark:text-white flex justify-between items-center'>
                        <div>
                            <p className='font-bold text-lg'>{review.name}</p>
                            <p>{language === 'en' ? en.avgRating : ru.avgRating} :
                                <i className="fa-solid fa-star text-yellow-400"></i> 
                                {review.avgRate === null 
                                    ? <span>{language === 'en' ? en.noRating : ru.noRating}</span> 
                                    : <span>{review.avgRate} {language === 'en' ? en.outOf : ru.outOf} 5</span>
                                }
                            </p>
                        </div>
                        <button 
                            className='w-24 p-1 text-sm text-white bg-blue-600 hover:bg-white hover:text-blue-600 border-solid border-2 border-blue-600 rounded'
                            onClick={() => readHandler(review.id)}
                        >
                            {language === 'en' ? en.read : ru.read}
                        </button>                    
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default SearchResultPage;