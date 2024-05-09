import { Routes as BrowserRouter, Route } from 'react-router-dom';

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

import { BROWSER_PATH } from '@/constants/Path';

function Routes() {
  return (
    <BrowserRouter>
      <Route path={BROWSER_PATH.LANDING} element={<Landing />} />
      <Route path={BROWSER_PATH.OAUTH.GOOGLE} element={<GoogleOAuth />} />
      <Route path={BROWSER_PATH.LANDING} element={<MainLayout />}>
        <Route path={BROWSER_PATH.CALENDAR} element={<Calendar />} />
        <Route path={BROWSER_PATH.GROUP.DETAIL} element={<Group />} />
        <Route path={BROWSER_PATH.REVIEW.BASE} element={<ReviewIndex />} />
        <Route path={BROWSER_PATH.REVIEW.WRITE} element={<ReviewWrite />} />
        <Route path={BROWSER_PATH.REVIEW.DETAIL} element={<ReviewDetail />} />
      </Route>
      <Route path={BROWSER_PATH.NOT_FOUND} element={<NotFound />} />
    </BrowserRouter>
  );
}

export default Routes;
