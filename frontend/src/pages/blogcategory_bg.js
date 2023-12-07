import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link} from "react-router-dom";
import Header from "../layouts/Header";
import Footer from '../layouts/footer';
import "../assets/css/styles.css"
import Blogcard from '../components/blogcard';

function Blogcategory() {
    const [blogtopcard, setBlogtopcard] = useState([
        {
            cardtitle:"Innovation",
            carddesc:"Ideas, solutions, and experiments to help you reinvent your business",
            titlecolor:"#000"
        },
        {
            cardtitle:"Market Insights",
            carddesc:"Business strategies from a company that grows 100% YoY",
            titlecolor:"#fff"
        },
        {
            cardtitle:"Product Mindset",
            carddesc:"Proven ways for delivering value to the users and building market winning products."
        },
        {
            cardtitle:"Technology",
            carddesc:"Stories about code and how it's changing the world for better"
        },
        {
            cardtitle:"Design",
            carddesc:"The art of creating engaging digital experiences"
        },
        {
            cardtitle:"Culture",
            carddesc:"Tips on how to build a collaborative and inclusive workplace"
        },
       
    ])
    const [blogcategory, setBlogcategory] = useState([
        {
            order:"01",
            heading:"Nounq",
            loadmore:"See More Stories"
        },
        {
            order:"02",
            heading:"Nounq",
            loadmore:"See More Stories"
        },
        {
            order:"03",
            heading:"All Blogs",
            loadmore:"See More Blog"
        },
        
    ])
    const [blogrecent, setBlogrecent] =useState([
        {   
            blogimg: require('../assets/images/blog/blogimage.webp'),
            blogcategory:"Innovation",
            blogtitle:"Disruption Insights: Make Users the Final Judges of Your Idea"
        },
        {   
            blogimg: require('../assets/images/blog/blogimage.webp'),
            blogcategory:"Innovation",
            blogtitle:"Disruption Insights: Make Users the Final Judges of Your Idea"
        },
        {
            blogimg: require('../assets/images/blog/blogimage.webp'),
            blogcategory:"Innovation",
            blogtitle:"Disruption Insights: Make Users the Final Judges of Your Idea"
        }
    ])
    const [trendcard, setTrendcard] =useState([
        {   
            trendimg: require('../assets/images/blog/trendsec.webp'),
            trendcategory:"Nounq",
            trendtitle:"Discover more than 800 free TV channels with Google TV"
        },
        {   
            trendimg: require('../assets/images/blog/trendsec.webp'),
            trendcategory:"Nounq",
            trendtitle:"Discover more than 800 free TV channels with Google TV"
        },
         {   
            trendimg: require('../assets/images/blog/trendsec.webp'),
            trendcategory:"Nounq",
            trendtitle:"Discover more than 800 free TV channels with Google TV"
        },
        {   
            trendimg: require('../assets/images/blog/trendsec.webp'),
            trendcategory:"Nounq",
            trendtitle:"Discover more than 800 free TV channels with Google TV"
        },
    ])
    const options3 = {
        margin: 30,
        responsiveClass: true,
        nav: false,
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
          1000: {
            items: 1,
    
          }
        },
      };
    return (
        <div>
            <div className='blogpage'>
            <Header/>
             <div className='container'>
                <div className='top_sec'>
                <div className='row first_row'>
                    <h1 className='head_title'>Fuel for your<span>Nounq</span> </h1>
                    <p className='head_desc'>Opinions, tips, and latest news on software, technology, design, and<br/>
                     business for innovators like you.</p>
                </div>
                <div className='row mb-4'>
                {blogtopcard.map((e,titlecolor) => (
                    <div className='col-lg-4 mb-4'>
                        <div className='blog_top_card'>
                            <h2 className='card_title' style={{color:{titlecolor}}}>{e.cardtitle}</h2>
                            <p className='card_desc'>{e.carddesc}</p>
                            <Link className="linkclass" to="/about">Read Magazine</Link>
                      </div>
                    </div>
                ))}

                </div>
                </div>
                </div>
                <div className='trend_sec'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-8 leftsec'>
                                <div className='img_sec'>
                                <img className='trend_img' src={require('../assets/images/blog/trendsec.webp')}/>
                                <div className='img_label'>
                                    <p>Trending Blog</p>
                                </div>
                                </div>
                                <div className='row'>
                            <div className='trendleft_card'>
                                <h3 className='card_mini_title'>Nounq</h3>
                                <h2 className='card_title'>Ask a Techspert: What is generative AI?</h2>
                                <p className='card_desc'>A Google AI expert answers common questions about generative AI, large language models, machine learning and more.</p>

                            </div>
                        </div>
                            </div>
                          
                            <div className='col-lg-4 rightsec mt-4'>
                                <div className='row'>
                                
                                    <div className='col-lg-12'>
                                    <OwlCarousel className='owl-theme' id="owl_services" loop margin={10} nav {...options3}>
                                    {trendcard.map((e) => (
                                        <div className='item'>
                                            
                                     <div className='row'>
                                    <div className='col-12'>
                                <div className='trend_right_card'>
                                <img className='trend_img' src={e.trendimg}/>
                                <h3 className='card_mini_title'>{e.trendcategory}</h3>
                                <h2 className='card_title'>{e.trendtitle}</h2>

                                </div>
                                </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                <div className='trend_right_card'>
                                <img className='trend_img' src={e.trendimg}/>
                                <h3 className='card_mini_title'>{e.trendcategory}</h3>
                                <h2 className='card_title'>{e.trendtitle}</h2>

                                </div>
                                </div>
                                </div>
                                </div>    ))}

                                        </OwlCarousel>
                                    </div>
                            
                                </div>
                           
                                 {/* <OwlCarousel className='owl-theme' id="owl_services" loop margin={10} nav {...options3}>
                                
                                <div className='row mb-4'>
                                {trendcard.map((e) => (
                                    <div className='col-12'>
                                <div className='trend_right_card'>
                                <img className='trend_img' src={e.trendimg}/>
                                <h3 className='card_mini_title'>{e.trendcategory}</h3>
                                <h2 className='card_title'>{e.trendtitle}</h2>

                                </div>
                                </div>
                                 ))}
                                </div>
                                
                                </OwlCarousel> */}
                          
                            
                            </div>
                             
                        
                        </div>
                      
                    </div>
                </div>
                 <div className='recent_blog'>
                    <div className='container'>
                    <div className='row'>
                        <h2 className='sec_title'>Recent Blog's</h2>
                    </div>
                    <div className='row'>
                    {blogrecent.map((e,titlecolor) => (
                        
                    <div className='col-lg-4'>
                    <div className='blog_card'>
             
             <img src={e.blogimg} width="100%" className='blog_card_img'/>
             <p className='card_title'>{e.blogcategory}</p>
             <p className='card_desc'>{e.blogtitle}</p>
         </div>
                    </div>
                    ))}
                    </div>
                    </div>
                 </div>


                   <div className='container'>
                {blogcategory.map((e) => (
                <div className='blog_category_list'>
                    
                    <div className='row mb-4'>
                        <div className='category_heading'>
                        <p className='category_title'> <span className='category_order'>{e.order}</span>{e.heading}</p>
                       
                        </div>
                     
                    </div>

                    <div className='blog_slide'>
                       <Blogcard/>
                       </div>
                       <div className='btnsec'>
                       <Link className="linkbtn" to="/about">{e.loadmore} <i class="fa fa-solid fa-arrow-right"></i></Link>
                       </div>
                </div>
                ))}
                </div>

               <div className='ad_banner_sec'>
                    <div className='container'>
                    <div className='ad_banner'>
                        <div className='row ad_row'>
                            <div className='col-lg-4'>
                               <img src={require('../assets/images/blog/ad_banner.webp')} width="280px" height="220px"/>
                            </div>
                            <div className='col-lg-6 rightsec'>
                                  <p className='headtitle'>Get the Latest news from <span>NOUNQ</span> in your inbox.</p>
                                  <form>
                                    <div className='input_sec'>
  <div class="form-group">
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <button type="button" id="contact_btn" className="btn sub_btn">Subscribe</button>
  </div>
  </form>
                                  <p className='sec_desc'>Your information will be used in accordance with Google's privacy policy.</p>
                                
                                </div>
                        </div>
                    </div>
                </div>
                </div>










            


             <Footer/>





            </div>
        </div>
    );
}

export default Blogcategory;