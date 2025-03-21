// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/components/products/MostSoldProducts.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/ui-components/breadcrumbs";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
    Outlet, useNavigate
} from "@remix-run/react";
import { getProductList, addProductToCart } from "../../utils/api";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { withSwal } from 'react-sweetalert2';
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };


function ProductList({ swal }) {

    const navigate = useNavigate();

    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
    const name = new URLSearchParams(location.search).get("name");
    const subName = new URLSearchParams(location.search).get("subName");
    const subId = new URLSearchParams(location.search).get("subId");

    const [productList, setProductList] = useState([]);
    const [showSkeleton, setShowSkeleton] = useState(false);

    const products = [
        {
            product_id: 1,
            image_paths: ["/cement.jpg"],
            name: "Raasi Gold PPC Cement",
            general_details: "50 KG Bag",
            price: "Rs.460.00 per bag",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            product_id: 2,
            image_paths: ["/angle-valve.jpg"],
            name: "Angle Valve",
            general_details: "Brass",
            price: "Rs.298.00 set of 2",
            delivery: "Delivery Charge: ₹25",
            rating: 4.6,
        },
        {
            product_id: 3,
            image_paths: ["/cement.jpg"],
            name: "Binding Wire",
            general_details: "0.71 mm",
            price: "Rs.599.00 91 meter",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        {
            product_id: 4,
            image_paths: ["/angle-valve.jpg"],
            name: "Finolex Pipes 1”",
            general_details: "PVC Long Bends",
            price: "Rs.06.30 per piece",
            delivery: "Free Delivery",
            rating: 4.6,
        },
        // {
        //     id: 5,
        //     image: "/cement.jpg",
        //     name: "Raasi Gold PPC Cement",
        //     description: "50 KG Bag",
        //     price: "Rs.460.00 per bag",
        //     delivery: "Free Delivery",
        //     rating: 4.6,
        // },
        // {
        //     id: 6,
        //     image: "/angle-valve.jpg",
        //     name: "Angle Valve",
        //     description: "Brass",
        //     price: "Rs.298.00 set of 2",
        //     delivery: "Delivery Charge: ₹25",
        //     rating: 4.6,
        // },
        // {
        //     id: 7,
        //     image: "/cement.jpg",
        //     title: "Binding Wire",
        //     description: "0.71 mm",
        //     price: "Rs.599.00 91 meter",
        //     delivery: "Free Delivery",
        //     rating: 4.6,
        // },
        // {
        //     id: 8,
        //     image: "/angle-valve.jpg",
        //     title: "Finolex Pipes 1”",
        //     description: "PVC Long Bends",
        //     price: "Rs.06.30 per piece",
        //     delivery: "Free Delivery",
        //     rating: 4.6,
        // },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setShowSkeleton(true);
            try {
                let brandId = "1";
                const productsData = await getProductList(brandId);

                if (productsData && Array.isArray(productsData)) {
                    setProductList(productsData);
                    setShowSkeleton(false);
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

    const handleRedirectToCart = async (event, productDetails) => {
        event.stopPropagation();
        // navigate("/cart");
        const isVerified = localStorage.getItem("authToken");
        if (isVerified && isVerified !== "") {

            console.log(productDetails);
            const data = {
                product_id: productDetails.product_id
            };
            const res = await addProductToCart(data);
            if (res) {
                swal.fire({
                    title: "Success!",
                    text: "Item added to cart",
                    icon: "success"
                }).then(() => {
                    navigate("/cart");
                });
            }
        } else {
            swal.fire({
                title: "Warning!",
                text: "please Login to continue.",
                icon: "warning"
            });
        }
    }

    const handleRedirectToView = (product) => {
        navigate(`/view-products?id=${product.product_id}`);
    }

    return (
        <div className="products-container">
            <div className="products-navbar">
                <Navbar />
            </div>
            <div className="products-content-container">
                {/* <div>
                    <Breadcrumbs
                        items={[
                            { label: 'Categories', path: '/categories' },
                            { label: subName, path: `/sub-categories?id=${subId}&name=${subName}` },
                            { label: name, path: '' }
                        ]}
                    />
                </div> */}
                <div className="row product-heading">
                    <h1 className="product-head">
                        PRODUCTS
                    </h1>
                </div>

                {productList.length > 0 ? (
                    <div className="row">
                        <div className="products-grid">
                            {/* {products.map((product) => ( */}
                            {productList.map((product) => (
                                <div key={product.product_id} className="product-card" onClick={() => handleRedirectToView(product)}>
                                    <span className="best-seller-label">{product.condition}</span>
                                    <img
                                        src={product.image_paths[0]}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <div className="product-info">

                                        <h3 className="product-title">{product.name}</h3>
                                        <p className="product-description">{product.general_details}</p>

                                        <p className="product-price">{product.price}</p>
                                    </div>
                                    <button className="add-to-cart-btn" onClick={(e) => handleRedirectToCart(e, product)} >
                                        <span className="cart-icon">
                                            <i className="fa-solid fa-cart-shopping" />

                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : showSkeleton ? (
                    <Skeleton count={10} />
                ) : (
                    <div className="empty-address">
                        <h4>
                            No products found.
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

export default withSwal(({ swal }) => <ProductList swal={swal} />);
