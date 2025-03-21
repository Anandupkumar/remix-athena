// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/orders.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import React from "react";
import { Outlet, useNavigate } from "@remix-run/react";
import { getOrderData } from "../../utils/api.js"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

export default function Orders() {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [orderItems, setOrderItems] = useState([
    // {
    //   order_id: 1,
    //   product_id: 2,
    //   name: "Greenstone's AAC Brick",
    //   size: "600mmX200mmX100mm",
    //   price: 38,
    //   reviews: 18,
    //   star_value: 5,
    //   quantity: 1,
    //   image_paths: ["/prod-list1.jpeg"],
    //   deliveryDate: "12/05/2024",
    // },
    // {
    //   order_id: 2,
    //   product_id: 3,
    //   name: "Binding Wire",
    //   size: "91 Meter",
    //   price: 599,
    //   reviews: 18,
    //   star_value: 5,
    //   quantity: 1,
    //   image_paths: ["/carousel1.jpg"],
    //   deliveryDate: "12/05/2024",
    // },
    // {
    //   order_id: 3,
    //   product_id: 5,
    //   name: "Magic Acrylic Wall Putty",
    //   size: "20 Ltr",
    //   price: 1350,
    //   reviews: 18,
    //   star_value: 5,
    //   quantity: 1,
    //   image_paths: ["/carousel2.png"],
    //   deliveryDate: "12/05/2024",
    // },
  ]);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    setShowSkeleton(true);
    const isVerified = localStorage.getItem("authToken");

    if (isVerified && isVerified !== "") {
      setAuthToken(true);

      try {
        const res = await getOrderData();

        if (res) {
          console.log(res);

          setOrderItems(res.order_data);
          setShowSkeleton(false);
        } else {
          setShowSkeleton(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setShowSkeleton(false);
      }
    } else {
      navigate("/");
    }
  }

  const handleViewOrder = (item) => {
    navigate(`/order-view?order=${item.order_id}&item=${item.item_id}`);
  };

  return (
    <div className="products-container">
      <div className="products-navbar">
        <Navbar />
      </div>

      <div className="address-container">
        <div className="address-head">
          <h2>My Orders</h2>
        </div>
        {orderItems.length > 0 ? (
          <div className="reviews-grid">
            {orderItems.map((item, index) => (
              <div key={item.order_id} className="cart-item" onClick={() => handleViewOrder(item)}>
                <img src={item.image_paths[0]} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  {/* <p className="item-size">{item.size}</p> */}
                  {/* <div className="item-rating">
                  {"★".repeat(item.star_value)}
                  <span className="reviews">({item.star_value} Reviews)</span>
                </div> */}
                  {/* <p className="item-price">₹{Number(item?.price).toFixed(2)}</p> */}

                  <span className="item-delivery">
                    Ordered on {item.ordered_at}
                    {/* {item.order_item_title} */}
                  </span>
                </div>

                <div className="item-actions">
                  {/* <span>Qty: {item.quantity}</span> */}
                </div>
              </div>
            ))}
          </div>
        ) : showSkeleton ? (
          <Skeleton count={10} />
        ) : (
          <div className="empty-address">
            <h4>
              No orders found.
            </h4>
          </div>
        )}
      </div>

      <div className="products-footer">
        <Footer />
      </div>
    </div>
  );
}
