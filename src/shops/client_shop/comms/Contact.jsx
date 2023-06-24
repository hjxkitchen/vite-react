import React, { Fragment, useContext } from "react";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
import { UserContext, CartContext } from "../../index";

function Contact() {
  const user = useContext(UserContext);
  const cartToken = useContext(CartContext);
  return (
    // <UserContext.Consumer >
    <Fragment>
      {/* navbar conditionaly rendered */}
      {user && <Navbar />}
      {!user && <PublicNavbar />}

      <h1 className="text-center mt-5">Contact us</h1>

      {/* <div className="container mt-5 mb-5"> */}
      <div className="col">
        {/* social media and contacts */}
        <div className="card mb-4">
          <div className="card-body ">
            <h5
              className="card-title
                      text-center"
            >
              Contacts
            </h5>
            {/* with icons */}
            <div className="d-flex justify-content-center">
              {/* phone */}
              <a href="https://www.phone.com/">
                <i className="fas fa-phone-square fa-3x  "></i>
              </a>
              {/* phone or sms */}
              <a href="https://www.sms.com/">
                <i
                  className="fas fa-sms
                          fa-3x ml-3"
                ></i>
              </a>
              {/* whatsapp */}
              <a href="https://www.whatsapp.com/">
                <i className="fab fa-whatsapp-square fa-3x ml-3"></i>
              </a>
              {/* email */}
              <a href="https://www.gmail.com/">
                <i className="fas fa-envelope-square fa-3x ml-3"></i>
              </a>
              <a href="https://www.facebook.com/zahabsolar">
                <i className="fab fa-facebook-square fa-3x ml-3"></i>
              </a>
              <a href="https://www.instagram.com/">
                <i className="fab fa-instagram fa-3x ml-3"></i>
              </a>
              {/* youtube */}
              {/* <a href="https://www.youtube.com/">
                          <i className="fab fa-youtube-square fa-3x ml-3"></i>
                        </a> */}
              {/* linkedin */}
              {/* <a href="https://www.linkedin.com/">
                          <i className="fab fa-linkedin fa-3x ml-3"></i>
                        </a>
                        <a href="https://www.twitter.com/">
                          <i className="fab fa-twitter-square fa-3x ml-3"></i>
                        </a> */}
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="row justify-content-center">
          <div className="col-lg-5">
            {/* contact form */}
            <div className="card mb-4">
              <div className="card-body">
                <h5
                  className="card-title
                      text-center"
                >
                  Contact Form
                </h5>
                <form>
                  <div
                    className="form-group
                        text-center"
                  >
                    <label for="exampleFormControlInput1">Name</label>
                    <input
                      type="name"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="
                          Enter your name"
                    />
                  </div>
                  <div
                    className="form-group
                        text-center"
                  >
                    <label for="exampleFormControlInput1">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="
                          Enter your phone number"
                    />
                  </div>
                  {/* select reason for contact */}
                  <div
                    className="form-group
                        text-center"
                  >
                    <label for="exampleFormControlSelect1">
                      Reason for contact
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option>General</option>
                      <option>Order</option>
                      <option>Payment</option>
                      <option>Delivery</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* <div className="form-group
                        text-center">
                          <label for="exampleFormControlInput1">Email address</label>
                          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="
                          Enter your email address"/>
                        </div> */}
                  <div
                    className="form-group
                        text-center"
                  >
                    <label for="exampleFormControlTextarea1">Message</label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="container table-responsive">
              <iframe
                title="maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995.7276633678168!2d36.687918329222086!3d-3.372014561063617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdd0868c5b679eaa8!2sZahab%20Solar!5e0!3m2!1sen!2stz!4v1667856628067!5m2!1sen!2stz"
                width="400"
                height="400"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* <div className="row justify-content-center">
            <p>User: {user}</p>
        </div>
        <div className="row justify-content-center">
            <p>CartToken: {cartToken}</p>
        </div> */}
    </Fragment>
    //  </UserContext.Consumer>
  );
}

export default Contact;
