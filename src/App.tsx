import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/header/headerComponent';
import ListPage from './pages/listPage/index'
import RegisterPage from  './pages/registerPage/index'
import UpdatePage from './pages/updatePage/index';

const App: React.FC = () => {
  return (
      <Router>
          <HeaderComponent />
          <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/cadastro" element={<RegisterPage />} />
              <Route path="/atualizar/:city/:date/:shift" element={<UpdatePage />} />
          </Routes>
      </Router>
  );
};

export default App;
