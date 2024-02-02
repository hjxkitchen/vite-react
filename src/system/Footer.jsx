import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#333", color: "#fff", padding: "50px 0" }}
      className="mt-5"
    >
      <div className="container footer">
        <div className="row">
          <div className="col-12 col-md text-center text-md-left mt-3">
            <h4>Company</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/about" style={{ color: "#fff" }}>
                  About us
                </a>
              </li>
              <li>
                <a href="/careers" style={{ color: "#fff" }}>
                  Careers
                </a>
              </li>
              <li>
                <a href="/adminlogin" style={{ color: "#fff" }}>
                  Admin Login
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md text-center text-md-left mt-3">
            <h4>Resources</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/blog" style={{ color: "#fff" }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="/help" style={{ color: "#fff" }}>
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md text-center text-md-left mt-3">
            <h4>Follow us</h4>
            <ul className="list-unstyled">
              {/* social media icons */}
              <li>
                <a href="https://www.facebook.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-facebook"></i> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-youtube"></i> Youtube
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-linkedin"></i> Linkedin
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md text-center text-md-left mt-3">
            <h4>Contact us</h4>
            <ul className="list-unstyled">
              {/* social media icons */}
              <li>
                <a href="tel:255693391049" style={{ color: "#fff" }}>
                  <i className="fas fab fa-phone"></i> Call
                </a>
              </li>
              <li>
                <a
                  href="mailto:
                husseincollege@gmail.com    "
                  style={{ color: "#fff" }}
                >
                  <i className="fas fab fa-envelope"></i> Email
                </a>
              </li>
              <li>
                <a href="https://wa.me/255693391049" style={{ color: "#fff" }}>
                  <i className="fab fa-whatsapp"></i> Whatsapp
                </a>
              </li>
              {/* wechat  */}
              {/* <li>
                <a href="https://www.wechat.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-weixin"></i> Wechat
                </a>
              </li> */}
              {/* cust support */}
              <li>
                <a href="/contactus" style={{ color: "#fff" }}>
                  <i className="fas fab fa-headset"></i> Customer Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center" style={{ marginTop: "100px" }}>
            <p>&copy; {new Date().getFullYear()} HJX. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
