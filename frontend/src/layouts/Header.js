import React, { useEffect, useState } from 'react';
import { metatag } from '../api/api';
import Meta from "./metatags";
import { Link, useLocation, useParams } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, NavDropdown, NavLink } from 'react-bootstrap';


// image
import Logos from "../assets/images/Home/Logo.webp"


function Header(props) {
  const [metdata, setmetdata] = useState({});
  const [isMetaloaded,setMetaloaded] = useState(false); 
  const { state } = props;
  const{blogcategory} =props

  
  const  slug  = useLocation();
  console.log("slug",slug);

  useEffect(() => {
    metafn(); 
  }, [props])

  const metafn = async () => {
  
    var currentUrl = "/"+window.location.href.split("/")[3]
    console.log("currentUrl : ",currentUrl)
    var meta = await metatag({ "url": currentUrl })
    if (meta?.data) {
      setmetdata(meta?.data?.metaTagData)
    }
    if(props?.state){

      setmetdata(props?.state)
    }
    if(props?.blogcategory){
      setmetdata(props?.blogcategory)
    }
    setMetaloaded(true)
  }

  console.log("props?.blogcategory",props,metdata);
  const [headeractive, setHeaderactive] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 50) {
      setHeaderactive(true);
    }
    else {
      setHeaderactive(false);
    }
  };
  window.addEventListener('scroll', changeNavbarColor);

  
  var routename = "/"+window.location.href.split("/")[3]  

  const pagesurl = () => {
    if(routename) {
        var bannerimage = document.querySelector("#bannerimage");
        bannerimage.rel = "preload";
        bannerimage.as = "image";          
        bannerimage.setAttribute("fetchpriority", "high");
      if(routename === '/'){        
        bannerimage.href = require("../assets/images/Home/new_banner.webp");
      } else if(routename === '/seo-services'){
        bannerimage.href = require("../assets/images/seo/best-seo-services.webp");
      } else if(routename === '/ppc-services'){
        bannerimage.href = require("../assets/images/ppc/ppc-advertising-services.webp");
      } else {
        bannerimage.href = Logos
      }
    } 
  }

  useEffect(() => {
    pagesurl();
  }, []);
 

  return (
    <div className='headerpage'>
     {isMetaloaded && <Meta metdata={metdata} />}

      <Navbar className={headeractive ? 'fixed_white' : ''} collapseOnSelect expand="lg" bg="white" variant="white">
        <Container>
          <Navbar.Brand href="/"><img src={Logos} width={100} height={40} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="">
              <NavLink as={Link} to="/">Home</NavLink>
              <NavLink as={Link} to="/">About</NavLink>
              <NavLink as={Link} to="/seo-services">Seo</NavLink>
              <NavLink as={Link} to="/">Social Media</NavLink>
              <NavLink as={Link} to="/blog">Blog</NavLink>
              <NavLink as={Link} to="/ppc-services">PPC</NavLink>
              <Link className="mx-2 btn btn-blue" to="/requestquote">Contact Us</Link>
            </Nav>


          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  );
}

export default Header;
