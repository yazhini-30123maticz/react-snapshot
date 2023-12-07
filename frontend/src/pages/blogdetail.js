import React, { useEffect, useState } from 'react';
import "../assets/css/styles.css";
import Blogdetailcard from '../components/blogdetailcard';
import { Link, useParams,useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from '../layouts/footer';
import config from '../config/config';
import { blogdetailfind } from '../api/api';

function Blogdetail() {
    const navigate = useNavigate();
    const [detail, setDetail] = useState([])
    const [recent, setRecent] = useState([])
    const [category, setCategory] = useState([])
    const[url,setUrl]=useState([])
    const { slug } = useParams();

    useEffect(() => {
        blogdetailfn();
    }, [slug])

    const blogdetailfn = async () => {
        var slugg = {
            "slug": slug
        }

        var blogdetail = await blogdetailfind(slugg)
        if (blogdetail?.status==true) {
            setDetail(blogdetail?.BlogData)
            setRecent(blogdetail?.RecentBlogs?.data)
            setCategory(blogdetail?.BlogCategory?.data)
            setUrl(blogdetail?.pageUrl)
        }
        else{
            navigate("/errorpage")
        }
    }




    const [blogcatgcard, setBlogcatgcard] = useState([
        {
            catg_desc: "Ideas to reinvent your business",
            catg_title: "Innovation",

        },
        {
            catg_desc: "Fintech & retail in the spotlight",
            catg_title: "Market Insights",

        },
        {
            catg_desc: "Tips to wow the market",
            catg_title: "Product Mindset",

        },
        {
            catg_desc: "All things software development",
            catg_title: "Technology",

        },
        {
            catg_desc: "Building the right digital products",
            catg_title: "Design",

        },
        {
            catg_desc: "Promote teamwork & inclusivity",
            catg_title: "Culture",

        },
    ])





    return (
        <div>
            <div className='blogdetail_page'>
                <Header state={{"image":detail?.image,"metatitle":detail?.meta_title,"metadescription":detail?.meta_description,"page":url,"faqSchema":detail?.faqSchema,"faqJson":detail?.faqJson}}/>
                <div className='topsec'>
                    <div className='container custom_container_blog'>
                        <div className='row'>
                            <h1 className='blog_title'>{detail?.title}</h1>
                            <p className='blog_cat'>{detail?.blog_category?.category_name}</p>


                            <div className='blogimgs'>
                                <img src={`${config.Image_URL}admin/images/blog/${detail?.image}`} className='blogdetail_banner' />
                            </div>
                        </div>
                        <div className='row'>
                            {/* <h2 className='exp_title'>{detail?.meta_description}</h2> */}
                            <div className='exp_desc' dangerouslySetInnerHTML={{ __html: detail?.description }}></div>
                            {/* <p className='exp_desc'>{detail?.content}</p> */}
                        </div>



                    </div>
                </div>

                <div className='blog_collection'>
                    <div className='container'>
                        <div className='row readmoreblog'>
                            <p className='read_title'>Read more on <span>our Blogs</span></p>
                            {/* <p className='read_desc'>Check out the knowledge base collected and distilled by experienced professionals.</p> */}
                        </div>
                        <div className='row'>
                            <Blogdetailcard state={recent} />
                        </div>
                    </div>


                </div>


                <div className='categorysec'>
                    <div className='container'>
                        <div className='row'>
                            <h2 className='sec_title'>Browse by category</h2>
                        </div>
                        <div className='row'>
                            {category?.length > 0 ? (category?.map((val) => (
                                <>

                                    <div className='col-lg-4 mb-4'>
                                        <div className='blogcat_box'>
                                            {/* <Link className="linkclass" to={`/blogcategory/${val?.slug}`}><p className='catg_desc'>{val?.meta_description}</p></Link> */}
                                            <Link className="linkclass" to={`/blogcategory/${val?.slug}`}><h3 className='catg_title'>{val?.category_name}</h3></Link>
                                            <Link className="linkclass" to={`/blogcategory/${val?.slug}`}> <i class="fa fa-solid fa-angle-right"></i></Link>
                                        </div>
                                    </div>
                                </>
                            ))) : <></>}
                        </div>
                    </div>
                </div>



                <Footer />
            </div>

        </div>
    );
}

export default Blogdetail;