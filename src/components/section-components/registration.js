import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';

class Registration extends Component {


    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'
        let data = sectiondata.whychooseus


    return <div className="register-page-area pd-bottom-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-4 col-lg-5 col-md-6 mb-5 mb-md-0">
                <form className="contact-form-wrap contact-form-bg">
                  <h4>Login</h4>
                  <div className="rld-single-input">
                    <input type="text" placeholder="Entry Login" />
                  </div>
                  <div className="rld-single-input">
                    <input type="password" placeholder="Entry Password" />
                  </div>
                  <div className="btn-wrap">
                    <button className="btn btn-yellow">Sign In</button>
                  </div>
                </form>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6">
                <form className="contact-form-wrap contact-form-bg">
                  <h4>Registration</h4>
                  <div className="rld-single-input">
                    <input type="text" placeholder="First Name" />
                  </div>
                  <div className="rld-single-input">
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <div className="rld-single-input">
                    <input type="text" placeholder="Select User role" />
                  </div>
                  <div className="rld-single-input">
                    <input type="text" placeholder="Password" />
                  </div>
                  <div className="rld-single-input">
                    <input type="text" placeholder="Re-enter password" />
                  </div>
                  <div className="btn-wrap">
                    <button className="btn btn-yellow">Register</button>
                  </div>
                  <ul className="social-icon">
                    <li className="ml-0">
                      <a href="#" target="_blank"><i className="fa fa-facebook  " /></a>
                    </li>
                    <li>
                      <a href="#" target="_blank"><i className="fa fa-twitter  " /></a>
                    </li>
                    <li>
                      <a href="#" target="_blank"><i className="fa fa-linkedin" /></a>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
        }
}

export default Registration