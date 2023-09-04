import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
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
      .then(resObj => setUser(resObj.user))
      .catch(err => console.log(err));
    }
    getUser();
  }, []);
  
  return (
    <div className='w-screen h-screen'>
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/create-review" element={<CreateReviewPage />} />
        <Route path="/edit-review" element={<EditReviewPage />} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
