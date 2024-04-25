import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="bg-default-warmgray">
      <Outlet />
    </div>
  );
}

export default MainLayout;
