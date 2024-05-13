import { lazy } from 'react';

const Landing = lazy(() => import('@/pages/Landing/LandingPage'));
const GoogleOAuth = lazy(() => import('@/pages/OAuth/GoogleOAuth'));
const MainLayout = lazy(() => import('@/pages/Main/MainLayout'));
const Calendar = lazy(() => import('@/pages/Main/Calendar/CalendarPage'));
const Group = lazy(() => import('@/pages/Main/Group/GroupPage'));
const ReviewIndex = lazy(() => import('@/pages/Main/Review/ReviewIndexPage'));
const ReviewWrite = lazy(() => import('@/pages/Main/Review/ReviewWritePage'));
const ReviewDetail = lazy(() => import('@/pages/Main/Review/ReviewDetailPage'));
const ReviewModify = lazy(() => import('@/pages/Main/Review/ReviewModifyPage'));
const NotFound = lazy(() => import('@/pages/NotFoundPage'));

export {
  Landing,
  GoogleOAuth,
  MainLayout,
  Calendar,
  Group,
  ReviewIndex,
  ReviewWrite,
  ReviewDetail,
  ReviewModify,
  NotFound,
};
