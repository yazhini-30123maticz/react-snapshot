import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import Home from "./pages/Home";
import Seo from "./pages/seo";
import Requestquote from "./pages/requestquote";

import Blog from "./pages/blog";
import Blogdetail from "./pages/blogdetail";
import Blogcategory from "./pages/blogcategory";
import Sitemap from './pages/sitemap'
import PPC from "./pages/ppc";

import ScrollToTop from '../src/components/scrolltop'
import { Helmet } from "react-helmet";
import assert from "assert";
// import { RemoveTrailingSlash } from "./pages/redirection";
import Errorpage from "./pages/404error";



export default function App({...rest}) {

  //   console.log = function () { };

  // console.log = () => { };
  console.debug = () => { };
  console.info = () => { };
  console.warn = () => { };

  return (
    <BrowserRouter basename="/"> 
      <ScrollToTop/>
      {/* <RemoveTrailingSlash/> */}
      <Routes>
    
        <Route exact path="/" element={<Home />} />
        <Route path="/seo-services" element={<Seo />} />
        <Route path="/ppc-services" element={<PPC />} />
        <Route path='/requestquote' element={<Requestquote />} />
        <Route path="/errorpage" element={<Errorpage />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/:slug' element={<Blogdetail/>} />
        <Route path='/blogcategory/:slug' element={<Blogcategory />} />
     
        {/* <Route path='/sitemap.xml' element={<Sitemap/>} /> */}
        <Route
          path="/*"
          element={<Navigate to="/errorpage" replace />}
        />

       

        
        
        
      </Routes>
    </BrowserRouter>
  );
}

