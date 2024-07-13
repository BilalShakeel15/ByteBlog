import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Alert from './components/Alert';
import About from './components/About';
import Blogs from './components/Blogs';
import BlogStates from './context/blogs/BlogStates';
import Signup from './components/Signup';
import Login from './components/Login';
import Userhome from './components/Userhome';
import Newpost from './components/Newpost';
import Yourblogs from './components/Yourblogs';
import Specificblog from './components/Specificblog';
import { useState } from 'react';

function App() {
  const [alert, setAlert] =useState(null);
  const showAlert = (message, type,m=3.5) => {
    setAlert({
      msg: message,
      type: type,
      margin:m
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <BlogStates>
    <BrowserRouter>
      <Navbar />
      <Alert alert={alert}/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/about" element={<About/>}></Route>
        <Route exact path="/blogs" element={<Blogs/>}></Route>
        <Route exact path="/yourblogs" element={<Yourblogs showAlert={showAlert}/>}></Route>
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
        <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
        <Route exact path="/userhome" element={<Userhome/>}></Route>
        <Route exact path="/user-new-post" element={<Newpost showAlert={showAlert}/>}></Route>
        <Route exact path="/specificblog" element={<Specificblog/>}></Route>
      </Routes>
    </BrowserRouter>
    </BlogStates>
  );
}

export default App;
