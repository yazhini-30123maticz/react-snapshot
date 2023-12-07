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

function Homepage1() {

  const [count, setCount] = useState({});
  const [errors, setError] = useState()

  const changefn = (event) => {

    const name = event.target.name;
    setCount({
      ...count,
      [name]: event.target.value
    });
  }

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
      if (subscribe) {

        window.location.reload()

      }

    }
  };



  const carouselRef = useRef(null);
  const [selectedindex, setSelectedindex] = useState()
  const [servicedata, setServicedata] = useState([
    {
      headtitle: "Search Engine Optimization",
      para: "We help your Website to be discovered by people by ranking on the First position of Google organically and enables your business to reach new heights in the market with our in-depth SEO Services.",
      value1: "On-Page Optimization",
      value2: "SEO Site Auditn",
      value3: "Keyword Researchn",
      value4: "Link Building",
      value5: "Local SEO",
      value6: "Enterprise SEO",

    },
    {
      headtitle: "Social Media Marketing",
      para: "Increase your brand awareness with our unique style of engaging social media marketing services and our social media marketing campaigns attract the users around the world that result in your brand growth.",
      value1: "Social Media Advertising",
      value2: "Social Media Design",
      value3: "Strategy Developmenn",
      value4: "Community Management",
      value5: "Influencer Marketing",
      value6: "Social Media Monitoring",
    },
    {
      headtitle: "Pay Per Click (PPC)",
      para: "Get quality business traffic instantly to your business by launching your PPC campaigns and reach out to the right audience at the right time for your business. We monitor your PPC campaigns to improve your sales.",
      value1: "Google Search Ads",
      value2: "Display Advertising",
      value3: "Programmatic Advertising",
      value4: "Youtube Advertisingn",
      value5: "Paid Social Advertising",
      value6: "Remarketing Strategy",
    },
    {
      headtitle: "Content Marketing",
      para: "Our team works in getting your business or product information to reach the users and improve the brand value, with our engaging quality and unique contents through blogs, guest posts, articles & press releases and reviews.",
      value1: "Content Strategy Development",
      value2: "Content Creationn",
      value3: "Content Distribution",
      value4: "Analytics Tracking",
      value5: "Content Audit",
      value6: "Influencer Marketing"
    },
    {
      headtitle: "Web Design & Development",
      para: "Our professionals with extensive knowledge in multiple frameworks will develop your webpage with stunning design and will provide high quality performance. Our optimization for your site will end up in improvement of your business growth.",
      value1: "UI/UX Design",
      value2: "CMS Development",
      value3: "Wordpress Development",
      value4: "Web Application Development",
      value5: "E-commerce Development",
      value6: "Maintenance and Support"
    },
    {
      headtitle: "Email Marketing",
      para: "Our experts get your business to reach the right audience with our specialised strategy in email marketing and improve your business growth and also track the data and performance of the email marketing campaigns.",
      value1: "Marketing Automationn",
      value2: "Email Copywriting",
      value3: "Email Template Design",
      value4: "Email Campaigns Management",
      value5: "Lead Nurture Email Marketing",
      value6: "Email A/B Testing"
    },
    {
      headtitle: "Reputation Management",
      para: "We also work on improving your brand reputation by neglecting brand criticism and stabilizing your business on the internet and improving your reputation by achieving your goal, expanding your brand around the world.",
      value1: "Brand Enhancement",
      value2: "Online Review Management",
      value3: "Online Reputation Monitoring",
      value4: "Business Listings",
      value5: "Crisis Management",
      value6: "Enterprise Reputation Management"
    },
    {
      headtitle: "App Store Optimization",
      para: "Our professionals work on App store optimization to rank your app higher on app stores and gain organic users for your app. We work on various strategies thus improving the number of downloads for your app.",
      value1: "Keyword Research &amp; Optimization",
      value2: "Title and Description Optimization",
      value3: "Icon and Screenshots Optimization",
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
    nav: true,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    mouseDrag: false,
    navText: ["", "<div id='next-slide-services' class='nextslide_services'><i class='fa fa-long-arrow-right'></i></div>"],
    responsive: {
      0: {
        items: 1,
      }

    },
  };

  return (
    <div className='homepage'>
      <Header />
      <div className="home_div bg_index">
        <div className="banner_sec">
          <div className="banner_height">
            <div className="container custom_container">
              <div className="row banner_row">
                <div className="col-lg-6">
                  <h1 className="banner_title">
                    Digital <span className="banner_line">Marketing
                      <div className="banner_line_img">
                        <img src={require("../assets/images/Home/banner_line.webp")} className="img-fluid banner_lines" alt="banner_line" />
                      </div>
                      <div className="hash_img">
                        <img src={require("../assets/images/Home/hash.webp")} className="img-fluid hash_imgs" alt="hash_img" />
                      </div>
                    </span><br />
                    Agency</h1>
                  <p className="banner_desc">Unleash the full business potential of your brand’s online presence with our innovative Digital Marketing solutions. We are a Digital Marketing Agency helping businesses of all sizes to dominate their markets and stay one step ahead. Let's make your digital dreams come true. </p>
                  <div className="btnsec">
                    <button type="button" id="contact_btn" className="btn btn-blue">Contact Us</button>
                    <Link className="mx-2 btn btn-outline" to="/requestquote">Get a Proposal</Link>
                  </div>
                </div>
                <div className="col-lg-6 rightsec">
                  <img src={require("../assets/images/Home/new_banner.webp")} className="img-fluid banner_img" alt="banner" />
                  <img src={require("../assets/images/Home/fb.webp")} className="img-fluid fb_img" alt="fb_img" />
                  <img src={require("../assets/images/Home/instagram.webp")} className="img-fluid insta_img" alt="insta_img" />
                  <img src={require("../assets/images/Home/twitter.webp")} className="img-fluid twitter_img" alt="twitter_img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sec_1 py-5">
          <div className="container custom_container">
            <div className="row align_itms row_2_order">
              <div className="col-lg-6">
                <img src={require("../assets/images/Home/sec1.webp")} className="img-fluid banner_img" alt="banner" />
              </div>
              <div className="col-lg-6">
                <h2 className="sec_title">Best Digital Marketing Company in India </h2>
                <p className="sec_desc">NounQ is the best digital marketing company in India that drives your business growth to the next level with experienced team and services. The quality of our digital marketing services will  increase your business revenue and brand awareness. Our team provides you with the 360 degree digital marketing services to drive your targeted customers for your service. With Our full spectrum Digital Marketing Services, We help your business reach the right audience through quality traffic that brings you quality leads. Committed to success, Our experts at NounQ establish your online presence and help achieve better ROIs.</p>
                <p className="sec_desc">We at NounQ deliver you the best digital advertising services with our experts creativity and innovative ideas that makes you set your goals higher. Our team will be a bridge in connecting your audience with your business and would provide you with continuous development in your business.</p>
                <div className="btnsec mt-4">
                  <button type="button" id="contact_btn1" className="btn btn-blue">Contact Us</button>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="services_sec py-5">
          <div className="container custom_container">
            <h2 className="sec_title">Digital Marketing Services</h2>
            <p className="sec_desc">We have been providing a diverse range of digital advertising services to businesses of all sizes and industries that helps achieve your marketing goals.</p>
            <div className="desktop-view d-none d-xl-block">

              {/* <div className='arrow_sec'>
              <i class="fa fa-long-arrow-right"></i>
              </div> */}
              <OwlCarousel className='owl-theme' id="owl_services" loop margin={10} nav

                {...options1}>
                {servicedata.map((e, i) => (

                  <div className={i === selectedindex ? 'item active' : ''} key={i.id} data-index={i} data-slide-index={i}>
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
              </OwlCarousel>
            </div>
            <div className="mobile-view d-block d-xl-none">
              <OwlCarousel className='owl-theme' id="owl_services_mobile" loop margin={10} nav {...options1}>

                <div className="item"> <div className="services_card">
                  <div className="row">
                    <div className="col-12">
                      <p className="sec_head">Search Engine Optimization</p>
                    </div>
                    <div className="col-12 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">We help your Website to be discovered by people by ranking on the First position of Google organically and enables your business to reach new heights in the market with our in-depth SEO Services.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sub_services mt-4">
                    <ul>
                      <li>On-Page Optimization</li>
                      <li>SEO Site Audit</li>
                      <li>Keyword Research</li>
                      <li>Link Building</li>
                      <li>Local SEO</li>
                      <li>Enterprise SEO</li>
                    </ul>
                    <div className="number_sec">
                      <p>1</p>
                    </div>
                  </div>
                </div></div>
                <div className="item"> <div className="services_card">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">Social Media Marketing</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Increase your brand awareness with our unique style of engaging social media marketing services and our social media marketing campaigns attract the users around the world that result in your brand growth.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sub_services mt-4">
                    <ul>
                      <li>Social Media Advertising</li>
                      <li>Social Media Design</li>
                      <li>Strategy Development</li>
                      <li>Community Management</li>
                      <li>Influencer Marketing</li>
                      <li>Social Media Monitoring</li>
                    </ul>
                    <div className="number_sec">
                      <p>2</p>
                    </div>
                  </div>
                </div></div>
                <div className="item"> <div className="services_card">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">Pay Per Click (PPC)</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Get quality business traffic instantly to your business by launching your PPC campaigns and reach out to the right audience at the right time for your business. We monitor your PPC campaigns to improve your sales.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sub_services mt-4">
                    <ul>
                      <li>Google Search Ads</li>
                      <li>Display Advertising</li>
                      <li>Programmatic Advertising</li>
                      <li>Youtube Advertising</li>
                      <li>Paid Social Advertising</li>
                      <li>Remarketing Strategy</li>
                    </ul>
                    <div className="number_sec">
                      <p>3</p>
                    </div>
                  </div>
                </div></div>
                <div className="item"> <div className="services_card">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">Content Marketing</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our team works in getting your business or product information to reach the users and improve the brand value, with our engaging quality and unique contents through blogs, guest posts, articles &amp; press releases and reviews. </p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sub_services mt-4">
                    <ul>
                      <li>Content Strategy Development</li>
                      <li>Content Creation</li>
                      <li>Content Distribution</li>
                      <li>Analytics Tracking</li>
                      <li>Content Audit</li>
                      <li>Influencer Marketing</li>
                    </ul>
                    <div className="number_sec">
                      <p>4</p>
                    </div>
                  </div>
                </div></div>
                <div className="item"> <div className="services_card">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">Web Design &amp; Development</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our professionals with extensive knowledge in multiple frameworks will develop your webpage with stunning design and will provide high quality performance. Our optimization for your site will end up in improvement of your business growth.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sub_services mt-4">
                    <ul>
                      <li>UI/UX Design</li>
                      <li>CMS Development</li>
                      <li>Wordpress Development</li>
                      <li>Web Application Development</li>
                      <li>E-commerce Development</li>
                      <li>Maintenance and Support</li>
                    </ul>
                    <div className="number_sec">
                      <p>5</p>
                    </div>
                  </div>
                </div></div>
                <div className="item"> <div className="services_card">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">Email Marketing</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our experts get your business to reach the right audience with our specialised strategy in email marketing and improve your business growth and also track the data and performance of the email marketing campaigns.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sub_services mt-4">
                    <ul>
                      <li>Marketing Automation</li>
                      <li>Email Copywriting</li>
                      <li>Email Template Design</li>
                      <li>Email Campaigns Management</li>
                      <li>Lead Nurture Email Marketing</li>
                      <li>Email A/B Testing</li>
                    </ul>
                    <div className="number_sec">
                      <p>6</p>
                    </div>
                  </div>
                </div></div>
                <div className="item"> <div className="services_card">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">Reputation Management</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">We also work on improving your brand reputation by neglecting brand criticism and stabilizing your business on the internet and improving your reputation by achieving your goal, expanding your brand around the world.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sub_services mt-4">
                    <ul>
                      <li>Brand Enhancement</li>
                      <li>Online Review Management</li>
                      <li>Online Reputation Monitoring</li>
                      <li>Business Listings</li>
                      <li>Crisis Management</li>
                      <li>Enterprise Reputation Management</li>
                    </ul>
                    <div className="number_sec">
                      <p>7</p>
                    </div>
                  </div>
                </div></div>
                <div className="item"> <div className="services_card">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="sec_head">App Store Optimization</p>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <div className="row firstsec">
                        <p className="sec_desc">Our professionals work on App store optimization to rank your app higher on app stores and gain organic users for your app. We work on various strategies thus improving the number of downloads for your app.</p>
                        <div className="btnsec mt-2">
                          <button type="button" className="btn btn-blue">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sub_services mt-4">
                    <ul>
                      <li>Keyword Research &amp; Optimization</li>
                      <li>Title and Description Optimization</li>
                      <li>Icon and Screenshots Optimization</li>
                      <li>App Localization</li>
                      <li>User Review Management</li>
                      <li>Monitoring &amp; Reporting</li>
                    </ul>
                    <div className="number_sec">
                      <p>8</p>
                    </div>
                  </div>
                </div></div>
              </OwlCarousel>
            </div>

            <div className="row select_sec">
              <div className="col-xl-6 leftsec">

                <div className="row">
                  {servicedata.map((e, i) => (
                    <div className="col-lg-6">

                      <ul id="scroll_ul_list" >
                        <li key={i.id} className={i === selectedindex ? 'activelist' : ''}>
                          {e.headtitle}
                        </li>
                        {/* {i == selectedindex ?
                          <li data-slide-index={i} className='activelist'>{e.headtitle}</li> :
                          <li data-slide-index={i} onClick={handleSlideChangea} >{e.headtitle}</li>} */}


                      </ul>
                    </div>
                  ))}
                </div>

              </div>
              <div className="col-xl-6 rightsec d-none d-xl-block">
                <div className="black_card">
                  <OwlCarousel
                    className='owl-theme'
                    id="owl_services1"
                    loop margin={10}
                    nav={false}

                    {...options1}
                  >
                    {servicedata.map((e, i) => (
                      <div key={i} className="item">
                        <div className="row">
                          <div className="col-lg-6">
                            <ul>
                              <li>{e.value1}</li>
                              <li>{e.value2}</li>
                              <li>{e.value3}</li>
                            </ul>
                          </div>
                          <div className="col-lg-6">
                            <ul>
                              <li>{e.value4}</li>
                              <li>{e.value5}</li>
                              <li>{e.value6}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}

                  </OwlCarousel>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="sol_sec py-5">
          <div className="container custom_container">
            <div className="row">
              <h2 className="sec_title">Our Results in Numbers</h2>
              <p className="sec_desc">Our Digital Marketing Strategies are designed for results. With our full stack services and promotions we enhance your business growth by reaching new heights. Our experts improve your brand awareness around the world by establishing an online presence of your business rather than just marketing your service/products. As a result of our marketing campaigns, your business will obtain potential customers and more leads than ever before. All the promotions carried out by our well-experienced digital marketing specialists will result in driving organic traffic within a short span of time that will last forever. NounQ works on various aspects of digital marketing to drive traffic for business and improve your brand reputation.
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
              <h2 className="sec_title">Digital Marketing Tools Behind our Digital Mastery</h2>
              <p className="sec_desc">As a best-in-class Digital Marketing Agency, We build unique marketing strategies using various tools for our clients to build a stronger and a profitable online presence.</p>
            </div>
            <div className="row">
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/Google.webp")} className="img-fluid client_img" alt="Google" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/Google_ads.webp")} className="img-fluid client_img" alt="Google_ads" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/SEMrush.webp")} className="img-fluid client_img" alt="SEMrush" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/Ahrefs.webp")} className="img-fluid client_img" alt="Ahrefs  " />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/hootsuite.webp")} className="img-fluid client_img" alt="hootsuite" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/buffer.webp")} className="img-fluid client_img" alt="Buffer" />
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/yoast-seo.webp")} className="img-fluid client_img" alt="client_img" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/mailchimp.webp")} className="img-fluid client_img" alt="mailchimp" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/hubspot.webp")} className="img-fluid client_img" alt="hubspot" />

                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/moz.webp")} className="img-fluid client_img" alt="moz" />
                </div>
              </div>
              <div className="col-6 col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/canva.webp")} className="img-fluid client_img" alt="canva" />
                </div>
              </div>
              <div className="col-6   col-lg-2 mb-4">
                <div className="clients_card">
                  <img src={require("../assets/images/Home/google-search-console.webp")} className="img-fluid client_img" alt="google-search-console" />
                </div>
              </div>

            </div>
          </div>





        </div>

        <div className="whychoose_sec py-5">
          <div className="container custom_container">
            <div className="row align_itms row_2_order">
              <div className="col-lg-6">
                <img src={require("../assets/images/Home/why_choose.webp")} className="img-fluid banner_img" alt="why_choose" />
              </div>
              <div className="col-lg-6">
                <h2 className="sec_title">NounQ - Your Partner in Success</h2>
                <p className="sec_desc">NounQ is the Best Digital Marketing Agency featured in various digital channels trusted by 250+ Companies and Brands to fuel their business revenue.  With our engaging marketing campaigns, enhanced content we make a solid online presence of your business that increases revenue. Whether starting from scratch or reinventing your brand, Our specialised promotions will gain you potential customers that increase your brand reputation and business growth.</p>
                <p className="sec_desc">With a team of Dedicated Developers and Creative Digital Marketing Specialists, We help companies to establish as a brand to thrive in this competitive market. Understanding the entire scope of your business, We implement an innovation-led approach that targets the right set of audience to get better global recognition. No matter where you are in this online market, we start from scratch and put your business in front of the right audience at the right time.</p>

                <div className="btnsec mt-4">
                  <button type="button" id="contact_btn2" className="btn btn-blue">Contact Us</button>
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
                <OwlCarousel className='owl-theme' loop margin={10} nav {...options}>
                  <div class='item'>
                    <div class="test_card my-4">
                      <p class="main_quote">"Increased our website traffic by 250% within 3 months"</p>
                      <p class="main_desc">We were amazed by the results we got from this agency’s SEO strategies. We saw a 250% increase in our website traffic and a significant boost in our sales.</p>
                      <div class="pf_sec mb-4">
                        <div>
                          <img src={require("../assets/images/Home/pf2.webp")} class="img-fluid profile_img" alt="pf_img " />
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
                          <img src={require("../assets/images/Home/pf4.webp")} class="img-fluid profile_img" alt="pf_img " />
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
                          <img src={require("../assets/images/Home/pf6.webp")} class="img-fluid profile_img" alt="pf_img " />
                        </div>
                        <div>
                          <p class="pf_name">Brent Massey</p>
                          <p class="pf_name">CEO, Law Firm</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </OwlCarousel>


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
              <img src={require("../assets/images/Home/client1.webp")} className="img-fluid trust_img" alt="trust_img" />
              <img src={require("../assets/images/Home/client2.webp")} className="img-fluid trust_img" alt="trust_img" />
              <img src={require("../assets/images/Home/client3.webp")} className="img-fluid trust_img" alt="trust_img" />
              <img src={require("../assets/images/Home/client4.webp")} className="img-fluid trust_img" alt="trust_img" />
              <img src={require("../assets/images/Home/client5.webp")} className="img-fluid trust_img" alt="trust_img" />
              <img src={require("../assets/images/Home/client6.webp")} className="img-fluid trust_img" alt="trust_img" />

            </div>

          </div>
          <div className="third_row">
            <div className="inside_row">
              <p className="sec-title">Enrich Your Business with Our Smart and Creative Digital Marketing Solutions</p>
              <div className="btnsec mt-4">
                <button type="button" id="contact_btn3" className="btn btn-blue">Contact us</button>
                <a href="/requestquote" className="mx-2 btn btn-outline">Get a Proposal</a>
              </div>
            </div>
          </div>
        </div>




        <div className="rewards_sec py-5">
          <h2 className="sec_title">Awards & Recognitions</h2>
          <p className="sec_desc">Through purpose-driven marketing solutions and our unwavering commitment to excellence in digital marketing services, we have been recognized and ranked on the top.</p>
          <div className="row rew_row">
            <div className="col-lg-4 mb-4">
              <img src={require("../assets/images/Home/reward1.webp")} className="img-fluid reward_img" alt="reward_img" />
            </div>
            <div className="col-lg-4 mb-4">
              <img src={require("../assets/images/Home/reward2.webp")} className="img-fluid reward_img" alt="reward_img" />
            </div>
            <div className="col-lg-4 mb-4">
              <img src={require("../assets/images/Home/reward3.webp")} className="img-fluid reward_img" alt="reward_img" />
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
              <img src={require("../assets/images/Home/mail.webp")} className="img-fluid news_img" alt="mail" />
              <p className="sec_desc">Subscribe to our Newsletter to get all the updates</p>
              <div className="input_sec">
                <p className="input_label">Enter your email here : *</p>
                <div className="input-group mb-3">


                  <input id="newsletter" type="text" name="email" className="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" value={count?.email || ''} onChange={(event) => changefn(event)} />

                  <div className="input-group-append">
                    <button type="button" className="btn btn-primary" name="subscribe" id="NewsletterSubmit" onClick={(event) => onSubmit(event)}>Subscribe</button>

                  </div>

                </div>
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
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i className="fa fa-question-circle"></i> Why is NounQ the top digital marketing company?
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        NounQ is the best Digital Marketing Agency provides 360* digital marketing services at one stop from driving traffic to your business to expanding your brand all over the world and improving your brand reputation.
                      </div>

                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <i className="fa fa-question-circle"></i>  What are Digital Marketing Services?
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Digital marketing services help startups and large businesses to increase their online presence at a low cost. It helps them to reach their target market through various mediums and generate huge revenue. Some of the digital marketing services are
                        <ul>
                          <li>Search Engine Optimization (SEO)</li>
                          <li>Social Media Marketing.</li>
                          <li>Pay Per Click (PPC).</li>
                          <li>Content Marketing</li>
                          <li>Email Marketing</li>
                          <li>Reputation Management</li>
                          <li>App Store Optimization(ASO).</li>


                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <i className="fa fa-question-circle"></i>  What Services does a 360* digital marketing company provide?
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        NounQ provides you the best 360* digital marketing services working with SMM, SEO, PPC, Email marketing, Content marketing and creating multiple campaigns to improve your brand than just marketing your service or products.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        <i className="fa fa-question-circle"></i> Why invest in digital marketing?
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Digital Marketing is the sure shot solution to take your business to the next level as it targets the right audience directly at the right time and drives you more traffic than usual to your business, digital marketing expands your brand all over the globe at less cost.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        <i className="fa fa-question-circle"></i> How much does digital marketing services cost?
                      </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        NounQ, Digital Marketing Agency provides various services for your marketing campaigns. The cost for the campaigns depends on the variety of services you choose, approximately it costs about $1000 to $10000 per month.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                        <i className="fa fa-question-circle"></i> Why is NounQ among the top 10 digital marketing companies in the USA?
                      </button>
                    </h2>
                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        The professionals of NounQ just don’t work on marketing your service or product, they work on building your brand awareness and gaining reputation for your business which makes NounQ unique and makes us among the top 10 digital marketing companies in the USA.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSeven">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                        <i className="fa fa-question-circle"></i>  What is an SEO company?
                      </button>
                    </h2>
                    <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        SEO company helps business to drive organic traffic and rank their websites on the top positions on the various search engines using various tactics such as,
                        <ul>
                          <li>Keyword Research</li>
                          <li>On-Page Optimization</li>
                          <li>Off-Page Optimization</li>
                          <li>Link Building</li>
                          <li>Content Creation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingEight">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                        <i className="fa fa-question-circle"></i>  What are the benefits of hiring a digital marketing agency?
                      </button>
                    </h2>
                    <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Here are the potential benefits of hiring a digital marketing company,
                        <ul>
                          <li>Dedicated marketing team</li>
                          <li>Access to latest digital marketing tools</li>
                          <li>Up-to-date industry knowledge</li>
                          <li>Improved Return on Investment(ROI)</li>
                          <li>Cost-effectiveness</li>
                          <li>Campaigns tailored to your business goals</li>
                        </ul>
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

export default Homepage1;