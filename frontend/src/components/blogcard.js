import React , { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from "react-router-dom";
import config from '../config/config';
function Blogcard(props) {
  const { state } = props;
  




    const [blogcard, setBlogcard] = useState([
        {
            blogimg: require('../assets/images/blog/blogimage.webp'),
            blogcategory: "NOUNQ",
            blogtitle: "5 Tech Trends That Drive Digital Acceleration in 2023",
           
          },
          {
            blogimg: require('../assets/images/blog/blogimage.webp'),
            blogcategory: "NOUNQ",
            blogtitle: "To Hell With Normal. Volatile Markets Create Lasting Opportunities",
           
          },
          {
            blogimg: require('../assets/images/blog/blogimage.webp'),
            blogcategory: "NOUNQ",
            blogtitle: "Business Ethics After 2022: An Interview With Netguru’s Sustainability Lead ",
           
          },
    
    ])
    const options2 = {
        margin: 30,
        responsiveClass: true,
        nav: true,
        navText:["<div class='nav-btn prev-slide'> <i class='fa fa-angle-left' aria-hidden='true'></i> </div>","<div class='nav-btn next-slide'> <i class='fa fa-angle-right' aria-hidden='true'></i> </div>"],
        dots: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
          0: {
            items: 1,
          },
          400: {
            items: 1,
          },
          600: {
            items: 1,
          },
          700: {
            items: 1,
          },
          992: {
            items: 3,
    
          }
        },
      };
    return (
        <div>
               <OwlCarousel className='owl-theme' id="owl_services1" loop margin={10} nav {...options2}>
               {props?.state?.Blogs?.map((val, i) => (
               <div className="item">
            <div className='row'>
                        <div className='col-12'>
             <div className='blog_card'>
             
             <Link className="linkclass" to={`/${val?.slug}`}><img src={`${config.Image_URL}admin/images/blog/${val?.image}`} width="100%" className='blog_card_img'/></Link>
             {/* <Link className="linkclass" to={`/${val?.slug}`}><p className='card_title'>{props?.state?.category_name}</p></Link> */}
             <Link className="linkclass" to={`/${val?.slug}`}><p className='card_desc'>{val?.title}</p></Link>
                        </div>
        </div>
        </div>
        </div>
               ))}
        </OwlCarousel>
                    </div>
    );
}

export default Blogcard;