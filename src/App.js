import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateReviewPage from './pages/CreateReviewPage';
import EditReviewPage from './pages/EditReviewPage';
import ReviewPage from './pages/ReviewPage';
import PageNotFound from './pages/PageNotFound';
import BlockedUser from './pages/BlockedUser';
import ReadModePage from './pages/ReadModePage';
import TagResultPage from './pages/TagResultPage';
import SearchResultPage from './pages/SearchResultPage';

export const LanguageContext =  createContext();

function App() {

  const SERVER_URI = process.env.REACT_APP_SERVER_URI;
  const [currentUser, setCurrentUser] = useState();
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      fetch(`${SERVER_URI}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "content-type":  "application/json",
          "Access-Control-Allow-Credentials": true
        }
      })
      .then(res => {
        if(res.status === 200) return res.json();
        throw new Error("authentication has failed!");
      })
      .then(resObj => {
        return fetch(`${SERVER_URI}/api/users/${resObj.user.id}`);
      })
      .then(response => response.json())
      .then(data => {
        setCurrentUser(data);
        const userPreferLang = data.preferredLanguage;
        setLanguage(userPreferLang);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch(err => {
        console.error('Request failed', err)
      })
    } else {
      const currentUser = JSON.parse(storedUser)
      setCurrentUser(currentUser);
      const userPreferLang = currentUser.preferredLanguage;
      setLanguage(userPreferLang);
    }
  }, []);
  
  return (
    <div className='w-screen h-screen'>
      <LanguageContext.Provider value={language}>
        <Header currentUser={currentUser} setLanguage={setLanguage} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/admin" element={currentUser && currentUser.isAdmin ? currentUser.isBlocked ? <Navigate to="/blocked-user"/> : <AdminPage /> : <Navigate to="/" />} />
          <Route path="/create-review" element={currentUser ? <CreateReviewPage currentUser={currentUser}/> : <LoginPage />} />
          <Route path="/edit-review" element={currentUser ? <EditReviewPage /> : <LoginPage />} />
          <Route path="/user-page" element={currentUser ? currentUser.isBlocked ? <Navigate to="/blocked-user"/> : <UserPage currentUser={currentUser}/> : <LoginPage />} />
          <Route path="/review" element={<ReviewPage currentUser={currentUser}/>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/blocked-user" element={<BlockedUser />} />
          <Route path="/review/read-mode" element={<ReadModePage />} />
          <Route path="/tag-search" element={<TagResultPage />} />
          <Route path="/search" element={<SearchResultPage />} />
        </Routes>
        <Footer />
      </LanguageContext.Provider>
    </div>
  );
}

export default App;