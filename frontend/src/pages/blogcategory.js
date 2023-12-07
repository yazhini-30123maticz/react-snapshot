import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { blogfind } from '../api/api';
import { Link, useParams,useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from '../layouts/footer';
import "../assets/css/styles.css"
import Blogcard from '../components/blogcard';
import config from '../config/config';
import { subscribesave, blogcategoryfind, Loadmore } from '../api/api';
import { isEmpty } from '../config/common';

function Blog() {
    const navigate = useNavigate();
    const [category, setcategory] = useState([]);
    const [trending, setTrending] = useState([]);
    const [recent, setRecent] = useState([]);
    const [blogcategoryss, setBlogcategoryss] = useState([]);
    const [categorymeta,setCategorymeta]=useState({})
    const [email, setEmail] = useState({});
    const [errors, setError] = useState()
    const [success, setsuccess] = useState("")
    const { slug } = useParams();
    const [hide, setHide] = useState(false)

    const changefn = (event) => {
        setError({})
        const name = event.target.name;
        setEmail({
            ...email,
            [name]: event.target.value
        });
    }

    const validation = async () => {
        let errors = {};
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (isEmpty(email?.email)) {
            errors.email = "Email field is required";
        } else if (!emailReg.test(email?.email)) {
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
            var subscribe = await subscribesave(email)

            if (subscribe.status == true) {
                setEmail({ email: "" })
                setsuccess("Email added successfully")
                setTimeout(() => {
                    setsuccess("")
                }, 4000);

            }
            else {
                setError({ email: "Already subcribed" })
            }


        }
    };

    useEffect(() => {
        blogcategoryfn();
    }, [slug])

    const blogcategoryfn = async () => {
        var slugg = {
            "slug": slug
        }

        var blogcategory = await blogcategoryfind(slugg)
        if (blogcategory?.status==true) {
            if (blogcategory?.data?.Recentblogs?.Blogs?.length == 0) setHide(true)
            else if (blogcategory?.data?.Recentblogs?.Blogs?.length < 3) setHide(true)
            else setHide(false)

            setTrending(blogcategory?.data?.TrendingBlogs?.data)
            setRecent(blogcategory?.data?.Recentblogs)
            setBlogcategoryss(blogcategory?.data?.BlogCategory?.data)
            setCategorymeta(blogcategory?.data?.Metadetail)
        }
        else{
            navigate("/errorpage")
        }
    }
   

    const loadfn = async () => {
        var data = {
            "slug": slug,
            "skip": recent?.Blogs?.length
        }

        var loadmore = await Loadmore(data)

        setRecent({
            ...recent, ...{
                'Blogs': [...recent.Blogs, ...loadmore.loadmore.Blogs]
            }
        })
        var nextSkip = loadmore.nextSkip
        var count = loadmore.count
    
        if (loadmore.loadmore.Blogs.length < 3) setHide(true)
        else if (count == recent.length) setHide(true)
        else setHide(false)
    }


    const [blogtopcard, setBlogtopcard] = useState([
        {
            cardtitle: "Innovation",
            carddesc: "Ideas, solutions, and experiments to help you reinvent your business",
            titlecolor: "#000"
        },
        {
            cardtitle: "Market Insights",
            carddesc: "Business strategies from a company that grows 100% YoY",
            titlecolor: "#fff"
        },
        {
            cardtitle: "Product Mindset",
            carddesc: "Proven ways for delivering value to the users and building market winning products."
        },
        {
            cardtitle: "Technology",
            carddesc: "Stories about code and how it's changing the world for better"
        },
        {
            cardtitle: "Design",
            carddesc: "The art of creating engaging digital experiences"
        },
        {
            cardtitle: "Culture",
            carddesc: "Tips on how to build a collaborative and inclusive workplace"
        },

    ])
    const [blogcategory, setBlogcategory] = useState([
        {
            order: "01",
            heading: "Nounq",
            loadmore: "See More Stories"
        },
        {
            order: "02",
            heading: "Nounq",
            loadmore: "See More Stories"
        },
        {
            order: "03",
            heading: "All Blogs",
            loadmore: "See More Blog"
        },

    ])
    const [blogrecent, setBlogrecent] = useState([
        {
            blogimg: require('../assets/images/blog/blogimage.webp'),
            blogcategory: "Innovation",
            blogtitle: "Disruption Insights: Make Users the Final Judges of Your Idea"
        },
        {
            blogimg: require('../assets/images/blog/blogimage.webp'),
            blogcategory: "Innovation",
            blogtitle: "Disruption Insights: Make Users the Final Judges of Your Idea"
        },
        {
            blogimg: require('../assets/images/blog/blogimage.webp'),
            blogcategory: "Innovation",
            blogtitle: "Disruption Insights: Make Users the Final Judges of Your Idea"
        }
    ])
    const [trendcard, setTrendcard] = useState([
        {
            trendimg: require('../assets/images/blog/trendsec.webp'),
            trendcategory: "Nounq",
            trendtitle: "Discover more than 800 free TV channels with Google TV"
        },
        {
            trendimg: require('../assets/images/blog/trendsec.webp'),
            trendcategory: "Nounq",
            trendtitle: "Discover more than 800 free TV channels with Google TV"
        },
        {
            trendimg: require('../assets/images/blog/trendsec.webp'),
            trendcategory: "Nounq",
            trendtitle: "Discover more than 800 free TV channels with Google TV"
        },
        {
            trendimg: require('../assets/images/blog/trendsec.webp'),
            trendcategory: "Nounq",
            trendtitle: "Discover more than 800 free TV channels with Google TV"
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
            <div className='blogpage blogcategory_page'>
                <Header  blogcategory={{"metatitle":categorymeta?.meta_title,"metadescription":categorymeta?.meta_description}}/>
                {/* {trending.length > 0 ? (<div className='trend_sec'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-8 leftsec'>
                            <Link className="linkclass" to={`/${trending[0]?.slug}`}>
                                <div className='img_sec'>
                                    <Link className="linkclass" to={`/${trending[0]?.slug}`}><img className='trend_img' src={`${config.Image_URL}admin/images/blog/${trending[0]?.image}`} /></Link>
                                    <div className='img_label'>
                                        <p>Trending Blog</p>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='trendleft_card'>
                                        <Link className="linkclass" to={`/${trending[0]?.slug}`}>{trending[0]?.blog_category.category_name}</Link>

                                        <Link className="linkclass" to={`/${trending[0]?.slug}`}><h2 className='card_title'>{trending[0]?.title}</h2></Link>
                                        <Link className="linkclass" to={`/${trending[0]?.slug}`}><p className='card_desc'>{trending[0]?.meta_description}</p></Link>

                                    </div>
                                </div>
                              
                                </Link>
                            </div>

                            <div className='col-lg-4 rightsec mt-4'>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <OwlCarousel className='owl-theme' id="owl_services" loop margin={10} nav {...options3}>
                                            {trending?.map((val, i) => (
                                                <>
                                                    {i % 2 !== 0 &&
                                                        <div className='item'>


                                                            <div className='row'>
                                                                <div className='col-12'>
                                                                    <div className='trend_right_card'>
                                                                        <Link className="linkclass" to={`/${trending[i]?.slug}`} ><img className='trend_img' src={`${config.Image_URL}admin/images/blog/${trending[i]?.image}`} /></Link>
                                                                        <Link className="linkclass" to={`/${trending[i]?.slug}`} ><h3 className='card_mini_title'>{trending[i]?.blog_category?.category_name}</h3></Link>
                                                                        <Link className="linkclass" to={`/${trending[i]?.slug}`} ><h2 className='card_title'>{trending[i]?.title}</h2></Link>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='row'>
                                                                <div className='col-12'>
                                                                    <div className='trend_right_card'>
                                                                        <Link className="linkclass" to={`/${trending[i + 1]?.slug}`} ><img className='trend_img' src={`${config.Image_URL}admin/images/blog/${trending[i + 1]?.image}`} /></Link>
                                                                        <Link className="linkclass" to={`/${trending[i + 1]?.slug}`} ><h3 className='card_mini_title'>{trending[i + 1]?.blog_category?.category_name}</h3></Link>
                                                                        <Link className="linkclass" to={`/${trending[i + 1]?.slug}`} ><h2 className='card_title'>{trending[i + 1]?.title}</h2></Link>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    }
                                                </>
                                            ))}

                                        </OwlCarousel>
                                    </div>

                                </div>

                             


                            </div>


                        </div>

                    </div>
                </div>) : <></>} */}
                <div className='recent_blog'>
                    <div className='container'>
                        <div className='row'>
                            <h2 className='sec_title'>All Blogs</h2>
                        </div>
                        <div className='row'>
                            {recent?.Blogs?.length > 0 ? (recent?.Blogs?.map((val, e) => {
                                return (
                                    <div className='col-lg-4'>
                                        <div className='blog_card'>
                                            <Link className="linkclass" to={`/${val?.slug}`}><img src={`${config.Image_URL}admin/images/blog/${val?.image}`} width="100%" className='blog_card_img' /></Link>
                                            {/* <Link className="linkclass" to={`/${val?.slug}`}><p className='card_title'>{recent?.category_name}</p></Link> */}
                                            <Link className="linkclass" to={`/${val?.slug}`}> <p className='card_desc'>{val?.title}</p></Link>
                                        </div>
                                    </div>)
                            })) : <></>}

                            {/* {blogrecent.map((e, titlecolor) => (

                                <div className='col-lg-4'>
                                    <div className='blog_card'>

                                        <img src={e?.blogimg} width="100%" className='blog_card_img' />
                                        <p className='card_title'>{e?.blogcategory}</p>
                                        <p className='card_desc'>{e?.blogtitle}</p>
                                   </div>
                                </div>
                            ))} */}
                        </div>
                        {hide === false ?
                            <div className='btnsec text-center'>
                                <Link className="linkbtn" onClick={loadfn}>Load More <i class="fa fa-solid fa-arrow-right"></i></Link>
                            </div> : <></>
                        }
                    </div>
                </div>



                <div className='container'>
                    <div className='top_sec'>
                        <div className='row first_row'>
                            <h1 className='head_title'> Browse for  <span>Category</span> </h1>
                            {/* <p className='head_desc'>Opinions, tips, and latest news on software, technology, design, and<br />
                                business for innovators like you.</p> */}
                        </div>
                        <div className='row mb-4'>
                            {/* {blogtopcard.map((e, titlecolor) => (
                                <div className='col-lg-4 mb-4'>
                                    <div className='blog_top_card'>
                                        <h2 className='card_title' style={{ color: { titlecolor } }}>{e?.cardtitle}</h2>
                                        <p className='card_desc'>{e?.carddesc}</p>
                                        <Link className="linkclass" to="/about">Read Magazine</Link>
                                    </div>
                                </div>
                            ))} */}
                            {blogcategoryss.length > 0 ? (blogcategoryss?.map((val) => (
                                <div className='col-lg-4 mb-4'>
                                     <Link className="linkclass" to={`/blogcategory/${val.slug}`}>
                                    <div className='blog_top_card'>
                                        <h2 className='card_title' >{val?.category_name}</h2>
                                        {/* <p className='card_desc'>{val?.meta_description}</p> */}
                                        <i class="fa fa-solid fa-angle-right"></i>
                                    
                                    </div>
                                    </Link>
                                </div>
                            ))) : <></>}

                        </div>
                    </div>
                </div>
                <div className='ad_banner_sec'>
                    <div className='container'>
                        <div className='ad_banner'>
                            <div className='row ad_row'>
                                <div className='col-lg-4'>
                                    <img src={require('../assets/images/blog/ad_banner.webp')} width="280px" height="220px" />
                                </div>
                                <div className='col-lg-6 rightsec'>
                                    {/* <p className='headtitle'>Get the Latest news from <span>NOUNQ</span> in your inbox.</p> */}
                                    <p className='headtitle'>Subscribe to Our Newsletter to Receive Updates Directly into Your Inbox.</p>
                                    <form>
                                        <div className='input_sec'>
                                            <div class="form-group">
                                                <input type="email" className="form-control" id="newsletter" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email?.email || ''} onChange={(event) => changefn(event)} />
                                                {success == "" ? <></> : <p class="text-success text-center" id="req_sumbit_success_msg_contact">{success}</p>}
                                                <p className="Newsletter-error" style={{ color: "red" }}>{errors && errors.email}</p>
                                                <div>
                                                    <p className="text-success d-none text-left" id="News_sumbit_suc_msg">Subscribed for
                                                        Newsletter</p>


                                                </div>
                                            </div>
                                            <button type="button" id="contact_btn" name="subscribe" className="btn sub_btn" onClick={(event) => onSubmit(event)}>Subscribe</button>
                                        </div>

                                    </form>

                                    {/* <p className='sec_desc'>Your information will be used in accordance with Google's privacy policy.</p> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>













                <Footer />





            </div>
        </div>
    );
}

export default Blog;