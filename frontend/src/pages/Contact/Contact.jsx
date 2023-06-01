import React from "react";
import "./Contact.scss";

const Contact = () => {
  return (
    <main className="contact">
      {/* <!--TOPIMG--> */}
      <article className="contactBanner">
        <img
          src="https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Clean Shirt HQ"
          style={{ width: "100%" }}
        />
        <section className="slogan border">
          <h1 className="medium white">VISIT OUR HEADQUARTER</h1>
          <h1 className="light white">
            IN SANTO DOMINGO
            <br />
            <span className="black">CLEAN SHiRT!</span>
          </h1>
        </section>
      </article>

      {/* <!-- ARTICLES --> */}
      <article className="contactInfo">
        <section>
          <h1>Where to find us.</h1>
          <p>Clean Shirt International LTD</p>
          <p>Calle de Cruz 420, Santo Domingo, Republica Dominicana</p>
          <p>Phone: +1-809-792-0442</p>
        </section>
        <section>
          <h2>Get in touch:</h2>

          <form id="contact">
            <div id="msgForm" className="form">
              <div className="input-group">
                <label className="label" for="msg">
                  Message:
                </label>
                <textarea className="input" id="msg" rows="30" cols="10"></textarea>
              </div>
              <div className="input-group">
                <label className="label" for="name">
                  Full Name:
                </label>
                <input className="input" type="text" id="name" />
              </div>
              <div className="input-group">
                <label className="label" for="email">
                  Email:
                </label>
                <input className="input" type="email" id="email" />
              </div>
              <div className="input-group">
                <label className="label" for="category">
                  Category:
                </label>
                <select className="input" name="category" id="category">
                  <option selected disabled hidden value="category">
                    Choose a category
                  </option>
                  <option value="company">Company Questions</option>
                  <option value="products">Product Questions</option>
                  <option value="complaints">Website Complaints</option>
                </select>
              </div>
              <button className="btnShop" id="send">
                SEND REQUEST
              </button>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
};

export default Contact;
