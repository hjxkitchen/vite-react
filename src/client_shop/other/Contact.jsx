import React, { Fragment, useContext, useState } from "react";
import Navbar from "../../system/Navbar";
import Cookies from "js-cookie";
import axios from "axios";

// import PublicNavbar from "../PublicNavbar";
import { UserContext, CartContext } from "../../App";

function Contact() {
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    reason: "General",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Access the values in formData here
    console.log("Form data:", formData);
    // Add your logic to handle form submission, e.g., send data to the server
    try {
      // const body = { products: products };
      // const response = await fetch("http://localhost:000/productsarray", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/webmessage",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log(response.data);
      alert("Message sent successfully");
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const phone = () => {
    alert("+255 693 391 049");
  };
  const email = () => {
    alert("info@zahabenergy.com");
  };
  const facebook = () => {
    alert("Zahab Energy");
  };
  const instagram = () => {
    alert("Zahab Energy");
  };
  const youtube = () => {
    alert("Zahab Energy");
  };

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
              <a href="#">
                <i class="fas fa-phone-square fa-3x  " onClick={phone}></i>
              </a>
              {/* phone or sms */}
              <a href="#">
                <i class="fas fa-sms fa-3x ml-3" onClick={phone}></i>
              </a>
              {/* whatsapp */}
              <a href="#">
                <i
                  class="fab fa-whatsapp-square fa-3x ml-3"
                  onClick={phone}
                ></i>
              </a>
              {/* email */}
              <a href="#">
                <i
                  class="fas fa-envelope-square fa-3x ml-3"
                  onClick={email}
                ></i>
              </a>
              <a href="#">
                <i
                  class="fab fa-facebook-square fa-3x ml-3"
                  onClick={facebook}
                ></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram fa-3x ml-3" onClick={instagram}></i>
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
          <div className="col-lg-5">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title text-center">Contact Form</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group text-center">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group text-center">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group text-center">
                    <label htmlFor="reason">Reason for contact</label>
                    <select
                      className="form-control"
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                    >
                      <option>General</option>
                      <option>Order</option>
                      <option>Payment</option>
                      <option>Delivery</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group text-center">
                    <label htmlFor="message">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="3"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
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
