import {} from "react";
import "./Home.scss";
import YellowHomeBanner from "../../components/Banners/YellowHomeBanner/YellowHomeBanner";
import Categories from "../../components/menus/Categories/Categories";
import HomeProductSelection from "../../components/Banners/HomeProductSelection/HomeProductSelection";

const Home = () => {
  return (
    <main className="home">
      <YellowHomeBanner />
      <Categories />

      {/* <!-- SHOP NOW --> */}
      <HomeProductSelection />
    </main>
  );
};

export default Home;
