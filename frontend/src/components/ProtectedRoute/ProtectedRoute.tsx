
import Cookies from 'js-cookie';
import React, { ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';
interface ProtectedRouteProps {
  element: ReactNode;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, redirectTo }) => {

  const isAuth = !!Cookies.get('auth');
  console.log(isAuth);
  return isAuth ? (
    <Route element={element} />
  ) : (
    <Navigate to={redirectTo} state={{ unauthorized: true }} replace={true} />
  );
};

export default ProtectedRoute;