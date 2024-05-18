import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Profile from '../pages/profile';
import ProtectedRoutes from './protectedRoutes';

const Routering = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
      </Routes>
    </Router>
  );
};

export default Routering;