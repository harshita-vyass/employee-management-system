import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');

    const publicRoutes = ['/login'];

    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      navigate('/login');
    } else if (isAuthenticated && location.pathname === '/login') {
      navigate('/');
    }
  }, [location, navigate]);
};

export default useAuthRedirect;
