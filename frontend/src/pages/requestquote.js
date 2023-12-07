import React, { useEffect, useState } from 'react';
import '../assets/css/requestquote.css';
import { Link } from 'react-router-dom'
import { requestsave, categoryfind } from '../api/api';
import { isEmpty } from '../config/common';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../layouts/Header";
function Requestquote() {
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  const [success, setsuccess] = useState("")
  const [count, setCount] = useState({});

  const [category, setcategory] = useState({});
  const [subcategory, setSubcategory] = useState({})
  const [details, setDetails] = useState({})
  const [pic, setPic] = useState({})
  const [errors, setError] = useState()
  const[categorychange,setCategorychange]=useState(true)
  const[subcategorychange,setsubcategorychange]=useState(true)


  const validation = async () => {
    let errors = {};
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (isEmpty(count?.name)) {
      errors.name = "Name field is required";
    }
    if (isEmpty(count?.number)) {
      errors.number = "Mobile field is required";
    } else if (isNaN(count?.number)) {
      errors.number = "Allowed Numbers Only";
    }
    if (isEmpty(count?.country)) {
      errors.country = "Country field is required";
    }
    if (isEmpty(count?.email)) {
      errors.email = "Email field is required";
    } else if (!emailReg.test(count?.email)) {
      errors.email = "Invalid Email";
    }
    if (isEmpty(count?.category)) {
      errors.category = "category field is required";
    }
    if (isEmpty(count?.subcategory)) {
      errors.subcategory = "subcategory field is required";
    }
    if (isEmpty(count?.requirement)) {
      errors.requirement = "requirement field is required";
    }
    return errors
  }





  const onChangeValue = async (e) => {
    setError({})
    var { id, value, files } = e.target
    id == "upload" ? setPic(files[0]) : setDetails({ ...details, ...{ [id]: value } })
  }
  const changefn = (event) => {
    setError({})
    const name = event.target.name;
    setCount({
      ...count,
      [name]: event.target.value
    });
  }
  useEffect(() => {
    categoryfn();
  }, [])

  const categoryfn = async () => {
    var category = await categoryfind()
    if (category) {
      setcategory(category)
      setCategorychange(false)
      setsubcategorychange(false)
  
    }
  }



  const Subcategoryfn = async (e) => {
    setError({})
    var sub = JSON.parse(e.target.value).subcategory
    setCount({
      ...count,
      "category": JSON.parse(e.target.value).category
    });
    setSubcategory(sub)
  }

  const onSubmit = async (event) => {
    var val = await validation();
    if (!isEmpty(val)) {
      setError(val)
    }
    else {

      var passData = new FormData();

      passData.append("name", count.name);
      passData.append("contact", count.number);
      passData.append("email", count.email);
      passData.append("category", count.category);
      passData.append("country", count.country);
      passData.append("subcategory", count.subcategory)
      passData.append("requirement", count.requirement);
      passData.append("files", pic);

      var request = await requestsave(passData)
      if (request.status == true) {
        
        setCount({name:"",number:"",email:"",country:"",category:"",subcategory:"",requirement:""})
        setPic({pic:""})
        setCategorychange(true)
        setsubcategorychange(true)
        setsuccess("request form  added successfully")
        setTimeout(() => {
          setsuccess("")
        }, 4000);
      }
    }
  };


  return (
    <>
    <div>
      <div className="req_page">
      <Header />
        <div className="banner_sec">
          <div className="container custom_container">
            <div className="row firstrow">
              <div>
                <p className="sec_title">Request Quote</p>
                <p className="sec_desc">Ready to take your business to the next level? Let's grow your digital presence together.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="form_sec py-5">
          <div className="container custom_container">
            <div className="row">
              <div className="col-lg-7">
                <p className="sec_main">Let us know how we can help</p>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name (Required)</label>
                        <input type="email" name="name" className="form-control" id="exampleInputname1" aria-describedby="emailHelp" value={count?.name} onChange={(event) => changefn(event)} />
                        <span className="errors_style" id="name-error" >{errors && errors?.name}</span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                        <input type="email" name="number" className="form-control" id="exampleInputnum1" aria-describedby="emailHelp" value={count.number} onChange={(event) => changefn(event)} />
                        <span className="errors_style" id="contact-error" >{errors && errors.number}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email (required)</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={count?.email} onChange={(event) => changefn(event)} />
                        <span className="errors_style" id="email-error" >{errors && errors?.email}</span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
                        <input type="email" name="country" className="form-control" id="exampleInputcountry1" aria-describedby="emailHelp" value={count?.country} onChange={(event) => changefn(event)} />
                        <span className="errors_style" id="country-error" >{errors && errors?.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Categories</label>

                        <select class="form-select" name="category" aria-label="Default select example" onChange={(e) => Subcategoryfn(e)}>
                          <option id="default"  selected={categorychange} >Open this select menu</option>
                          {/* <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option> */}
                          {category?.data?.length > 0 && category?.data?.map((val) => { return <option value={JSON.stringify(val)}>{val?.category}</option> })}
                        </select>
                        <span className="errors_style" id="category-error" >{errors && errors?.category}</span>
                      </div>
                    </div>
                  </div>
                  {/* <div class="row ser_list">
          <div class="col-12">
            <div class="mb-3"  id="services1">
              <label for="exampleInputEmail1" class="form-label">Services</label>
              <ul class="nav nav-tabs" >
                <li class="nav-item">
                  <a class="nav-link active" data-bs-toggle="tab" href="#home">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#menu1">Menu 1</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#menu2">Menu 2</a>
                </li>
              </ul>
              <span id="category-error" ></span>
              
             
            </div>
          </div>
      </div> */}
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Services Categories</label>
                        <select className="form-select" name="subcategory" aria-label="Default select example" id="services2" onChange={(event) => changefn(event)}>
                       <option id="defaultsubcategory" selected={subcategorychange}>Open this select menu</option>
                          {/* <option value={1}>One</option>
                          <option value={2}>Two</option>
                          <option value={3}>Three</option>  */}
                          {subcategory?.length > 0 && subcategory?.map((val) => { return <option value={val}>{val}</option> })}
                        </select>
                        <span className="errors_style" id="subcategory-error" >{errors && errors.subcategory}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Requirement</label>
                        <textarea className="form-control" name="requirement" id="requirement1" rows={3} defaultValue={""} value={count.requirement} onChange={(event) => changefn(event)} />
                        <span className="errors_style" id="requirement-error" >{errors && errors.requirement}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">Upload File</label>
                      <div className="upload_file">
                        <p>Drag file here or click the Button below</p>
                        <input type="file" id="upload" hidden onChange={(event) => onChangeValue(event)} />
                        <label htmlFor="upload">Choose file</label>{pic?.name}
                      </div>
                      <span className="errors_style" id="file-error" />
                    </div>
                  </div>
                  <p>
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                    I have read and agree with Nounq Privacy policy.
                  </p>
                  <div className="btnsec my-4">
                    <button type="button" className="btn btn-blue" id="requestquotesubmit" onClick={(event) => onSubmit(event)}>Request a quote</button>
                    {success=="" ? <></> :<p class="text-success text-center" id="req_sumbit_success_msg_contact">{success}</p>}
                  </div>
                  <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                </form>
              </div>
              <div className="col-lg-5 offset-xl-1 col-xl-4 rightsec">
                <p className="sec_main">Directly Contact</p>
                <div className="row">
                  <div className="pf_sec">
                    <div>
                      <img src={require("../assets/images/Home/pf1.webp")} className="img-fluid profile_imgs" alt="profile" />
                    </div>
                    <div>
                      <p className="mini_head">New Business</p>
                      <p className="main_head">Sales &amp; Marketing</p>
                    </div>
                  </div>
                  <ul className="req_ul">
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-brands fa-telegram" />
                      </div>
                      <div>
                        <p className="social_head">Telegram</p>
                        <Link className="social_link" to="https://telegram.me/nounq" target="_blank">Nounq</Link>
                      </div>
                    </div></li>
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-brands fa-whatsapp" />
                      </div>
                      <div>
                        <p className="social_head">WhatsApp</p>
                        <Link className="social_link" to="https://api.whatsapp.com/send?phone=9363559353" target="_blank">+91 9363559353</Link>
                      </div>
                    </div></li>
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-brands fa-skype" />
                      </div>
                      <div>
                        <p className="social_head">Skype</p>
                        <Link className="social_link" to="https://join.skype.com/invite/VUEjkrfuWfF7" target="_blank">Live.cid.e1f935a12486c5f4</Link>
                      </div>
                    </div></li>
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-solid fa-envelope" />
                      </div>
                      <div>
                        <p className="social_head">Drop an Email</p>
                        <Link className="social_link" to="mailto:sales@nounq.com" target="_blank">sales@nounq.com</Link>
                      </div>
                    </div></li>
                  </ul>
                </div>
                <div className="row">
                  <div className="pf_sec">
                    <div>
                      <img src={require("../assets/images/Home/profile.webp")} className="img-fluid profile_imgs" alt="profile" />
                    </div>
                    <div>
                      <p className="mini_head">Careers</p>
                      <p className="main_head">Head of Recuriment</p>
                    </div>
                  </div>
                  <ul className="req_ul">
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-brands fa-whatsapp" />
                      </div>
                      <div>
                        <p className="social_head">WhatsApp</p>
                        <Link className="social_link" to="https://api.whatsapp.com/send?phone=9363559353" target="_blank">+91 9363559353</Link>
                      </div>
                    </div></li>
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-solid fa-envelope" />
                      </div>
                      <div>
                        <p className="social_head">Drop an Email</p>
                        <Link className="social_link" to="mailto:sales@nounq.com" target="_blank">sales@nounq.com</Link>
                      </div>
                    </div></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="address_sec py-4">
          <div className="container custom_container">
            <div className="row first_row justify-content-center">
              <div className="col-lg-6">
                <p className="head">Madurai</p>
                <p className="sec_desc">No.8, Sokkanadhar Street,<br />
                  Thirunagar,<br />
                  Madurai -625006,<br />
                  Tamilnadu, India.
                </p>
                <Link className="link" to="mailto:sales@nounq.com" target="_blank">sales@nounq.com</Link>
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
        </div>
        <div className="footer_last_sec pt-5">
          <div className="top_height">
            <div className="container custom_container">
              <p className="footer_til">Explore and Learn More</p>
              <div className="row">
                <div className="col-lg-3">
                  <p className="list_title">Services</p>
                  <ul className="footer_ul">
                    <li><a href> Search Engine Optimization (SEO)</a></li>
                    <li><a href>Social Media Marketing</a></li>
                    <li><a href>Pay Per Click (PPC)</a></li>
                    <li><a href>Content Marketing</a></li>
                    <li><a href>Email Marketing</a></li>
                    <li><a href>Reputation Management</a></li>
                    <li><a href>App Store Optimization(ASO)</a></li>
                    <li><a href>Ecommerce SEO</a></li>
                    <li><a href>Web Design &amp; Development</a></li>
                  </ul>
                </div>
                <div className="col-lg-3">
                  <p className="list_title">Industries</p>
                  <ul className="footer_ul">
                    <li><a href>Digital Marketing for Real Estate</a></li>
                    <li><a href>Digital Marketing for Healthcare</a></li>
                    <li><a href>Digital Marketing for Law Firms</a></li>
                    <li><a href>Digital Marketing for Restaurants</a></li>
                    <li><a href>Digital Marketing for Startups</a></li>
                    <li><a href>Digital Marketing for Education</a></li>
                    <li><a href>Digital Marketing for Ecommerce</a></li>
                    <li><a href>Digital Marketing for Software Companies</a></li>
                    <li><a href>Digital Marketing for Travel and Tourism</a></li>
                  </ul>
                </div>
                <div className="col-lg-3">
                  <p className="list_title">About</p>
                  <ul className="footer_ul">
                    <li><a href>Our Company</a></li>
                    <li><a href>Blog</a></li>
                    <li><a href>Careers</a></li>
                    <li><a href>Sitemap</a></li>
                    <li><a href>Case Studies</a></li>
                    <li><a href>Contact Us</a></li>
                  </ul>
                </div>
                <div className="col-lg-3 lastsec">
                  <p className="list_title"><i className="fa fa-solid fa-comments" /> Let's Talk</p>
                  <ul className="footer_ul">
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-brands fa-telegram" />
                      </div>
                      <div>
                        <p>Telegram</p>
                        <Link className="social_link" to="https://telegram.me/nounq" target="_blank">Get a Proposal</Link>
                      </div>
                    </div></li>
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-brands fa-whatsapp" />
                      </div>
                      <div>
                        <p>WhatsApp</p>
                        <Link className="social_link" to="https://api.whatsapp.com/send?phone=9363559353" target="_blank">+91 9363559353</Link>
                      </div>
                    </div></li>
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-brands fa-skype" />
                      </div>
                      <div>
                        <p>Skype</p>
                        <Link className="social_link" to="https://join.skype.com/invite/VUEjkrfuWfF7" target="_blank">Live.cid.e1f935a12486c5f4</Link>
                      </div>
                    </div></li>
                    <li><div className="social_div">
                      <div>
                        <i className="fa fa-solid fa-envelope" />
                      </div>
                      <div>
                        <p>Drop an Email</p>
                        <Link className="social_link" to="mailto:sales@nounq.com" target="_blank">sales@nounq.com</Link>
                      </div>
                    </div></li>
                  </ul>
                </div>
              </div>
              <div className="row mt-4 logosec">
                <div className="col-lg-3 leftsec">
                  <img src={require("../assets/images/Home/logo_white.webp")} className="img-fluid logo" alt="logo" width="200px" />
                  <p className="sec_desc">Join hands with us to increase your brands growth and success with our quality marketing services.</p>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <p className="list_title">Office Locations</p>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <p>Madurai</p>
                      <p>No.8, Sokkanadhar Street,
                        Thirunagar, Madurai -625006,
                        Tamilnadu, India</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <p className="list_title">Connect With US Today!</p>
                  <div className="social_icons">
                    <Link to="https://www.facebook.com/nounqofficial/" target="_blank"><i className="fa fa-brands fa-facebook-f" /></Link>
                    <Link to="https://www.linkedin.com/company/nounq" target="_blank"><i className="fa fa-brands fa-linkedin" /></Link>
                    <Link to="https://www.youtube.com/@NounQTechnologies" target="_blank"><i className="fa fa-brands fa-youtube" /></Link>
                    <Link to="mailto:sales@nounq.com" target="_blank"><i className="fa fa-solid fa-envelope" /></Link>
                    <Link to="https://www.instagram.com/nounqofficial/" target="_blank"> <i className="fa fa-brands fa-instagram" /></Link>
                    <Link to="https://twitter.com/NounqOfficial" target="_blank"><i className="fa fa-brands fa-twitter" /></Link>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <p>Copyright © 2023 NounQ Technologies Private Limited. All Rights Reserved. </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
    </>
  );
}

export default Requestquote;