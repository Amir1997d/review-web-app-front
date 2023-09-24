import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { uploadFile } from '../helpers/uploadImageHelper';
import { handleSuggestionClick, handleInputChange, extractTags } from '../helpers/tagHelpers';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';
import MDEditor from '@uiw/react-md-editor';
import { FileUploader } from "react-drag-drop-files";

const CreateReviewPage = ({ currentUser }) => {

  const SERVER_URI = process.env.REACT_APP_SERVER_URI;

  const [queryParameters] = useSearchParams()
  const userIdFromUri = queryParameters.get("name");

  const language = useContext(LanguageContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [groups, setGroups] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tagTextArea, setTagTextArea] = useState('');
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

  //variables that get sent to backend
  const [name, setName] = useState("");
  const [reviewedItemName, setReviewedItemName] = useState("");
  const [group, setGroup] = useState("Movie");
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");
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
        const tags = results[1].map(tag => tag.name);
        const uniqueTags = Array.from(new Set(tags));
        setTagsArray(uniqueTags);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
 
  function addReviewHandler(e) {
    e.preventDefault();
    if(!name || !reviewedItemName || !text) {
      window.alert('Please fill in all required fields!');
      return;
    }
    fetch(`${SERVER_URI}/api/users/get-username/${userIdFromUri}`)
    .then(res => res.json())
    .then(username => { 
      return fetch(`${SERVER_URI}/api/reviews/create-review`, {
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
          author: username,
          tags,
          userId: userIdFromUri
        })
      })
    })
    .then(() => {
    	navigate(`/user-page/?type=userid&name=${userIdFromUri}`);
    	navigate(0);
    	})
    .catch(err => console.error(err));
  }

  const handleChange = (file) => {
    setFile(file);
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
        <form className='w-3/4 min-h-full mb-10 p-10 rounded-lg flex flex-col bg-gradient-to-t from-violet-500 to-fuchsia-500'>

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
                <button className='w-28 h-10 m-1 rounded bg-blue-600 text-xs lg:text-base hover:bg-sky-400' onClick={addTagHandler}>
                  {language === 'en' ? en.addTag : ru.addTag}
                </button>
                <button className='w-28 h-10 m-1 rounded bg-blue-600 text-xs lg:text-base hover:bg-sky-400' onClick={(e)=>resetTagTextArea(e)}>
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
            <label className='mt-4 mb-2'>{language === 'en' ? en.yourReview : ru.yourReview}:</label>
            <div>
              <MDEditor
                value={text} 
                onChange={setText}
              />
              <MDEditor.Markdown style={{ whiteSpace: 'pre-wrap' }} />
            </div>

            {/*-------- upload image -------*/}
            <label className='mt-4 mb-2'>{language === 'en' ? en.image : ru.image}:</label>
            <div className="flex flex-col md:flex-row justify-between">
            	<FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            	<button 
                  className="w-1/2 md:w-1/3 my-4 md:mx-2 md:my-0 p-2 bg-blue-600 rounded hover:bg-sky-400 dark:text-white" 
                  onClick={uploadImgHandler}
              >
                {language==='en' ? en.uploadImage : ru.uploadImage}
              </button>
            </div>
            <div className='my-2 flex justify-between items-center'>
              <p>{language==='en' ? en.uploaded : ru.uploaded} {progress}%</p>
            </div> 

            {/*-------- rating slider -------*/}
            <label className='mt-8'>
              {language==='en' ? en.itemRate : ru.itemRate}:
              <span className='ml-5'>{grade}</span>
            </label>
            <input className='my-2 accent-yellow-500' type="range" min={0} max={10} step={0.5} value={grade} onChange={(e) => setGrade(e.target.value)}/>
            
            <button 
              type="submit" 
              className='h-10 mt-12 rounded text-white bg-green-600 hover:bg-green-400 hover:text-white' 
              onClick={(e)=>addReviewHandler(e)}
            >
              {language==='en' ? en.create : ru.create}
            </button>
        </form>
    </div>
  )
}

export default CreateReviewPage;