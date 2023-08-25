import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateReviewPage from './pages/CreateReviewPage';
import EditReviewPage from './pages/EditReviewPage';
import ReviewPage from './pages/ReviewPage';
import './App.css';

function App() {
  return (
    <div className='w-screen h-screen'>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/create-review" element={<CreateReviewPage />} />
        <Route path="/edit-review" element={<EditReviewPage />} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
