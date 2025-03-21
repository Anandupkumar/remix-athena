// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/categories.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
    Outlet, useNavigate
} from "@remix-run/react";
import { getCategoryCarousel } from "../../utils/api";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };


export default function Categories() {

    const navigate = useNavigate();

    const [categoryCarousel, setCategoryCarousel] = useState([]);
    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setShowSkeleton(true);
            try {
                const categoryCarousel = await getCategoryCarousel();
                if (categoryCarousel) {
                    setShowSkeleton(false);
                    setCategoryCarousel(categoryCarousel);
                } else {
                    setShowSkeleton(false);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                setShowSkeleton(false);
            }
        };

        fetchData();
    }, []);


    const handleRedirectToSubCategories = (category) => {
        navigate(`/sub-categories?id=${category.id}&name=${category.name}`);
    }

    return (
        <div className="products-container">
            <div className="products-navbar">
                <Navbar />
            </div>
            <div className="products-content-container">
                <div className="row product-heading">
                    <h1 className="product-head">
                        CATEGORIES
                    </h1>
                    {/* <span className="heading-description">
                        Premium construction materials that are tried, tested, and trusted by builders for superior quality and reliability. Upgrade your projects with the best in the industry!
                    </span> */}
                </div>
                {categoryCarousel.length > 0 ? (
                    <div className="row">

                        <div className="categories-container">
                            {categoryCarousel.map((category, index) => (
                                <div className="category-card" key={index} onClick={() => handleRedirectToSubCategories(category)}>
                                    <img src={category.image_path} alt={category.name} className="category-image" />
                                    <div className="category-title">{category.name}</div>
                                </div>
                            ))}
                        </div>

                    </div>
                ) : showSkeleton ? (
                    <Skeleton count={10} />
                ) : (
                    <div className="empty-address">
                        <h4>
                            No categories found.
                        </h4>
                    </div>
                )}
            </div>
            {/* <Outlet /> */}
            <div className="products-footer">
                <Footer />
            </div>
        </div>
    );
}
