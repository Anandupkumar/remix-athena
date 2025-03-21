import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
// import "../../styles/home.scss";
import HomeNavbar from "../components/home/HomeNavbar";
import HomeBody from "../components/home/HomeBody"
import HomeSales from "../components/home/HomeSales";
import MostSoldProducts from "../components/home/MostSoldProducts";
import HomeAds from "../components/home/HomeAds";
import HomeRecomment from "../components/home/HomeRecomment";
import HomeSavings from "../components/home/HomeSavings";
import BrandStore from "../components/home/BrandStore";
import HomeBodyG from "../components/home/HomeBodyG";
import Footer from "../components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {


  return (
    <>
      <div className="home-header-container">
        <HomeNavbar />
      </div>

      <div className="body-container">
        <HomeBody />
        {/* <HomeBodyG /> */}
      </div>
      {/* 
      <div className="sales-container">
        <HomeSales />
      </div>

      <div className="sold-product-container">
        <MostSoldProducts />
      </div> */}

      {/* <div className="ad-container">
        <HomeAds />
      </div> */}

      <div className="savings-container">
        <HomeSavings />
      </div >

      <div className="recom-container">
        <HomeRecomment />
      </div >

      {/* <div className="brand-container">
        <BrandStore />
      </div> */}

      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
}
