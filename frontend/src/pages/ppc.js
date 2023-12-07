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

function PPC() {

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
      headtitle: "Google Search Advertising ",
      para: "Our PPC marketers promote your content in search engine results using a keyword-based strategy. We offer Google Search ads with high-quality keywords that are suitable for multi-location brands. ",
      value1: "On-Page Optimization",
      value2: "SEO Site Auditn",
      value3: "Keyword Researchn",
      value4: "Link Building",
      value5: "Local SEO",
      value6: "Enterprise SEO",

    },
    {
      headtitle: "Social Media Advertising ",
      para: "Our social media advertising services include creating paid ad campaigns, such as static and dynamic ads, for social media platforms to improve brand visibility, sales of products, and conversion rates.",
      value1: "Social Media Advertising",
      value2: "Social Media Design",
      value3: "Strategy Developmenn",
      value4: "Community Management",
      value5: "Influencer Marketing",
      value6: "Social Media Monitoring",
    },
    {
      headtitle: "Youtube Advertising",
      para: "Our PPC company employs unique strategies in YouTube ads to reach a diverse audience. Its advanced features let you choose between pricing models like CPV or CPE and set channel keywords, format, etc.",
      value1: "Google Search Ads",
      value2: "Display Advertising",
      value3: "Programmatic Advertising",
      value4: "Youtube Advertisingn",
      value5: "Paid Social Advertising",
      value6: "Remarketing Strategy",
    },
    {
      headtitle: "Display Advertising",
      para: "Digital advertising includes creating digital ads like personalized and site-placed ads using text, images, and videos with stunning visuals that are in line with your web pages.",
      value1: "Content Strategy Development",
      value2: "Content Creationn",
      value3: "Content Distribution",
      value4: "Analytics Tracking",
      value5: "Content Audit",
      value6: "Influencer Marketing"
    },
    {
      headtitle: "Remarketing Ads",
      para: "Our PPC specialists reconnect with potential customers who have already shown interest in a company’s service or product using the remarketing approach and engaging PPC ads made out of digital analytics. ",
      value1: "UI/UX Design",
      value2: "CMS Development",
      value3: "Wordpress Development",
      value4: "Web Application Development",
      value5: "E-commerce Development",
      value6: "Maintenance and Support"
    },
    {
      headtitle: "Landing Page Creation & Optimization ",
      para: "We create and optimize PPC landing pages with high-volume keywords, catchy taglines, quality content, and clear-cut calls to action to convert visitors into customers.",
      value1: "Marketing Automationn",
      value2: "Email Copywriting",
      value3: "Email Template Design",
      value4: "Email Campaigns Management",
      value5: "Lead Nurture Email Marketing",
      value6: "Email A/B Testing"
    },
    {
      headtitle: "PPC Campaign Audit",
      para: "Our PPC company provides comprehensive audit services that include analyzing keywords and search terms. We finetune ad extensions like subpages, call buttons, etc, and try out outdated strategies that proved positive results.",
      value1: "Brand Enhancement",
      value2: "Online Review Management",
      value3: "Online Reputation Monitoring",
      value4: "Business Listings",
      value5: "Crisis Management",
      value6: "Enterprise Reputation Management"
    },
    {
      headtitle: "Amazon PPC Advertising",
      para: "Our PPC consultants optimize your PPC bidding strategies, enhance your quality score, and trace ROI for Amazon PPC campaigns. Utilizing paid search advertising services, you can drive traffic to your site and ad extensions and top the search results.",
      value1: "Keyword Research &amp;",
      value2: "Title and Description",
      value3: "Icon and Screenshots",
      value4: "App Localization",
      value5: "User Review Management",
      value6: "Monitoring &amp; Reporting"
    },
    {
      headtitle: "Programmatic Advertising ",
      para: "Get your ads optimized with programmatic technology with our programmatic advertising service. We analyze how your ads are sold based on your advertising campaign and its reach.",
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
    <div className='homepage ppc_page'>
      <Header />
      <Meta />
      <div className="home_div bg_index">
        <div className="banner_sec">
          <div className="banner_height">
            <div className="container custom_container">
              <div className="row banner_row">
                <div className="col-lg-6">
                  <h1 className="banner_title">
                  PPC  <span className="banner_line">Advertising
                      <div className="banner_line_img">
                        <img src={require("../assets/images/Home/banner_line.webp")} className="img-fluid banner_lines" alt="banner_line" width="100%" height="100%"  />
                      </div>
                      <div className="hash_img">
                        <img src={require("../assets/images/Home/hash.webp")} className="img-fluid hash_imgs" alt="hash_img"  width="100%" height="100%" />
                      </div>
                    </span><br />
                   Services</h1>
                  <p className="banner_desc">Wanna convert your website viewers into leads? NounQ is the one-stop PPC company for all your PPC services to maximize your brand recognition and lead generation. </p>
                  <div className="btnsec">
                    <Link type="button" id="contact_btn" to="/requestquote" className="btn btn-blue">Contact Us</Link>
                    <Link className="mx-2 btn btn-outline" to="/requestquote">Get a Proposal</Link>
                  </div>
                </div>
                <div className="col-lg-6 rightsec">
                  <img src={require("../assets/images/ppc/ppc-advertising-services.webp")} className="img-fluid banner_img" alt="ppc-advertising-services" width="100%" height="100%"  />
                  <img src={require("../assets/images/Home/fb.webp")} className="img-fluid fb_img" alt="fb_img" width="100%" height="100%" />
                  <img src={require("../assets/images/Home/instagram.webp")} className="img-fluid insta_img" alt="insta_img" width="100%" height="100%"  />
                  <img src={require("../assets/images/Home/twitter.webp")} className="img-fluid twitter_img" alt="twitter_img" width="100%" height="100%" />

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
                <h2 className="sec_title">Best PPC Agency  </h2>
                <p className="sec_desc">Pay Per Click, one of the most effective digital marketing strategies, is a better alternative to driving website traffic organically. It works wonders for companies that want to position themselves as top brands in a highly competitive market where everyone is looking to maximize their conversion rates and ROI.  </p>
                <p className="sec_desc">NounQ is the Best PPC company that offers strategic PPC advertising services irrespective of your business goals. Our experts are skilled at coming up with myriad PPC advertising ideas to promote your services and products on various platforms. We ensure your ad campaigns get the proper reach and use result-driven techniques for consistent traffic.  </p>
                <div className="btnsec mt-4">
                <Link type="button" id="contact_btn" to="/requestquote" className="btn btn-blue">Contact Us</Link>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="services_sec py-5">
          <div className="container custom_container">
            <h2 className="sec_title">Pay Per Click PPC Services </h2>
            <p className="sec_desc">We at NounQ offer a wide range of PPC services with gripping advertisements that skyrocket your business and multiply your revenue.</p>
            <div className="desktop-view d-none d-xl-block">
            <div className='arrow_sec ' onClick={handleNextSlide}>
              <i class="fa fa-long-arrow-right"></i>
              </div>
              {initial  ?   <OwlCarousel className='owl-theme' id="owl_services" loop margin={10} nav 
             startPosition={currentSlide}
              {...options1}>
                {servicedata.map((e, i) => (

                  <div className= {fadeIn ? "item fade_effect" : "item"}>
                    <div className="services_card">
                      <div className="row">
                        <div className="col-lg-4">
                          <h2 className="sec_head">{e.headtitle}</h2>
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
              </OwlCarousel> : <></>}
            </div>
            <div className="mobile-view d-block d-xl-none">
  

                <div className="item"> <div className="services_card mb-4">
                  <div className="row">
                    <div className="col-12">
                      <p className="sec_head">  <div className="number_sec">
                      <p>1</p>
                    </div>Google Search Advertising </p>
                    </div>
                    <div className="col-12 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our PPC marketers promote your content in search engine results using a keyword-based strategy. We offer Google Search ads with high-quality keywords that are suitable for multi-location brands.</p>
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
                    </div>Social Media Advertising </p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our social media advertising services include creating paid ad campaigns, such as static and dynamic ads, for social media platforms to improve brand visibility, sales of products, and conversion rates.</p>
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
                    </div>Youtube Advertising </p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our PPC company employs unique strategies in YouTube ads to reach a diverse audience. Its advanced features let you choose between pricing models like CPV or CPE and set channel keywords, format, etc.</p>
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
                    </div>Display Advertising</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Digital advertising includes creating digital ads like personalized and site-placed ads using text, images, and videos with stunning visuals that are in line with your web pages.</p>
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
                    </div>Remarketing Ads </p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our PPC specialists reconnect with potential customers who have already shown interest in a company’s service or product using the remarketing approach and engaging PPC ads made out of digital analytics. </p>
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
                    </div>Landing Page Creation & Optimization </p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">We create and optimize PPC landing pages with high-volume keywords, catchy taglines, quality content, and clear-cut calls to action to convert visitors into customers.</p>
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
                    </div>PPC Campaign Audit</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our PPC company provides comprehensive audit services that include analyzing keywords and search terms. We finetune ad extensions like subpages, call buttons, etc, and try out outdated strategies that proved positive results. </p>
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
                    </div>Amazon PPC Advertising</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our PPC consultants optimize your PPC bidding strategies, enhance your quality score, and trace ROI for Amazon PPC campaigns. Utilizing paid search advertising services, you can drive traffic to your site and ad extensions and top the search results.
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
                    </div>Programmatic Advertising </p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Get your ads optimized with programmatic technology with our programmatic advertising service. We analyze how your ads are sold based on your advertising campaign and its reach. </p>
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
              <h2 className="sec_title">Why Invest in Our PPC Marketing Services?</h2>
              <p className="sec_desc">Keyword selection and analysis are more important for your PPC campaign. If you are unsure about how to choose appropriate keywords, you can get assistance from the experts at NounQ. It highly helps you generate high leads and convert potential customers into buyers.PPC is a sure-shot way to multiply the return on investment of your business. It is possible to position your brand at the top of the search results, which earns customer trust, and there is a high chance to expand your business globally.
              </p>
              <p className="sec_desc">
              </p>
            </div>
          </div>
          <div className="bg_sol">
            <div className="container custom_container">
              <div className="row bg_sol_row">
                <div className="sol-card">
                  <div className="extra_card orange_clr">
                    <div className="leftsec ">
                      <p>2M+</p>
                    </div>
                    <div>
                      <p className="title">Revenue Generated</p>
                      <div className="text_line"></div>
                      <div className="text_line"></div>

                    </div>

                  </div>
                  <div className="extra_card red_clr">
                    <div className="leftsec">
                      <p>500K+</p>
                    </div>
                    <div>
                      <p className="title">App Downloads</p>
                      <div className="text_line"></div>
                      <div className="text_line"></div>

                    </div>

                  </div>
                  <div className="extra_card blue_clr">
                    <div className="leftsec ">
                      <p>45+</p>
                    </div>
                    <div>
                      <p className="title">Projects Delivered</p>
                      <div className="text_line"></div>
                      <div className="text_line"></div>
                    </div>

                  </div>
                  <div className="extra_card green_clr">
                    <div className="leftsec ">
                      <p>25+</p>
                    </div>
                    <div>
                      <p className="title">Satisfied Customers</p>
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
              <h2 className="sec_title">Pay Per Click PPC Tools We Master</h2>
              <p className="sec_desc">As a top PPC company we utilize a combination of various PPC marketing tools that enhances our PPC services.</p>
            </div>
            <div className="row">
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/Google.webp")} className="img-fluid client_img" alt="Google" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/Google_ads.webp")} className="img-fluid client_img" alt="Google_ads" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/SEMrush.webp")} className="img-fluid client_img" alt="SEMrush" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/Ahrefs.webp")} className="img-fluid client_img" alt="Ahrefs  " width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/hootsuite.webp")} className="img-fluid client_img" alt="hootsuite" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/buffer.webp")} className="img-fluid client_img" alt="Buffer" width="100%" height="100%" />
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/yoast-seo.webp")} className="img-fluid client_img" alt="client_img" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/mailchimp.webp")} className="img-fluid client_img" alt="mailchimp" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/hubspot.webp")} className="img-fluid client_img" alt="hubspot" width="100%" height="100%" />

                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/moz.webp")} className="img-fluid client_img" alt="moz" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/canva.webp")} className="img-fluid client_img" alt="canva" width="100%" height="100%" />
                </div>
              </div>
              <div className="col-6   col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/google-search-console.webp")} className="img-fluid client_img" alt="google-search-console" width="100%" height="100%" />
                </div>
              </div>

            </div>
          </div>





        </div>

        <div className="whychoose_sec py-5">
          <div className="container custom_container">
            <div className="row align_itms row_2_order">
              <div className="col-lg-6">
                <img src={require("../assets/images/ppc/why_choose.webp")} className="img-fluid banner_img" alt="why_choose" width="100%" height="100%" />
              </div>
              <div className="col-lg-6">
                <h2 className="sec_title">Why Choose NounQ for Pay Per Click Advertising? </h2>
                <p className="sec_desc">NounQ is the best PPC agency in India known for its noteworthy PPC marketing services. Our marketing experts frame your advertisements by adding high-rated keywords and quality content. We monitor how well your ads are doing and adjust the ideal bid values accordingly. 
We choose the demographic and appropriate time to display the advertisements after determining who the audience is. Our persuasive marketing drives traffic to your website. We provide thorough audit reports to ensure that your investment is getting the best possible return.  
</p>
               

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
              {initial  ?      <OwlCarousel className='owl-theme' loop margin={10} nav {...options}>
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
              <img src={require("../assets/images/Home/client1.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />
              <img src={require("../assets/images/Home/client2.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />
              <img src={require("../assets/images/Home/client3.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />
              <img src={require("../assets/images/Home/client4.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />
              <img src={require("../assets/images/Home/client5.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />
              <img src={require("../assets/images/Home/client6.webp")} className="img-fluid trust_img" alt="trust_img" width="100%" height="100%" />

            </div>

          </div>
          <div className="third_row">
            <div className="inside_row">
              <p className="sec-title">Supercharge Your Online Visibility and Skyrocket Revenue with Our Powerful PPC Services</p>
              <div className="btnsec mt-4">
              <Link type="button" id="contact_btn" to="/requestquote" className="btn btn-blue">Contact Us</Link>
              <Link className="mx-2 btn btn-outline" to="/requestquote">Get a Proposal</Link>
              </div>
            </div>
          </div>
        </div>




        <div className="rewards_sec py-5">
          <h2 className="sec_title">Awards & Recognitions</h2>
          <p className="sec_desc">We have been recognized and awarded as the top PPC company, Best PPC services provider on various journals, magazines etc.</p>
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
                        <i className="fa fa-question-circle"></i> What are PPC services?
                      </button>
                    </h3>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      Pay Per Click services are advertising solutions offered by PPC companies and consultants to boost brand visibility and rank your website higher in the search results. 
                      </div>

                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <i className="fa fa-question-circle"></i>  How much do PPC services cost?
                      </button>
                    </h3>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      PPC services typically cost between $9000 and $10,000 per month, or $2.59 and $3.12 per click. It may vary depending on the company, location, and metrics chosen. 
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <i className="fa fa-question-circle"></i>  Why PPC services?
                      </button>
                    </h3>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      PPC services help companies boost their web traffic, leads, and sales to get the best return on their investment. They increase customer conversion rates and help you reach your goal in no time.
                      </div>
                    </div>
                  </div>
                 
                </div>

                <div className="col-lg-6">
                <div className="accordion-item">
                    <h3 className="accordion-header" id="headingFour">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        <i className="fa fa-question-circle"></i> What is included in PPC services?
                      </button>
                    </h3>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      PPC offers a wide range of services such as paid search advertising, remarketing, Google search advertising, display advertising, social media advertising, etc. 
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingFive">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        <i className="fa fa-question-circle"></i> Why choose a PPC agency?
                      </button>
                    </h3>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      A PPC agency is a go-to solution to manage all your PPC programs, audit your PPC campaigns, optimize keywords, and get suggestions based on your business goals. 
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h3 className="accordion-header" id="headingSix">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                        <i className="fa fa-question-circle"></i> What are the benefits of a PPC agency?
                      </button>
                    </h3>
                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      A PPC agency like NounQ offers various PPC services like PPC audits and landing page creation to increase the reach of your PPC campaigns and attract new customers. 
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

export default PPC;