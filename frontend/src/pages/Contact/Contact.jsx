import React from "react";
import { Link } from "react-router-dom";
import profileImg from "../../styles/images/profile.png";
import getContact from "../../styles/images/getContact.png";

import "./Contact.scss";

const Contact = () => {
  return (
    <main className="contact">
      {/* <!--TOPIMG--> */}
      <article className="contactBanner">
        <img
          className="profileImg"
          src={profileImg}
          alt="Carl Hammarling"
          style={{ width: "100%" }}
        />
        <section className="slogan">
          <h1 className="carl">Hi! I am Carl.</h1>
          <h2>And I built this website.</h2>
          {/* <h3 className="light">DO YOU WANT TO GET IN CONTACT?</h3> */}
          <img
            id="getContact"
            src={getContact}
            alt=""
            style={{ width: "90%" }}
          />
          <Link
            to="https://www.linkedin.com/in/carl-hammarling-66b084229/"
            className="getInContact"
            target="_blank"
          >
            <p>Message me on </p>
            <span className="bold">
              Linked in <i className="fa-solid fa-paper-plane fa-xs"></i>
            </span>
          </Link>
        </section>
      </article>

      {/* <!-- ARTICLES --> */}
      <article className="contactInfo">
        <section className="top">
          <h1>Techniques I have used.</h1>
          <div className="techGrid">
            <div className="techniques">
              <i class="fa-brands fa-react fa-2xl"></i>
              <p>React</p>
            </div>
            <div className="techniques">
              <i class="fa-brands fa-node fa-2xl"></i>
              <p>Node.js</p>
            </div>
            <div className="techniques">
              <i class="fa-brands fa-sass fa-2xl"></i>
              <p>Sass</p>
            </div>
            <div className="techniques">
              <img
                src="https://cf-assets.www.cloudflare.com/slt3lc6tev37/4JKMdVVzNFkhE3fd4FiPOL/b322e6e99ab9b3fbe5ffd0100e2d7b47/Axios-twitter-og.png"
                alt=""
                style={{ width: "100%" }}
              />
              <p>Axios</p>
            </div>
            <div className="techniques">
              <img
                src="https://geekflare.com/wp-content/uploads/2023/01/expressjs.png"
                alt=""
                style={{ width: "100%" }}
              />
              <p>Express.js</p>
            </div>
            <div className="techniques">
              <img
                src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress"
                alt=""
                style={{ width: "100%" }}
              />
              <p>MongoDB</p>
            </div>
            <div className="techniques">
              <i className="fa-brands fa-html5 fa-2xl"></i>
              <p>HTML</p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Contact;
