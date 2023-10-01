import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Adminpage } from './compound/page/abminpage';
import { Viewpage } from './compound/page/pageview';
import { Home } from './compound/page/home';
import Register from './compound/resgister';
import { adminauth } from './scrives/auth';
import { Front } from './compound/frontpage';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={adminauth() ? <Adminpage /> : <Register />} />
          <Route path="/admin/id/:id" element={<Adminpage />} />
          <Route path="/video/:id" element={<Viewpage />} />
          <Route path='/' element={<Front />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/login" element={<Register />} />
          <Route path="/register/signin" element={<Register />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
