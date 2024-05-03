import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from './Context/AuthContext';
import "./App.css";
import Home from "./Views/Home/Home";
import Login from './Views/Login/Login';
import Register from './Views/Register/Register';
import Posts from './Views/Posts/Posts';
import SinglePost from './Views/SinglePost/SinglePost';
import CreatePost from './Views/CreatePost/CreatePost';
import Users from './Views/Users/Users';
import Profile from './Views/Profile/Profile';
import Authenticated from './hoc/Authenticated/Authenticated';
import NotFound from './Views/NotFound/NotFound';
import NavBarHome from "./Components/NavBarHome/NavBarHome";
import Footer from "./Components/Footer/Footer";

function App() {
  const[authValue, setAuthValue] = useState(false);

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{isLoggedIn: authValue, setLoginState: setAuthValue}}>
        <NavBarHome logged={authValue}/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/posts" element={<Authenticated><Posts /></Authenticated>}/>
          <Route path="/posts/:id" element={<SinglePost />}/>
          <Route path="/create-post" element={<CreatePost />}/>
          <Route path="/users" element={<Authenticated><Users /></Authenticated>}/>
          <Route path="/profile" element={<Authenticated><Profile /></Authenticated>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer />
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
