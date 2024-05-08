import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from '@/pages/Landing/LandingPage';
import CalendarPage from '@/pages/Main/Calendar/CalendarPage';
import GroupPage from '@/pages/Main/Group/GroupPage';
import ReviewIndexPage from '@/pages/Main/Review/ReviewIndexPage';
import ReviewWritePage from '@/pages/Main/Review/ReviewWritePage';
import ReviewDetailPage from '@/pages/Main/Review/ReviewDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MainLayout from './pages/Main/MainLayout';
import { BROWSER_PATH } from './constants/Path';
import GoogleOAuth from './pages/OAuth/GoogleOAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={BROWSER_PATH.LANDING} element={<LandingPage />} />
        <Route path={BROWSER_PATH.OAUTH.GOOGLE} element={<GoogleOAuth />} />
        <Route path={BROWSER_PATH.LANDING} element={<MainLayout />}>
          <Route path={BROWSER_PATH.CALENDAR} element={<CalendarPage />} />
          <Route path="group/:groupId?" element={<GroupPage />} />
          <Route path="review" element={<ReviewIndexPage />} />
          <Route path="review/write" element={<ReviewWritePage />} />
          <Route path="review/:reviewId" element={<ReviewDetailPage />} />
        </Route>
        <Route path={BROWSER_PATH.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
