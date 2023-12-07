import React, { Component ,useState, useEffect } from 'react';
import { useLocation,useHistory} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";
import "../assets/styles/style.css"



function App(props) {


  // console.log = function () { };

// console.log = () => { };
console.debug = () => { };
console.info = () => { };
console.warn = () => { };
  const location = useLocation();
  const [isFullPageLayout,setIsFullPageLayout] = useState(false);
  const [sideBar,setSideBar]  = useState(false);
  const[navbar,setNavbar]=useState(false)

  useEffect(()=>{
    getinit();
  },[location,sideBar,navbar])

  const getinit = ()=>{
    // onRouteChanged();
    hidesidebar();
    hidenavbar()
  
  }


  const hidesidebar =  ()=>{
    if(localStorage.adminlogin || localStorage.adminlogin=="yes"){
      setSideBar(true);
    }else{
      setSideBar(false);
    }
}


const hidenavbar=()=>{

  if(localStorage.adminlogin || localStorage.adminlogin=="yes"){
    setNavbar(true);
  }else{
    setNavbar(false);
  }

}


const onRouteChanged = ()=>{
  // console.log("ROUTE CHANGED");
  const { i18n } = props;
  const body = document.querySelector('body');
  if(location.pathname === '/layout/RtlLayout') {
    body.classList.add('rtl');
    i18n.changeLanguage('ar');
  }
  else {
    body.classList.remove('rtl')
    i18n.changeLanguage('en');
  }
  window.scrollTo(0, 0);
  const fullPageLayoutRoutes = ['/user-pages/Login'];
  for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
    if (location.pathname === fullPageLayoutRoutes[i]) {
    
        setIsFullPageLayout(true)
      document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
      break;
    } else {
      
        setIsFullPageLayout(true)
      
      document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
    }
  }
}

let navbarComponent = isFullPageLayout ? <Navbar/> : '';
let sidebarComponent = isFullPageLayout ? <Sidebar/> : '';
let footerComponent = isFullPageLayout ? <Footer/> : '';

return (
  <div className="container-scroller">
  {sideBar && <Sidebar/>}
    <div className="container-fluid page-body-wrapper">
    {navbar && <Navbar/>}
      <div className="main-panel">
        <div className="content-wrapper">
          <AppRoutes/>
        </div>
        { footerComponent }
      </div>
    </div>
  </div>
);

}



export default withTranslation()(withRouter(App));
