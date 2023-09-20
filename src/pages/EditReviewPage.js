import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { uploadFile } from '../helpers/uploadImageHelper';
import { handleSuggestionClick, handleInputChange, extractTags } from '../helpers/tagHelpers';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';
import MDEditor from '@uiw/react-md-editor';
import { FileUploader } from "react-drag-drop-files";


const EditReviewPage = () => {

  const SERVER_URI = process.env.REACT_APP_SERVER_URI;

  const [queryParameters] = useSearchParams()
  const userIdFromUri = queryParameters.get("userId");
  const reviewIdFromUri = queryParameters.get("reviewId");

  const language = useContext(LanguageContext);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [tagsArray, setTagsArray] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tagTextArea, setTagTextArea] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [groups, setGroups] = useState([]);
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
    const urls = [
      `${SERVER_URI}/api/reviews/${reviewIdFromUri}`, 
      `${SERVER_URI}/api/groups`,
      `${SERVER_URI}/api/tags`
    ];
    Promise.all(
    urls.map(async (url) => {
        const res = await fetch(url);
        return res.json();
    }))
    .then((data) => {
      setName(data[0].name);
      setReviewedItemName(data[0].reviewedItemName);
      setGroup(data[0].group);
      let tagText = "";
      for(let i = 0; i < data[0].tags.length; i++) {
        tagText += "#" + data[0].tags[i].name + " ";
      }
      setTagTextArea(tagText);
      setText(data[0].text);
      setGrade(data[0].grade);
      setImgUrl(data[0].imgUrl);
      setGroups(data[1]);
      const tags = data[2].map(tag => tag.name);
      const uniqueTags = Array.from(new Set(tags));
      setTagsArray(uniqueTags);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  }, []);

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

  function saveChangesHandler(e) {
    e.preventDefault();
    if(!name || !reviewedItemName || !text) {
      window.alert('Please fill in all required fields!');
      return;
    }
    fetch(`${SERVER_URI}/api/reviews/edit-review`, {
      method: "PUT",
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
        tags,
        reviewId: reviewIdFromUri
      })
    })
    navigate(`/user-page/?type=userid&name=${userIdFromUri}`);
  }

  return (
    <div className='w-screen min-h-screen dark:bg-slate-800 dark:text-white flex flex-col justify-start items-center'>
        <h1 className='m-10 font-bold text-xl'>{language === 'en' ? en.editReview : ru.editReview}</h1>
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
            <label className='mt-4 mb-2'>{language === 'en' ? en.yourReview : ru.yourReview}:</label>
            <div>
              <MDEditor
                value={text} 
                onChange={setText}
              />
              <MDEditor.Markdown style={{ whiteSpace: 'pre-wrap' }} />
            </div>

            {/*-------- upload image -------*/}
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <div className='my-2 flex justify-between items-center'>
              <p>{language==='en' ? en.uploaded : ru.uploaded} {progress}%</p>
              <button 
                  className="w-1/2 p-2 bg-slate-200 rounded hover:bg-slate-300 dark:text-black" 
                  onClick={uploadImgHandler}
              >
                {language==='en' ? en.uploadImage : ru.uploadImage}
              </button>
            </div>
               
            {/*-------- rating slider -------*/}
            <label className='mt-8'>
              {language==='en' ? en.itemRate : ru.itemRate}:
              <span className='ml-5'>{grade}</span>
            </label>
            <input className='my-2 accent-yellow-500' type="range" min={0} max={10} step={0.5} value={grade} onChange={(e) => setGrade(e.target.value)}/>
            
            <button 
              type="button" 
              className='h-10 mt-12 rounded text-white bg-red-600 hover:bg-yellow-500 hover:text-white' 
              onClick={(e)=>saveChangesHandler(e)}
            >
              {language==='en' ? en.save : ru.save}
            </button>
        </form>
    </div>
  )
}

export default EditReviewPage;