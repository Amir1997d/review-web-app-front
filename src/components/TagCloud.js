import React, { useEffect, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import { useNavigate } from 'react-router-dom';
import { tagOnClickHandler } from '../helpers/tagHelpers';


const TagCloudSection = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URI}/api/tags/tag-cloud-data`)
        .then(res => res.json())
        .then(tags => setData(tags))
        .catch(err => console.error(err));
    }, []);

    const navigate = useNavigate();   
    return (
        <TagCloud
            className='w-full h-full p-12 cursor-pointer flex flex-wrap justify-center'
            minSize={12}
            maxSize={35}
            tags={data}
            onClick={(tag)=>tagOnClickHandler(tag.value, navigate)}
        />
    )
}

export default TagCloudSection;