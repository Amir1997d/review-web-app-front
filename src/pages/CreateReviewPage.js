import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { uploadFile, dropHandler } from '../helpers/uploadImageHelper';
import { handleSuggestionClick, handleInputChange, extractTags } from '../helpers/tagHelpers';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';
import UploadImage from '../components/UploadImage';


const CreateReviewPage = ({ currentUser }) => {

  const SERVER_URI = process.env.REACT_APP_SERVER_URI;

  const language = useContext(LanguageContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [groups, setGroups] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tagTextArea, setTagTextArea] = useState('');

  //variables that get sent to backend
  const [name, setName] = useState();
  const [reviewedItemName, setReviewedItemName] = useState();
  const [group, setGroup] = useState("Movie");
  const [tags, setTags] = useState([]);
  const [text, setText] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [grade, setGrade] = useState(5);
  
  useEffect(() => {
    const urls = [`${SERVER_URI}/api/groups`, `${SERVER_URI}/api/tags`];
    Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url);
        return res.json();
      }))
      .then((results) => {
        setGroups(results[0]);
        setTagsArray(results[1]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
 
  function addReviewHandler(e) {
    e.preventDefault();
    fetch(`${SERVER_URI}/api/reviews/create-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        reviewedItemName,
        group,
        text,
        imgUrl,
        grade,
        avgRate: null,
        author: currentUser.username,
        tags,
        userId: currentUser.id
      })
    })
    navigate("/user-page");
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  function uploadImgHandler(e) {
    e.preventDefault();
    uploadFile(file, setProgress, setImgUrl);
  }

  function addTagHandler(e) {
    e.preventDefault();
    if(tagInput !== null) {
      if(!tagInput.startsWith('#')) {
        setTagTextArea(prevTagTextArea => prevTagTextArea + " #" + tagInput);
      }
      else {
        setTagTextArea(prevTagTextArea => prevTagTextArea + " " + tagInput);
      }
      setTagInput("");
      setTags(extractTags(tagTextArea));
    }
  }

  function resetTagTextArea(e) {
    e.preventDefault();
    setTagTextArea('');
    setTags([]);
  }

  return (
    <div className='w-screen min-h-screen dark:bg-slate-800 dark:text-white flex flex-col justify-start items-center'>
        <h1 className='m-10 font-bold text-xl'>{language === 'en' ? en.createReview : ru.createReview}</h1>
        <form className='w-1/2 min-h-full mb-10 p-10 rounded-lg flex flex-col bg-gradient-to-r from-violet-500 to-fuchsia-500'>

            {/*-------- review title input -------*/}
            <label className=''>{language === 'en' ? en.reviewName : ru.reviewName}:</label>
            <input className='w-full my-2 p-2 rounded dark:bg-slate-300 dark:text-black' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

            {/*-------- reviewd Item name input -------*/}
            <label className='mt-4'>{language === 'en' ? en.whatGotReviewed : ru.whatGotReviewed}:</label>
            <input className='w-full my-2 p-2 rounded dark:bg-slate-300 dark:text-black' type="text" value={reviewedItemName} onChange={(e)=>setReviewedItemName(e.target.value)}/>

            {/*-------- group selector -------*/}
            <label className='mt-4'>{language === 'en' ? en.group : ru.group}:</label>
            <select className='w-full my-2 p-2 rounded dark:bg-slate-300 dark:text-black' value={group} onChange={(e)=>setGroup(e.target.value)}>
              {groups?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
            </select>

            {/*-------- tag input -------*/}
            <label className='mb-2 mt-2'>{language === 'en' ? en.tags : ru.tags}:</label>
            <textarea className='bg-white dark:bg-slate-300 w-full mb-4 p-2 resize-none rounded text-sky-600' disabled value={tagTextArea}></textarea>
            <div>
              <div className='flex justify-between items-center'>
                <input 
                  className='w-96 p-2 rounded dark:bg-slate-300 dark:text-black' 
                  type="text" 
                  value={tagInput} 
                  onChange={(e)=>handleInputChange(e, setTagInput, tagsArray, setSuggestions)}
                />
                <button className='w-28 h-10 rounded bg-white dark:text-black hover:bg-slate-200' onClick={(e)=>addTagHandler(e)}>
                  {language === 'en' ? en.addTag : ru.addTag}
                </button>
                <button className='w-28 h-10 rounded bg-white dark:text-black hover:bg-slate-200' onClick={(e)=>resetTagTextArea(e)}>
                 {language === 'en' ? en.deleteTags : ru.deleteTags}
                </button>
              </div>
              
              {/* auto completion suggested tags */}
              <div className='w-56 h-auto bg-slate-200 absolute rounded'>
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className='hover:bg-slate-300 hover:rounded dark:text-black p-2' 
                    onClick={() => handleSuggestionClick(suggestion, setTagInput, setSuggestions)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
            
            {/*-------- review text input -------*/}
            <label className='mt-4'>{language === 'en' ? en.yourReview : ru.yourReview}:</label>
            <textarea className='h-64 my-2 p-2 rounded dark:bg-slate-300 dark:text-black' value={text} onChange={(e)=>setText(e.target.value)}></textarea>
            
            {/*-------- upload image -------*/}
            <label className='my-2'>{language === 'en' ? en.image : ru.image}:</label>
            <div className='h-56 bg-slate-100 rounded border-dotted border-4 border-black flex justify-evenly items-center p-2' onDrop={(e)=>dropHandler(e,file,setFile)}>
              <div className=''>
                <input 
                className='w-full dark:text-black'
                  type="file" 
                  id="image-review" 
                  name="image-review" 
                  onChange={(e) => handleFileChange(e)} 
                />
              </div>
              <span className='dark:text-black'> {language === 'en' ? en.dragDrop : ru.dargDrop}</span>
            </div>
            <div className='my-2 flex justify-between items-center'>
              <p>{language==='en' ? en.uploaded : ru.uploaded} {progress}%</p>
              <button 
                  className="w-1/2 p-2 bg-slate-200 rounded hover:bg-slate-300 dark:text-black" 
                  onClick={uploadImgHandler}
              >
                {language==='en' ? en.uploadImage : ru.uploadImage}
              </button>
            </div>
            {/* <UploadImage /> */}
            
            
            {/*-------- rating slider -------*/}
            <label className='mt-8'>
              {language==='en' ? en.itemRate : ru.itemRate}:
              <span className='ml-5'>{grade}</span>
            </label>
            <input className='my-2 accent-yellow-500' type="range" min={0} max={10} step={0.5} value={grade} onChange={(e) => setGrade(e.target.value)}/>
            
            <button 
              type="button" 
              className='h-10 mt-12 rounded text-white bg-red-600 hover:bg-yellow-500 hover:text-white' 
              onClick={(e)=>addReviewHandler(e)}
            >
              {language==='en' ? en.create : ru.create}
            </button>
        </form>
    </div>
  )
}

export default CreateReviewPage;