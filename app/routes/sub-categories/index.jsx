// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/categories.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/ui-components/breadcrumbs";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
    Outlet, useNavigate
} from "@remix-run/react";
import { getSubCategory } from "../../utils/api";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };


export default function SubCategories() {

    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
    const name = new URLSearchParams(location.search).get("name");

    const navigate = useNavigate();

    const [subCategory, setSubCategory] = useState([]);
    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setShowSkeleton(true);
            try {
                const subCategoryData = await getSubCategory(id);
                if (subCategoryData) {
                    setShowSkeleton(false);
                    setSubCategory(subCategoryData);
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


    const handleRedirectToProductList = (category) => {
        navigate(`/product-list?id=${category.id}&name=${category.name}&subName=${name}&subId=${id}`);
    }

    return (
        <div className="products-container">
            <div className="products-navbar">
                <Navbar />
            </div>
            <div className="products-content-container">
                <div>
                    <Breadcrumbs
                        items={[
                            { label: 'Categories', path: '/categories' },
                            { label: name, path: '' },
                            // { label: 'Products', path: '' }
                        ]}
                    />
                    <div className="row product-heading">
                        <h1 className="product-head">
                            {name}
                        </h1>
                        {/* <span className="heading-description">
                        Premium construction materials that are tried, tested, and trusted by builders for superior quality and reliability. Upgrade your projects with the best in the industry!
                    </span> */}
                    </div>
                </div>

                {subCategory.length > 0 ? (
                    <div className="row">

                        <div className="categories-container">
                            {subCategory.map((category, index) => (
                                <div className="category-card" key={index} onClick={() => handleRedirectToProductList(category)}>
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
                            No sub-categories found.
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
