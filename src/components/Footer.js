import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import en from '../languages/en';
import ru from '../languages/ru';

const Footer = () => {
  const language = useContext(LanguageContext);
  return (
    <footer className='w-screen h-20 text-white bg-black flex items-center justify-center'>
      <p>{language === 'en' ? en.footer : ru.footer}</p>
    </footer>
  )
}

export default Footer;