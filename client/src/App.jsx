import React from "react";
import { logo } from "./assets";
// import { Home, CreatePost } from "./pages";
import {  Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { useEffect } from "react";
import { generateRandomString } from "./utils/Index";
const App = () => {
  const location=useLocation()
  console.log(location)

  useEffect(()=>{
    const uniqueKey=localStorage.getItem("artsignature")
    if(!uniqueKey){
      const key= generateRandomString(10)
      console.log(key)
      localStorage.setItem("artsignature",key)
    }
  },[])
  
  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <div className="flex items-center gap-2">
           {/* <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link> */}
        <p className="font-semibold text-lg "><Link to="/">AIMAGEN</Link></p>
        </div>
       
        <Link
          to={location.pathname==="/create-post"?"/":"/create-post"}
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2"
        >
       {location.pathname==="/create-post"?"Gallery":"Create"}
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
