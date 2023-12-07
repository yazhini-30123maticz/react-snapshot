import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery'
import { isEmpty } from '../config/common';
import { subscribesave } from '../api/api';
// Layouts
import '../assets/css/home.css'
import Header from "../layouts/Header";
import Footer from '../layouts/footer';
import Meta from "../layouts/metatags";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Seo() {

  const [count, setCount] = useState({});
  const [errors, setError] = useState()
  const [success, setsuccess] = useState("")
  const[initial,setinitial]=useState(false)

  const changefn = (event) => {
    setError({})
    const name = event.target.name;
    setCount({
      ...count,
      [name]: event.target.value
    });
  }


  useEffect(()=>{
  
    setinitial(true)

},[])

  const validation = async () => {
    let errors = {};
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (isEmpty(count?.email)) {
      errors.email = "Email field is required";
    } else if (!emailReg.test(count?.email)) {
      errors.email = "Invalid Email";
    }
    return errors
  }

  const onSubmit = async (event) => {
    var val = await validation();
    if (!isEmpty(val)) {
      setError(val)
    }
    else {
      var subscribe = await subscribesave(count)
      if (subscribe.status == true) {
        setCount({email:""})
        setsuccess("Email added successfully")
        setTimeout(() => {
          setsuccess("")
        }, 4000);
        // toast.success(" Email added successfully")
      }
      else {
        setError({email : "Already subcribed"} )
      }
    }
  };

  const carouselRef = useRef(null);
  const [selectedindex, setSelectedindex] = useState();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  // const [currentSlide1, setCurrentSlide1] = React.useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [servicedata, setServicedata] = useState([
    {
      headtitle: "On-Page SEO",
      para: "We offer on-page services like creating optimized headlines, HTML tags, and content to increase the online visibility and traffic of your website. ",
      value1: "On-Page Optimization",
      value2: "SEO Site Auditn",
      value3: "Keyword Researchn",
      value4: "Link Building",
      value5: "Local SEO",
      value6: "Enterprise SEO",

    },
    {
      headtitle: "Off-Page SEO",
      para: "Our team keeps a close watch on your backlink profile and works on authentic and qualified backlinks to make your website appear on the first page of search results.",
      value1: "Social Media Advertising",
      value2: "Social Media Design",
      value3: "Strategy Developmenn",
      value4: "Community Management",
      value5: "Influencer Marketing",
      value6: "Social Media Monitoring",
    },
    {
      headtitle: "Technical SEO",
      para: "We have a passionate team to make your website compatible with search engine guidelines and improve site speed and sitemap status to avoid glitches while crawling it.",
      value1: "Google Search Ads",
      value2: "Display Advertising",
      value3: "Programmatic Advertising",
      value4: "Youtube Advertisingn",
      value5: "Paid Social Advertising",
      value6: "Remarketing Strategy",
    },
    {
      headtitle: "Local SEO Services",
      para: "As a leading local SEO company, we offer local SEO services including optimizing high-intent keywords and managing GMB to build an online reputation and following for local businesses. ",
      value1: "Content Strategy Development",
      value2: "Content Creationn",
      value3: "Content Distribution",
      value4: "Analytics Tracking",
      value5: "Content Audit",
      value6: "Influencer Marketing"
    },
    {
      headtitle: "International SEO ",
      para: "Our SEO consultants optimize your websites to get organic traffic and reach audiences from diverse geographic locations, thereby increasing your customer base.",
      value1: "UI/UX Design",
      value2: "CMS Development",
      value3: "Wordpress Development",
      value4: "Web Application Development",
      value5: "E-commerce Development",
      value6: "Maintenance and Support"
    },
    {
      headtitle: "eCommerce SEO",
      para: "To get more traffic for your e-commerce business and make it the best-ranked page on the search engine result pages, we implement innovative e-commerce SEO strategies like improving web pages, product descriptions, and blogs.",
      value1: "Marketing Automationn",
      value2: "Email Copywriting",
      value3: "Email Template Design",
      value4: "Email Campaigns Management",
      value5: "Lead Nurture Email Marketing",
      value6: "Email A/B Testing"
    },
    {
      headtitle: "Link Building",
      para: "We build links with authenticated and high-quality websites, along with business directories and forums, to rank your page higher in search results.",
      value1: "Brand Enhancement",
      value2: "Online Review Management",
      value3: "Online Reputation Monitoring",
      value4: "Business Listings",
      value5: "Crisis Management",
      value6: "Enterprise Reputation Management"
    },
    {
      headtitle: "SEO Audit",
      para: "We provide comprehensive SEO auditing services to resolve technical SEO, on-page, and website structure issues and analyze how well your website works. Get a free SEO audit now.",
      value1: "Keyword Research &amp;",
      value2: "Title and Description",
      value3: "Icon and Screenshots",
      value4: "App Localization",
      value5: "User Review Management",
      value6: "Monitoring &amp; Reporting"
    },
    {
      headtitle: "Keyword Analysis",
      para: "Following the right keyword analysis strategy results in high visibility of your product or service. Our talented professionals do research and plan proper keywords according to your content.",
      value1: "Keyword Research &amp;",
      value2: "Title and Description",
      value3: "Icon and Screenshots",
      value4: "App Localization",
      value5: "User Review Management",
      value6: "Monitoring &amp; Reporting"
    },
  ])


  const options = {
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
  const options1 = {
    margin: 30,
    responsiveClass: true,
    nav: false,
    dots: false,
    autoplay: false,
    smartSpeed: 1000,
    mouseDrag: false,
    navText: ["", "<div id='next-slide-services' class='nextslide_services'> <i class='fa fa-long-arrow-right'></i></div>"],
    responsive: {
      0: {
        items: 1,
      }


    },
  };
  const handleSlideChange = event => {
    setSelectedindex(event.item.index);
  };
  const handleNextSlide = () => {

    if(currentSlide == 8) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
    
    // setCurrentSlide1(currentSlide1 + 1);
    setFadeIn(true);
  };
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  
  return (
    <div className='homepage seo_page'>
      <Header />
      <Meta />
      <div className="home_div bg_index">
        <div className="banner_sec">
          <div className="banner_height">
            <div className="container custom_container">
              <div className="row banner_row">
                <div className="col-lg-6">
                  <h1 className="banner_title">
                  Best <span className="banner_line">SEO
                      <div className="banner_line_img">
                        <img src={require("../assets/images/Home/banner_line.webp")} className="img-fluid banner_lines" alt="banner_line" width="100%" height="100%" />
                      </div>
                      <div className="hash_img">
                        <img src={require("../assets/images/Home/hash.webp")} className="img-fluid hash_imgs" alt="hash_img" width="100%" height="100%"  />
                      </div>
                    </span><br />
                   Services</h1>
                  <p className="banner_desc">NounQ is the best SEO services company that provides long-term results to boost your search engine ranking and a range of cost-efficient packages to fit businesses of all sizes. </p>
                  <div className="btnsec">
                    <Link type="button" id="contact_btn" to="/requestquote" className="btn btn-blue">Contact Us</Link>
                    <Link className="mx-2 btn btn-outline" to="/requestquote">Get a Proposal</Link>
                  </div>
                </div>
                <div className="col-lg-6 rightsec">
                  <img src={require("../assets/images/seo/best-seo-services.webp")} className="img-fluid banner_img" alt="best-seo-services"  width="100%" height="100%" />
                  <img src={require("../assets/images/Home/fb.webp")} className="img-fluid fb_img" alt="fb_img" width="100%" height="100%"  />
                  <img src={require("../assets/images/Home/instagram.webp")} className="img-fluid insta_img" alt="insta_img" width="100%" height="100%"  />
                  <img src={require("../assets/images/Home/twitter.webp")} className="img-fluid twitter_img" alt="twitter_img" width="100%" height="100%"  />

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sec_1 py-5">
          <div className="container custom_container">
            <div className="row align_itms row_2_order">
              <div className="col-lg-6">
                <img src={require("../assets/images/Home/sec1.webp")} className="img-fluid banner_img" alt="banner" width="100%" height="100%" />
              </div>
              <div className="col-lg-6">
                <h2 className="sec_title">Top SEO Company in India</h2>
                <p className="sec_desc">Search engine optimization is a traffic-generating tool for your websites and pages. The more traffic your site gets, the more search engines rank your pages higher. SEO is an effective way if you are looking to grow your revenue. NounQ is the Best SEO company that provides white-label SEO services to bring your business to the top positions on the various search engines that drive huge traffic to your website and more downloads to your app. </p>
                <p className="sec_desc">At NounQ, our SEO team analyze every client's unique business needs and come up with a strong seo strategy that helps grow your organic traffic and bring huge revenue to your business. Before framing a suitable SEO strategy, we analyze the market status and get to know your competitors, which helps outshine your business in this highly competitive market. </p>
                <div className="btnsec mt-4">
                <Link type="button" id="contact_btn" to="/requestquote" className="btn btn-blue">Contact Us</Link>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="services_sec py-5">
          <div className="container custom_container">
            <h2 className="sec_title">SEO Services</h2>
            <p className="sec_desc">If you want your site to get noticed and increase traffic, then you are in the right place. NounQ is an all-in-one destination for all your SEO and marketing needs. </p>
            <div className="desktop-view d-none d-xl-block">
            <div className='arrow_sec ' onClick={handleNextSlide}>
              <i class="fa fa-long-arrow-right"></i>
              </div>
              {initial  ?    <OwlCarousel className='owl-theme' id="owl_services" loop margin={10} nav 
             startPosition={currentSlide}
              {...options1}>
                {servicedata.map((e, i) => (

                  <div className= {fadeIn ? "item fade_effect" : "item"}>
                    <div className="services_card">
                      <div className="row">
                        <div className="col-lg-4">
                          <p className="sec_head">{e.headtitle}</p>
                        </div>
                        <div className="col-lg-8 rightsec">
                          <div className="row firstsec">
                            <p className="sec_desc">{e.para}</p>
                            <div className="btnsec mt-2">
                              <button type="button" className="btn btn-blue">Learn More</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="number_sec">
                        <p>{i + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>:<></>}
            </div>
            <div className="mobile-view d-block d-xl-none">
  

                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-12">
                      <p className="sec_head">  <div className="number_sec">
                      <p>1</p>
                    </div>On-Page SEO</p>
                    </div>
                    <div className="col-12 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">We offer on-page services like creating optimized headlines, HTML tags, and content to increase the online visibility and traffic of your website.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div></div>
                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">
                      <div className="number_sec">
                      <p>2</p>
                    </div>Off-Page SEO</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our team keeps a close watch on your backlink profile and works on authentic and qualified backlinks to make your website appear on the first page of search results.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div></div>
                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head"> <div className="number_sec">
                      <p>3</p>
                    </div>Technical SEO</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">We have a passionate team to make your website compatible with search engine guidelines and improve site speed and sitemap status to avoid glitches while crawling it</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div></div>
                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head"><div className="number_sec">
                      <p>4</p>
                    </div>Local SEO Services</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">As a leading local SEO company, we offer local SEO services including optimizing high-intent keywords and managing GMB to build an online reputation and following for local businesses. </p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div></div>
                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head"> <div className="number_sec">
                      <p>5</p>
                    </div>International SEO </p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our SEO consultants optimize your websites to get organic traffic and reach audiences from diverse geographic locations, thereby increasing your customer base. </p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div></div>
                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">
                      <div className="number_sec">
                      <p>6</p>
                    </div>eCommerce SEO </p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">To get more traffic for your e-commerce business and make it the best-ranked page on the search engine result pages, we implement innovative e-commerce SEO strategies like improving web pages, product descriptions, and blogs.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div></div>
                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head"><div className="number_sec">
                      <p>7</p>
                    </div>Link Building</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">We build links with authenticated and high-quality websites, along with business directories and forums, to rank your page higher in search results. </p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
              
                </div></div>
                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">
                      <div className="number_sec">
                      <p>8</p>
                    </div>SEO Audit</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">We provide comprehensive SEO auditing services to resolve technical SEO, on-page, and website structure issues and analyze how well your website works. Get a free SEO audit now.
</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div></div>
                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">
                      <div className="number_sec">
                      <p>9</p>
                    </div>Keyword Analysis</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Following the right keyword analysis strategy results in high visibility of your product or service. Our talented professionals do research and plan proper keywords according to your content.
</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div></div>
          
            </div>

            <div className="row select_sec">
              <div className="col-12 leftsec">

                <div className="row">
                  {servicedata.map((e, i) => (
                    <div className="col-lg-4">

                      <ul id="scroll_ul_list" >

                        {i == currentSlide ?
                          <li className='activelist'>{e.headtitle}</li> :
                          <li onClick={() => setCurrentSlide(i)}>{e.headtitle}</li>}


                      </ul>
                    </div>
                  ))}
                </div>

              </div>
              
            </div>

          </div>
        </div>
        <div className="sol_sec py-5">
          <div className="container custom_container">
            <div className="row">
              <h2 className="sec_title">Why Invest in Our SEO Marketing Services?</h2>
              <p className="sec_desc">Search engine optimization creates brand awareness that helps build a loyal customer base. The more authenticity and visibility your brand gets, the higher your ROI will be. For those who are looking to achieve long-term success in their business, Our full stack SEO services is the go-to option, no matter what their business streams are. Here are the numbers that make you believe in us.
              </p>
            </div>
          </div>
          <div className="bg_sol">
            <div className="container custom_container">
              <div className="row bg_sol_row">
                <div className="sol-card">
                  <div className="extra_card orange_clr">
                    <div className="leftsec ">
                      <p>10M +</p>
                    </div>
                    <div>
                      <p className="title">Organic Traffic Generated</p>
                      <div className="text_line"></div>
                      <div className="text_line"></div>

                    </div>

                  </div>
                  <div className="extra_card red_clr">
                    <div className="leftsec">
                      <p>50k +</p>
                    </div>
                    <div>
                      <p className="title">Keywords Ranked in Top3 Positions</p>
                      <div className="text_line"></div>
                      <div className="text_line"></div>

                    </div>

                  </div>
                  <div className="extra_card blue_clr">
                    <div className="leftsec ">
                      <p>300%</p>
                    </div>
                    <div>
                      <p className="title">Increase In Organic Leads & Conversions</p>
                      <div className="text_line"></div>
                      <div className="text_line"></div>
                    </div>

                  </div>
                  <div className="extra_card green_clr">
                    <div className="leftsec ">
                      <p>250k+</p>
                    </div>
                    <div>
                      <p className="title">Quality Backlinks Generated</p>
                      <div className="text_line"></div>
                      <div className="text_line"></div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
        <div className="mark_sec">
          <div className="container custom_container">
            <div className="row">
              <h2 className="sec_title">Search Engine Optimization SEO Tools We Master</h2>
              <p className="sec_desc">As a top search engine optimization company we utilize a combination of various seo marketing tools that enhances our seo services.</p>
            </div>
            <div className="row">
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/AdobeAnaly.webp")} className="img-fluid client_img" alt="AdobeAnaly" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/Ahrefs.webp")} className="img-fluid client_img" alt="Ahrefs" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/canva.webp")} className="img-fluid client_img" alt="canva" width="100%" height="100%"  />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/Google.webp")} className="img-fluid client_img" alt="Google" width="100%" height="100%"  />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/Spyfu.webp")} className="img-fluid client_img" alt="Spyfu" width="100%" height="100%"  />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/google-search-console.webp")} className="img-fluid client_img" alt="google-search-console" width="100%" height="100%"  />
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/GoogleTrends.webp")} className="img-fluid client_img" alt="GoogleTrends" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/MajesticSEO.webp")} className="img-fluid client_img" alt="MajesticSEO" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/moz.webp")} className="img-fluid client_img" alt="moz" width="100%" height="100%" />

                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/yoast-seo.webp")} className="img-fluid client_img" alt="yoast-seo" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/Screaming_frog.webp")} className="img-fluid client_img" alt="Screaming_frog" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6   col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/seo/SEMrush.webp")} className="img-fluid client_img" alt="SEMrush" width="100%" height="100%" />
                </div>
              </div>

            </div>
          </div>





        </div>

        <div className="whychoose_sec py-5">
          <div className="container custom_container">
            <div className="row align_itms row_2_order">
              <div className="col-lg-6">
                <img src={require("../assets/images/Home/why_choose.webp")} className="img-fluid banner_img" alt="why_choose" width="100%" height="100%" />
              </div>
              <div className="col-lg-6">
                <h2 className="sec_title">Why Choose NounQ for your Website And App SEO Services</h2>
                <p className="sec_desc">NounQ is one of the most renowned SEO companies in India. We offer top-notch SEO services that steer your business to success. Our young and talented professionals bring innovative SEO strategies that are in line with your target audience, timeframe, and budget.</p>
                <p className="sec_desc">Our dedicated SEO experts offer in-depth reports to give our clients a full overview of how we work on their sites. We work as a team to bring out the best outcomes and are always up-to-date with new techniques and strategies. NounQ can be your connecting bridge to help you reach customers. </p>

                <div className="btnsec mt-4">
                <Link type="button" id="contact_btn" to="/requestquote" className="btn btn-blue">Contact Us</Link>
                  <Link className="mx-2 btn btn-outline" to="/requestquote">Get a Proposal</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clientsec py-5">
          <div class="container custom_container">
            <div class="row clients_card">
              <div class="col-lg-6 leftsec">
                <p class="sec_desc">Happy Clients</p>
                <p class="sec_desc_sec">"A Satisfied Client is the Best Business Strategy of All."</p>
              </div>
              <div class="col-lg-6 rightsec">
              {initial  ?        <OwlCarousel className='owl-theme' loop margin={10} nav {...options}>
                  <div class='item'>
                    <div class="test_card my-4">
                      <p class="main_quote">"Increased our website traffic by 250% within 3 months"</p>
                      <p class="main_desc">We were amazed by the results we got from this agency’s SEO strategies. We saw a 250% increase in our website traffic and a significant boost in our sales.</p>
                      <div class="pf_sec mb-4">
                        <div>
                          <img src={require("../assets/images/Home/pf2.webp")} class="img-fluid profile_img" alt="pf_img " width="100%" height="100%" />
                        </div>
                        <div>
                          <p class="pf_name">Jessica Foltz</p>
                          <p class="pf_name">VP of Marketing</p>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="item">
                    <div class="test_card my-4">
                      <p class="main_quote"> "Expertly crafted social media campaigns"</p>
                      <p class="main_desc">Thanks to their expertise. This agency truly knows how to create and manage various social media campaigns that attract and engage audiences.</p>
                      <div class="pf_sec mb-4">
                        <div>
                          <img src={require("../assets/images/Home/pf4.webp")} class="img-fluid profile_img" alt="pf_img " width="100%" height="100%" />
                        </div>
                        <div>
                          <p class="pf_name">Tim Vance</p>
                          <p class="pf_name"> Creative Director</p>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="item">
                    <div class="test_card my-4">
                      <p class="main_quote">"Amazing ROI on our PPC Campaigns"</p>
                      <p class="main_desc">We were unsure to invest in PPC advertising but this expert team has delivered exceptional results. We have generated 375% increase in ROI from google ad spend
                      </p>
                      <div class="pf_sec mb-4">
                        <div>
                          <img src={require("../assets/images/Home/pf6.webp")} class="img-fluid profile_img" alt="pf_img " width="100%" height="100%" />
                        </div>
                        <div>
                          <p class="pf_name">Brent Massey</p>
                          <p class="pf_name">CEO, Law Firm</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </OwlCarousel> : <></>}


              </div>
            </div>
          </div>

        </div>
        <div className="trusted_sec">
          <div className="container custom_container">
            <div className="row firstrow">
              <p className="sec_title">Trusted by the Greatest</p>
            </div>

            <div className="row sec_row">
              <img src={require("../assets/images/Home/client1.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%"  />
              <img src={require("../assets/images/Home/client2.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />
              <img src={require("../assets/images/Home/client3.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />
              <img src={require("../assets/images/Home/client4.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />
              <img src={require("../assets/images/Home/client5.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />
              <img src={require("../assets/images/Home/client6.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />

            </div>

          </div>
          <div className="third_row">
            <div className="inside_row">
              <p className="sec-title">Boost Your Organic Traffic and Generate Huge Revenue With Our SEO Services</p>
              <div className="btnsec mt-4">
              <Link type="button" id="contact_btn" to="/requestquote" className="btn btn-blue">Contact Us</Link>
              <Link className="mx-2 btn btn-outline" to="/requestquote">Get a Proposal</Link>
              </div>
            </div>
          </div>
        </div>




        <div className="rewards_sec py-5">
          <h2 className="sec_title">Awards & Recognitions</h2>
          <p className="sec_desc">We have been recognized and awarded as the top SEO company, Best SEO services provider on various journals, magazines etc.</p>
          <div className="row rew_row">
            <div className="col-lg-4 mb-4">
              <img src={require("../assets/images/Home/reward1.webp")} className="img-fluid reward_img" alt="reward_img" width="100%" height="100%" />
            </div>
            <div className="col-lg-4 mb-4">
              <img src={require("../assets/images/Home/reward2.webp")} className="img-fluid reward_img" alt="reward_img" width="100%" height="100%" />
            </div>
            <div className="col-lg-4 mb-4">
              <img src={require("../assets/images/Home/reward3.webp")} className="img-fluid reward_img" alt="reward_img" width="100%" height="100%" />
            </div>
          </div>

        </div>
        {/* <div className="blog_sec">
  <div className="container custom_container">
  <h2 className="sec_title">Blog</h2>
  <p className="sec_desc">As a best-in-class Digital Marketing Agency, We build unique marketing strategies using various tools for our clients to build a stronger and a profitable online presence.</p>
  <div className="row my-4">
    <div className="col-lg-4 mb-4">
      <div className="blogcard">
        <img src="../assets/images/homepage/blog_img.webp" className="img-fluid blog_img" alt="blog_img" />
        <p className="card_title">As a best-in-class Digital Marketing Agency</p>
        <p className="card_desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequatur quae quo facilis error.</p>

      </div>
    </div>
    <div className="col-lg-4 mb-4">
      <div className="blogcard">
        <img src="../assets/images/homepage/blog_img.webp" className="img-fluid blog_img" alt="blog_img" />
        <p className="card_title">As a best-in-class Digital Marketing Agency</p>
        <p className="card_desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequatur quae quo facilis error.</p>

      </div>
    </div>
    <div className="col-lg-4 mb-4">
      <div className="blogcard">
        <img src="../assets/images/homepage/blog_img.webp" className="img-fluid blog_img" alt="blog_img" />
        <p className="card_title">As a best-in-class Digital Marketing Agency</p>
        <p className="card_desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequatur quae quo facilis error.</p>
       

      </div>
    </div>
  </div>
  <div className="btnsec">
    <button type="button" className="btn btn-blue">See More</button>
    </div>
</div>

</div>  */}

        <div className="news_sec py-3">
          <div className="container custom_container">
            <div className="row news_row py-4">
              <img src={require("../assets/images/Home/mail.webp")} className="img-fluid news_img" alt="mail" width="100%" height="100%" />
              <p className="sec_desc">Subscribe to our Newsletter to get all the updates</p>
              <div className="input_sec">
                <p className="input_label">Enter your email here : *</p>
                <div className="input-group mb-3">

                  <input id="newsletter" type="text" name="email" className="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" value={count?.email || ''} onChange={(event) => changefn(event)} />

                  <div className="input-group-append">
                    <button type="button" className="btn btn-primary" name="subscribe" id="NewsletterSubmit" onClick={(event) => onSubmit(event)}>Subscribe</button>
                   
                  </div>
                  

                </div>
                {success=="" ? <></> :<p class="text-success text-center" id="req_sumbit_success_msg_contact">{success}</p>}
                <p className="Newsletter-error" style={{ color: "red" }}>{errors && errors.email}</p>
                <div>
                  <p className="text-success d-none text-left" id="News_sumbit_suc_msg">Subscribed for
                    Newsletter</p>


                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="faq_sec py-5">
          <div className="container custom_container">
            <div className="row faq_first_row">
              <h2 className="sec_title">FAQ</h2>
              <p className="sec_desc">We are happy to answer the frequent questions that are asked by our previous clients.</p>
            </div>

            <div className="accordion" id="accordionExample">
              <div className="row">
                <div className="col-lg-6">

                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i className="fa fa-question-circle"></i> What is an SEO company?
                      </button>
                    </h3>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      An SEO company offers search engine optimization as a service, which includes on-page, off-page, and technical optimizations to increase visibility and traffic.
                      </div>

                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <i className="fa fa-question-circle"></i>  How much does SEO cost in India?
                      </button>
                    </h3>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      The cost of SEO in India is between INR 5000 and INR 25000 per month. It may vary based on keyword complexity, business type, and geolocation.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <i className="fa fa-question-circle"></i>  What are SEO services?
                      </button>
                    </h3>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      SEO services are solutions offered by SEO agencies and consultants to capture revenue from searches while saving time and money 
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingFour">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        <i className="fa fa-question-circle"></i> What are SEO services and types?
                      </button>
                    </h3>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      There are different SEO services, such as on-page SEO, off-page SEO, technical SEO, link building, keyword research, and many others. 
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">

                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingFive">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        <i className="fa fa-question-circle"></i> How much does it cost for SEO?
                      </button>
                    </h3>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      It costs $1500 to $5000 per month for SEO, which may vary depending on the SEO provider, business size, and scope of the project.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingSix">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                        <i className="fa fa-question-circle"></i> Why is SEO needed for B2B? 
                      </button>
                    </h3>
                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      SEO is an effective marketing strategy for B2B. It improves their domain authority and quality sales leads. B2B needs SEO to cut costs spent on ads and make a place for themselves in the highly saturated market. 
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingSeven">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                        <i className="fa fa-question-circle"></i> Who is the No. 1 SEO expert in India?
                      </button>
                    </h3>
                    <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      NounQ is the No. 1 SEO expert in India and is best specialized in providing tried and true SEO services for startups and well-established companies. 
                        
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingEight">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                        <i className="fa fa-question-circle"></i>  Why do small businesses need SEO?
                      </button>
                    </h3>
                    <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      Small businesses that cannot afford much to build an online reputation need SEO to increase their brand awareness and visibility among their target audience.
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>





      <Footer />


    </div>
  );
}

export default Seo;