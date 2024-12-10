import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pagas/Registration';
import Login from './pagas/loginPage';
import Dashboard from './pagas/Deshboard';
import { Home } from './pagas/Home';
import { SingalFileCard } from './pagas/SingalFileCard';
import { PrivateRoute } from './components/PrivateRoute';
import Navbar from './components/Nevbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (<>
    <Navbar />
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/dashboard/file/:_id" element={<SingalFileCard />} />
      <Route path='/private' element={<PrivateRoute />} />
    </Routes>
  </>);
}

export default App;
