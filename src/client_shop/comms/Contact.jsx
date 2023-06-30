import React, { Fragment, useContext } from "react";
import Navbar from "../../system/Navbar";

// import PublicNavbar from "../PublicNavbar";
import { UserContext, CartContext } from "../../App";

function Contact() {
  const user = useContext(UserContext);
  const cartToken = useContext(CartContext);
  return (
    // <UserContext.Consumer >
    <Fragment>
      {/* navbar conditionaly rendered */}
      <Navbar />

      <h1 class="text-center mt-5">Contact us</h1>

      {/* <div class="container mt-5 mb-5"> */}
      <div class="col">
        {/* social media and contacts */}
        <div class="card mb-4">
          <div class="card-body ">
            <h5
              class="card-title
                      text-center"
            >
              Contacts
            </h5>
            {/* with icons */}
            <div class="d-flex justify-content-center">
              {/* phone */}
              <a href="https://www.phone.com/">
                <i class="fas fa-phone-square fa-3x  "></i>
              </a>
              {/* phone or sms */}
              <a href="https://www.sms.com/">
                <i
                  class="fas fa-sms
                          fa-3x ml-3"
                ></i>
              </a>
              {/* whatsapp */}
              <a href="https://www.whatsapp.com/">
                <i class="fab fa-whatsapp-square fa-3x ml-3"></i>
              </a>
              {/* email */}
              <a href="https://www.gmail.com/">
                <i class="fas fa-envelope-square fa-3x ml-3"></i>
              </a>
              <a href="https://www.facebook.com/zahabsolar">
                <i class="fab fa-facebook-square fa-3x ml-3"></i>
              </a>
              <a href="https://www.instagram.com/">
                <i class="fab fa-instagram fa-3x ml-3"></i>
              </a>
              {/* youtube */}
              {/* <a href="https://www.youtube.com/">
                          <i class="fab fa-youtube-square fa-3x ml-3"></i>
                        </a> */}
              {/* linkedin */}
              {/* <a href="https://www.linkedin.com/">
                          <i class="fab fa-linkedin fa-3x ml-3"></i>
                        </a>
                        <a href="https://www.twitter.com/">
                          <i class="fab fa-twitter-square fa-3x ml-3"></i>
                        </a> */}
            </div>
          </div>
        </div>
        {/* </div> */}

        <div class="row justify-content-center">
          <div class="col-lg-5">
            {/* contact form */}
            <div class="card mb-4">
              <div class="card-body">
                <h5
                  class="card-title
                      text-center"
                >
                  Contact Form
                </h5>
                <form>
                  <div
                    class="form-group
                        text-center"
                  >
                    <label for="exampleFormControlInput1">Name</label>
                    <input
                      type="name"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="
                          Enter your name"
                    />
                  </div>
                  <div
                    class="form-group
                        text-center"
                  >
                    <label for="exampleFormControlInput1">Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="
                          Enter your phone number"
                    />
                  </div>
                  {/* select reason for contact */}
                  <div
                    class="form-group
                        text-center"
                  >
                    <label for="exampleFormControlSelect1">
                      Reason for contact
                    </label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>General</option>
                      <option>Order</option>
                      <option>Payment</option>
                      <option>Delivery</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* <div class="form-group
                        text-center">
                          <label for="exampleFormControlInput1">Email address</label>
                          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="
                          Enter your email address"/>
                        </div> */}
                  <div
                    class="form-group
                        text-center"
                  >
                    <label for="exampleFormControlTextarea1">Message</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="container table-responsive">
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

      {/* <div class="row justify-content-center">
            <p>User: {user}</p>
        </div>
        <div class="row justify-content-center">
            <p>CartToken: {cartToken}</p>
        </div> */}
    </Fragment>
    //  </UserContext.Consumer>
  );
}

export default Contact;
