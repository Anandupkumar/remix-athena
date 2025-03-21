// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/components/products/MostSoldProducts.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
    Outlet, useNavigate
} from "@remix-run/react";
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };


export default function Products() {

    const navigate = useNavigate();

    const products = [
        {
            id: 1,
            image: "/cement.jpg",
            title: "Raasi Gold PPC Cement",
            description: "50 KG Bag",
            price: "Rs.460.00 per bag",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 2,
            image: "/angle-valve.jpg",
            title: "Angle Valve",
            description: "Brass",
            price: "Rs.298.00 set of 2",
            delivery: "Delivery Charge: ₹25",
            rating: 4.6,
        },
        {
            id: 3,
            image: "/cement.jpg",
            title: "Binding Wire",
            description: "0.71 mm",
            price: "Rs.599.00 91 meter",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 4,
            image: "/angle-valve.jpg",
            title: "Finolex Pipes 1”",
            description: "PVC Long Bends",
            price: "Rs.06.30 per piece",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 1,
            image: "/cement.jpg",
            title: "Raasi Gold PPC Cement",
            description: "50 KG Bag",
            price: "Rs.460.00 per bag",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 2,
            image: "/angle-valve.jpg",
            title: "Angle Valve",
            description: "Brass",
            price: "Rs.298.00 set of 2",
            delivery: "Delivery Charge: ₹25",
            rating: 4.6,
        },
        {
            id: 3,
            image: "/cement.jpg",
            title: "Binding Wire",
            description: "0.71 mm",
            price: "Rs.599.00 91 meter",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 4,
            image: "/angle-valve.jpg",
            title: "Finolex Pipes 1”",
            description: "PVC Long Bends",
            price: "Rs.06.30 per piece",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 1,
            image: "/cement.jpg",
            title: "Raasi Gold PPC Cement",
            description: "50 KG Bag",
            price: "Rs.460.00 per bag",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 2,
            image: "/angle-valve.jpg",
            title: "Angle Valve",
            description: "Brass",
            price: "Rs.298.00 set of 2",
            delivery: "Delivery Charge: ₹25",
            rating: 4.6,
        },
        {
            id: 3,
            image: "/cement.jpg",
            title: "Binding Wire",
            description: "0.71 mm",
            price: "Rs.599.00 91 meter",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            id: 4,
            image: "/angle-valve.jpg",
            title: "Finolex Pipes 1”",
            description: "PVC Long Bends",
            price: "Rs.06.30 per piece",
            delivery: "Free Delivery",
            rating: 4.6,
        },
    ];

    const handleRedirectToCart = (event) => {
        event.stopPropagation();
        navigate("/cart");
    }

    const handleRedirectToView = () => {
        navigate("/view-products");
    }

    return (
        <div className="products-container">
            <div className="products-navbar">
                <Navbar />
            </div>
            <div className="products-content-container">
                <div className="row product-heading">
                    <h1 className="product-head">
                        OUR MOST SOLD PRODUCTS
                    </h1>
                    <span className="heading-description">
                        Premium construction materials that are tried, tested, and trusted by builders for superior quality and reliability. Upgrade your projects with the best in the industry!
                    </span>
                </div>

                <div className="row">
                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card" onClick={handleRedirectToView}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="product-image"
                                />
                                <div className="product-info">

                                    <h3 className="product-title">{product.title}</h3>
                                    <p className="product-description">{product.description}</p>

                                    <p className="product-price">{product.price}</p>
                                </div>
                                <button className="add-to-cart-btn" onClick={handleRedirectToCart} >
                                    <span className="cart-icon">
                                        <i className="fa-solid fa-cart-shopping" />

                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <Outlet /> */}
            <div className="products-footer">
                <Footer />
            </div>
        </div>
    );
}
