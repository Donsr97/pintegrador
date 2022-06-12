import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Edit from './pages/Edit'
import Main from './pages/Main'
import Navbar from './components/Navbar/Navbar';
import NewStory from './pages/NewStory'
import New from './pages/New'
import View from './pages/View'
import Read from './pages/read'
import Login from './pages/Login'
import Register from "./pages/register"
import Flow from "./pages/flow"
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>

    <div className="container">
      <Routes>
        <Route path='/view' element={<View />} />
        <Route path='/' element={<Main />} />
        <Route path='/read' element={<Read />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/newstory' element={<NewStory />} />
        <Route path='/new' element={<New />} />
        <Route path='/flow' element={<Flow />} />
      </Routes>
      </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
