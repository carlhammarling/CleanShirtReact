import React from "react";
import './Categories.scss'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <article className="categories">
      <section>
        <h2>Shop by Category</h2>
      </section>
      <section>
        <ul>
          <li>
            <Link to="/products">
              News<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
          <li>
            <Link to="/products">
              T-Shirts<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
          <li>
            <Link to="/products">
              Women<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
          <li>
            <Link to="/products">
              Men<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
          <li>
            <Link className="red" to="/products">
              On Sale<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default Categories;
