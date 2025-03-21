import React from "react";
import "../../styles/components/home/HomeBodyG.scss";

const ConstructionBanner = () => {
    return (
        <div className="banner">
            <div className="carousel">
                <div className="carousel-item">
                    <div className="carousel-content">
                        <h1>
                            Tools and Accessories to the <span>Construction</span>
                        </h1>
                        <button className="shop-now-btn">Shop Now</button>
                    </div>
                    <div className="carousel-image">
                        <img
                            src="carousel1.jpg"
                            alt="Tools and Accessories"
                        />
                    </div>
                </div>
                <div className="buying-guide">
                    <h2>
                        <span>Buying Guide</span> Construction Blogs
                    </h2>
                </div>
                <div className="savings">
                    <h2>Big Savings!!</h2>
                    <p>Grab Our Exclusive Deals</p>
                    <button className="shop-now-btn">Shop Now</button>
                </div>
            </div>
            <div className="categories">
                {[
                    "Tapes & Adhesives",
                    "Abrasives",
                    "Trolleys & Ladders",
                    "Plumbing & Sanitary Wares",
                    "Safety & PPE",
                    "Construction Materials",
                    "Pipes & Fittings",
                ].map((category, index) => (
                    <div key={index} className="category-item">
                        <img
                            src={`path/to/${category.toLowerCase().replace(/ & | /g, "-")}-image.jpg`}
                            alt={category}
                        />
                        <span>{category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConstructionBanner;
