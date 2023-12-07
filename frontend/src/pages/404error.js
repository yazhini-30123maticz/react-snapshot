import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Errorpage() {
  return (
    <div>
      <div class="not_found">
        <div class="text-center">
          <h1 class="h1">Sorry, The Page You Are Looking For Is Not Available</h1>
          <p>
            The link you followed may be broken, or the page may have been removed. Go back to
            <a href="/" class="btnType1 animate_scroll mr-sm-4 px-2">
              homepage
              <i class="fa fa-arrow-right pr-2" aria-hidden="true"></i>
            </a>
          </p>

          {/* <img src="assets/images/notfound.webp" alt="notfoundimage" width="500" height="500" /> */}
          <img src={require("../assets/images/notfound.webp")} alt="notfoundimage" width="500" height="500" />
        </div>
      </div>
      {/* <div className="errorpage">
            <div className="row flex-grow">
              <div className="col-lg-8 mx-auto text-white">
                <div className="row align-items-center d-flex flex-row">
                  <div className="col-lg-6 text-lg-right pr-lg-4">
                    <h1 className="h1 mb-0">404</h1>
                  </div>
                  <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                    <h2>SORRY!</h2>
                    <h3 className="font-weight-light">The page you’re looking for was not found.</h3>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12 text-center mt-xl-2">
                    <Link className="text-white font-weight-medium" to="/dashboard">Back to home</Link>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
    </div>
  )
}




export default Errorpage;
