import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';

const UsersTableItem = ({ review, index, deleteHandler }) => {

    const language = useContext(LanguageContext);
    const navigate = useNavigate();
    function readHandler(id) {
        navigate(`/review/read-mode/?type=reviewId&name=${id}`)
    }
    return (
        <tr className='h-10 text-center p-3 odd:bg-slate-200 dark:text-black hover:bg-slate-300'>
            <td>{index + 1}</td>
            <td>{review.name}</td>
            <td>{review.group}</td>
            <td><button onClick={() => deleteHandler(review.id)} className='text-black rounded hover:text-red-600' title="Delte Review"><i className="fa-solid fa-trash"></i></button></td>
            <td>
                <button className='w-28 h-7 bg-sky-500 text-white rounded hover:bg-sky-800 text-sm'>
                    {language === 'en' ? en.edit : ru.edit}
                </button>
            </td>
            <td>
                <button onClick={() => readHandler(review.id)} className='w-28 h-7 bg-yellow-200 text-black rounded hover:bg-yellow-500 text-sm'>
                    {language === 'en' ? en.readMode : ru.readMode}
                </button>
            </td>
            <td><i className="fa-solid fa-star text-yellow-400"></i>4.6</td>
        </tr>
    )
}

export default UsersTableItem;