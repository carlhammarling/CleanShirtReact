import { useContext } from "react";
import { Context } from "../../../contexts/Context";
import "./Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  const { gender, setGender, selectedSort, setSelectedSort } =
    useContext(Context);

  return (
    <article className="categories">
      <section>
        <h2>Shop by Category</h2>
      </section>
      <section>
        <ul>
          <li>
            <Link
              to="/products"
              onClick={() => setSelectedSort("createdAtDescending")}
            >
              News<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setSelectedSort("")}>
              T-Shirts<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              onClick={() => {
                setGender(false);
                setSelectedSort("");
              }}
            >
              Women<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              onClick={() => {
                setGender(true);
                setSelectedSort("");
              }}
            >
              Men<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
          <li>
            <Link
              className="red"
              to="/products"
              onClick={() => setSelectedSort("ascending")}
            >
              On Sale<i className="fa-solid fa-angles-right fa-xs"></i>
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default Categories;
