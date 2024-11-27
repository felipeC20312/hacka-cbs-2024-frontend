import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import FirstPage from './pages/FirstPage';

const RoutesApp = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<FirstPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default RoutesApp;
