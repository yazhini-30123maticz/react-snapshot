import React, { useEffect, useState } from 'react';
import "../assets/css/footer.css";
import { Link } from 'react-router-dom';
import { isEmpty } from '../config/common';
import Logos from "../assets/images/Home/logo_white.webp"
import { contactsave, categoryfind, subscribesave } from '../api/api';
import { data } from 'jquery';
// const Validator = require("validator");
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const isEmpty = require("is-empty");

function Footer() {
  const [count, setCount] = useState({});
  const [cat, setCat] = useState({});
  const [subcat, setsubcat] = useState({})
  const [errors, setError] = useState()
  const [categorychange, setCategorychange] = useState(true)
  const [subcategorychange, setsubcategorychange] = useState(true)
  const [success, setsuccess] = useState("")

  const changefn = (event) => {
    setError({})
    const name = event.target.name;
    setCount({
      ...count,
      [name]: event.target.value
    });
  }
  useEffect(() => {
    catfn();
  }, [])

  const validation = async () => {
    let errors = {};
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var allowedExtensions = /(\.pdf|\.jpg|\.png)$/i;
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
    if (isEmpty(count?.socialid)) {
      errors.socialId = "social Id field is required";
    }
    if (isEmpty(count?.category)) {
      errors.category = "category field is required";
    }
    if (isEmpty(count?.subcategory)) {
      errors.subcategory = "subcategory field is required";
    }
    if (isEmpty(count?.description)) {
      errors.description = "description field is required";
    }
    return errors
  }



  const catfn = async () => {
    var category = await categoryfind()
    if (category) {
      setCat(category)
      setCategorychange(false)
      setsubcategorychange(false)

    }
  }


  const subcatfn = async (e) => {
    setError({})
    
    var sub = JSON.parse(e.target.value).subcategory
    setCount({
      ...count,
      "category": JSON.parse(e.target.value).category
    });
    setsubcat(sub)
  }


  const onSubmit = async (event) => {
    var val = await validation();
 
    if (!isEmpty(val)) {
      setError(val)
    }
    else {
      var contact = await contactsave(count)
    
      if (contact.status == true) {
        setCount({ name: "", number: "", email: "", country: "", socialid: "", category: "", subcategory: "", description: "" })
        setCategorychange(true)
        setsubcategorychange(true)
        setsuccess("contact submitted successfully")
        setTimeout(() => {
          setsuccess("")
        }, 5000);
      }
      else {
        console.log("error ocuured");
      }
    }
  };

  return (
    <>

      <div className='footerpage'>
        <div className="footersec">
          <div className="contactus_sec py-5" id="contact_form_sec">
            <div className="container custom_container">
              <div className="row first_row">
                <h2 className="sec_title">Contact Us</h2>
                <p className="sec_desc">Feel free to share your requirements and we are happy to join hands with you.</p>
              </div>
              <div className="row sec_row">
                <div className="coontact_us_card">
                  <div className="row">
                    <div className="col-lg-4 leftsec">
                      <p className="sec_title"> We'd Love To Hear<br />
                        From You</p>
                      <div className="sec_div">
                        <div>
                          <p className="circle_wht dotted">1</p>
                        </div>
                        <div>
                          <p className="sec-title">Fill up your details</p>
                          <p className="sec_desc">Get Custom Solutions Recommendations Estimates. Confidentiality &amp; Same Day Response Guaranteed!</p>
                        </div>
                      </div>
                      <div className="sec_div">
                        <div>
                          <p className="circle_wht">2</p>
                        </div>
                        <div>
                          <p className="sec-title">What's next ?</p>
                          <p className="sec_desc">One of our Account Managers will contact you Shortly</p>
                          <img src={require("../assets/images/Home/contact_us.webp")} className="img-fluid contact_us_img" alt="contact_us" width={120} />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8 rightsec">
                      <form>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-4">
                              <label htmlFor="exampleInputname1" className="form-label">Name</label>
                              <input type="text" name="name" className="form-control" id="exampleInputname1" aria-describedby="name" value={count?.name || ''} onChange={(event) => changefn(event)} />
                              <span className="errors_style" id="name-error" >{errors && errors.name}</span>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="mb-4">
                              <label htmlFor="exampleInputEmail1" className="form-label">Email Id</label>
                              <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={count?.email || ''} onChange={(event) => changefn(event)} />
                              <span className="errors_style" id="email-error" >{errors && errors.email}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-4">
                              <label htmlFor="exampleInputnum1" className="form-label">Contact Number</label>
                              <input type="number" name="number" className="form-control" id="exampleInputnum1" aria-describedby="numHelp" value={count.number || ''} onChange={(event) => changefn(event)} />
                              <span className="errors_style" id="contact-error" >{errors && errors.number}</span>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="mb-4">
                              <label htmlFor="exampleInputcountry1" className="form-label">Country</label>
                              <input type="text" name="country" className="form-control" id="exampleInputcountry1" aria-describedby="countryHelp" value={count.country || ''} onChange={(event) => changefn(event)} />
                              <span className="errors_style" id="country-error" >{errors && errors.country}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-4">
                              <label htmlFor="exampleInputsocial1" className="form-label">WhatsApp/Telegram/Skype Id</label>
                              <input type="email" name="socialid" className="form-control" id="exampleInputsocial1" aria-describedby="socialHelp" value={count.socialid || ''} onChange={(event) => changefn(event)} />
                              <span className="errors_style" id="socialId-error" >{errors && errors.socialId}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-4">
                              <label htmlFor="exampleInputsocial1" className="form-label">Services</label>

                              <select class="form-select" name="category" aria-label="Default select example" onChange={(e) => subcatfn(e)}>
                                <option selected={categorychange}>Select</option>
                                {cat?.data?.length > 0 && cat?.data?.map((val) => { return <option value={JSON.stringify(val)}>{val.category}</option> })}
                              </select>
                              <span className="errors_style" id="category-error" >{errors && errors.category}</span>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="mb-4">
                              <label htmlFor="exampleInputsocial1" className="form-label">Categories</label>
                              <select className="form-select" name="subcategory" aria-label="Default select example" id="services2" onChange={(event) => changefn(event)} >
                                <option selected={subcategorychange}>Select</option>
                                {subcat?.length > 0 && subcat?.map((val) => { return <option value={val}>{val}</option> })}
                              </select>
                              <span className="errors_style" id="subcategory-error" >{errors && errors.subcategory}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-4">
                              <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                              <textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows={3} defaultValue={""} value={count.description || ''} onChange={(event) => changefn(event)} />
                              <span className="errors_style" id="description-error" >{errors && errors.description}</span>
                            </div>
                          </div>
                        </div>
                        <div className="btnsec mt-4">
                          <button type="button" name="submit" id="cotactSubmit" className="btn btn-white" onClick={(event) => onSubmit(event)}>Submit</button>
                          {/* <p class="text-success d-none text-center" id="req_sumbit_suc_msg_contact">Request Submitted</p> */}
                          {success=="" ? <></> :<p class="text-white mt-2" id="req_sumbit_success_msg_contact">{success}</p>}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_last_sec">
            <div className="top_height">
              <div className="container custom_container">
                <p className="footer_til">Explore and Learn More</p>
                <div className="row">
                  <div className="col-lg-3">
                    <p className="list_title">Services</p>
                    <ul className="footer_ul">
                      <li><Link to="/seo-services">Search Engine Optimization (SEO)</Link></li>
                      <li><a href>Social Media Marketing</a></li>
                      <li><Link to="/ppc-services">Pay Per Click (PPC)</Link></li>
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
                      <li> <Link to="/blog">Blog</Link></li>
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
                    <img src={Logos} className="img-fluid logo" alt="logo" width="200px" />
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

export default Footer;