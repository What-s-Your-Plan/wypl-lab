import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Landing,
  GoogleOAuth,
  MainLayout,
  Calendar,
  Group,
  ReviewIndex,
  ReviewWrite,
  ReviewDetail,
  NotFound,
} from '@/pages/Pages';

import { BROWSER_PATH } from './constants/Path';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={BROWSER_PATH.LANDING} element={<Landing />} />
        <Route path={BROWSER_PATH.OAUTH.GOOGLE} element={<GoogleOAuth />} />
        <Route path={BROWSER_PATH.LANDING} element={<MainLayout />}>
          <Route path={BROWSER_PATH.CALENDAR} element={<Calendar />} />
          <Route path={BROWSER_PATH.GROUP} element={<Group />} />
          <Route path={BROWSER_PATH.REVIEW.BASE} element={<ReviewIndex />} />
          <Route path={BROWSER_PATH.REVIEW.WRITE} element={<ReviewWrite />} />
          <Route path={BROWSER_PATH.REVIEW.DETAIL} element={<ReviewDetail />} />
        </Route>
        <Route path={BROWSER_PATH.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
