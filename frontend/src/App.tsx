import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from '@/pages/Landing/LandingPage';
import LoginPage from '@/pages/Login/LoginPage';
import SingupPage from '@/pages/Singup/SingupPage';
import CalendarPage from '@/pages/Main/Calendar/CalendarPage';
import GroupPage from '@/pages/Main/Group/GroupPage';
import ReviewIndexPage from '@/pages/Main/Review/ReviewIndexPage';
import ReviewWritePage from '@/pages/Main/Review/ReviewWritePage';
import ReviewDetailPage from '@/pages/Main/Review/ReviewDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MainLayout from './pages/Main/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingupPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="group/:groupId?" element={<GroupPage />} />
          <Route path="review" element={<ReviewIndexPage />} />
          <Route path="review/write" element={<ReviewWritePage />} />
          <Route path="review/:reviewId" element={<ReviewDetailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
