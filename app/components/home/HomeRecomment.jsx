import "../../styles/components/home/HomeRecomment.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "@remix-run/react";
import { getCartData, getProductsForHome } from "../../utils/api";

export default function HomeRecomment() {

    const navigate = useNavigate();

    const [productData, setProductData] = useState([]);

    const products = [
        {
            id: 1,
            image_paths: ["/cement.jpg"],
            name: "Raasi Gold PPC Cement",
            first_title: "50 KG Bag",
            price: "460.00",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 2,
            image_paths: ["/angle-valve.jpg"],
            name: "Angle Valve",
            first_title: "Brass",
            price: "298.00",
            delivery: "Delivery Charge: ₹25",
            rating: 4.6,
        },
        {
            id: 3,
            image_paths: ["/cement.jpg"],
            name: "Binding Wire",
            first_title: "0.71 mm",
            price: "599.00",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 4,
            image_paths: ["/angle-valve.jpg"],
            name: "Finolex Pipes 1”",
            first_title: "PVC Long Bends",
            price: "06.30",
            delivery: "Free Delivery",
            rating: 4.6,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            // setShowSkeleton(true);
            try {
                let brandId = "1";
                const productsData = await getProductsForHome(brandId);
                if (productsData) {
                    setProductData(productsData.data.slice(0, 8));
                    console.log("Product Data:", productsData.data);

                    // setShowSkeleton(false);
                } else {
                    // setShowSkeleton(false);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                // setShowSkeleton(false);
            }
        };

        fetchData();

    }, []);

    const handleRedirectToAllProducts = () => {
        navigate("/product-list");
    }

    return (
        <div className="most-sold-product-container">
            <h1 className="products-heading">
                BESTSELLERS

                {/* <i className="fas fa-circle-chevron-right"></i> */}
            </h1>
            <p className="best-desc">
                Discover our most-loved fragrances, chosen by perfume enthusiasts. These iconic scents are timeless favorites
            </p>
            <div className="products-grid">
                {/* {products.map((product) => ( */}
                {productData.map((product) => (
                    <div key={product.product_id} className="product-card" onClick={() => navigate(`/view-products?id=${product.product_id}`)}>
                        <span className="best-seller-label">BESTSELLER</span>
                        <img
                            src={product.image_paths[0]}
                            alt={product.name}
                            className="product-image"
                        />
                        <div className="product-info">
                            {/* <div className="product-rating">
                                <span>⭐</span> {product.rating}
                            </div> */}
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-description">{product.first_title}</p>

                            {/* <p
                                className={`product-delivery ${product.delivery.includes("Free") ? "free-delivery" : ""
                                    }`}
                            >
                                <i className="fas fa-truck" style={{ marginRight: '10px' }} />
                                {product.delivery}
                            </p> */}
                            <p className="product-price">Rs.{product.price}</p>
                        </div>
                        <button className="add-to-cart-btn">
                            <i className="fas fa-cart-shopping" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="view-all-cont">
                <button className="view-all-btn" onClick={handleRedirectToAllProducts}>
                    View All
                </button>
            </div>
        </div>
    )
}   