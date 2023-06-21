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
        <section className="aboutProject">
          <h1>
            <span>
              <i className="fa-solid fa-angles-right fa-xs"></i>
            </span>
            About This Project
            <span>
              <i className="fa-solid fa-angles-left fa-xs"></i>
            </span>
          </h1>

          <p>
            Hi! My name is Carl, a frontend developer student with fullstack
            ambitions. I just completed the first year of KYH's 2 year program.
          </p>
          <p className="last">
            My primary goal for this project was to develop a fully functional
            e-commerce website where you can view products, complete purchases,
            register users, browse previous orders, and even write reviews. To
            start off, I decided to design it with a mobile-friendly approach.
          </p>

          <h2>
            <span>
              <i className="fa-solid fa-angles-right fa-xs"></i>
            </span>
            Tech Stack
            <span>
              <i className="fa-solid fa-angles-left fa-xs"></i>
            </span>
          </h2>
          <p>
            Here are some of the tools and techniques I have used to create this
            website.
          </p>
        </section>
        <section>
          <div className="techGrid">
            <div className="techniques">
              <i class="fa-brands fa-react fa-2xl"></i>
              <p>
                React - For my frontend I have used React including techniques
                like Redux, Context and the new Browser Router.
              </p>
            </div>
            <div className="techniques">
              <i class="fa-brands fa-node fa-2xl"></i>
              <p>
                Node.js For my backend, with a variety of extensions to add
                extra functionality and speeding up the development.
              </p>
            </div>
            <div className="techniques">
              <i class="fa-brands fa-sass fa-2xl"></i>
              <p>
                Sass - I like to use Sass to be able to scope my css and create
                mixins to re-use my code.
              </p>
            </div>
            <div className="techniques">
              <img
                src="https://cf-assets.www.cloudflare.com/slt3lc6tev37/4JKMdVVzNFkhE3fd4FiPOL/b322e6e99ab9b3fbe5ffd0100e2d7b47/Axios-twitter-og.png"
                alt=""
              />

              <p>
                Axios - To make HTTP requests and handling responses more
                efficiently.
              </p>
            </div>
            <div className="techniques">
              <img
                src="https://geekflare.com/wp-content/uploads/2023/01/expressjs.png"
                alt=""
              />
              <p>
                Express.js - To create the web server, handle routes, and manage
                middleware, define API endpoints, and ensure accessibility for
                the frontend.
              </p>
            </div>
            <div className="techniques">
              <img
                src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress"
                alt=""
              />
              <p>
                MongoDB - For creating my database, users are connected to
                orders and reviews, which are linked through different schemas
                in the backend.
              </p>
            </div>

            <div className="techniques">
              <img
                src="https://assets.stickpng.com/images/62c6bc0beee9410fe137d91e.png"
                alt=""
              />
              <p>
                Figma - Used for designing wireframes prior to transforming my
                vision into reality.
              </p>
            </div>
            <div className="techniques">
              {/* <i class="fa-brands fa-figma"></i> */}
              <img
                src="https://seeklogo.com/images/J/jwt-logo-11B708E375-seeklogo.com.png"
                alt=""
              />
              <p>
                Jason Web Token - For handling validation including registrations and
                logins.
              </p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Contact;
