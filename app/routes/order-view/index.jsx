// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/order-view.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import React from "react";
import { Outlet, useNavigate } from "@remix-run/react";
import { getOrderDetailData } from "../../utils/api.js"
import { useLocation } from "react-router-dom";
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

export default function OrderView() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order");
  const itemId = searchParams.get("item");

  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [finalStatusText, setFinalStatusText] = useState("");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      order_id: "OD5541258974555663255",
      name: "Greenstone's AAC Brick",
      size: "600mmX200mmX100mm",
      selling_price: 38,
      reviews: 18,
      rating: 5,
      quantity: 1,
      image_paths: ["/prod-list1.jpeg"],
      order_item_status: "12/05/2024",
    },
  ]);

  const addresses = {
    type: "Home",
    address: "Arun Kumar, Ashirvadh Ashokapuram,Kozhikode, Kerala,673303",
  };

  // const updates = [
  //   { status: "Order Confirmed", date: "Fri, 22nd Nov 2024" },
  //   { status: "Shipped", date: "Mon, 25th Nov 2024" },
  //   { status: "Out For Delivery", date: "Fri, 29th Nov 2024" },
  //   { status: "Delivered", date: "Fri, 29th Nov 2024" },
  // ];


  useEffect(() => {
    fetchOrderDetailData();
  }, []);

  const fetchOrderDetailData = async () => {
    const isVerified = localStorage.getItem("authToken");

    if (isVerified && isVerified !== "") {
      setAuthToken(true);

      try {
        const res = await getOrderDetailData(orderId, itemId);

        if (res) {
          setOrderDetails(res.order_data)

          const rawUpdates = [
            { status: "Order Placed", date: res.order_data[0].ordered_at },
            { status: "Packed", date: res.order_data[0].packed_at },
            { status: "Shipped", date: res.order_data[0].shipped_at },
            { status: "Delivered", date: res.order_data[0].delivered_at }
          ];

          const updates = rawUpdates.filter(update => update.date && update.date.trim() !== "");
          setUpdates(updates);

          const lastCompleted = [...updates].reverse().find(u => u.date && u.date.trim() !== "");
          const finalStatusText = lastCompleted
            ? `${lastCompleted.status} at ${lastCompleted.date}`
            : "No updates yet";

          setFinalStatusText(finalStatusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      navigate("/");
    }
  }

  // const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  // const totalAmount = orderItems.reduce(
  //   (acc, item) => acc + Number(item.selling_price),
  //   0
  // );

  const handleAddAddress = () => {
    navigate("/add-address");
  };

  function formatDate(dateString) {
    const date = new Date(dateString); // Convert the string to a Date object
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  }

  return (
    <div className="products-container">
      <div className="products-navbar">
        <Navbar />
      </div>

      <div className="address-container">
        <div className="address-head">
          <h2>Order Details</h2>
        </div>
        <div className="delivery-item-container">
          <div className="item-update-container">
            <div className="reviews-grid">
              {orderDetails.map((item, index) => (
                <div key={item.order_id} className="cart-item">
                  <img
                    src={item.image_paths[0]}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <p className="item-size" style={{ marginBottom: "10px" }}>
                      {" "}
                      Order ID - {item.order_id}
                    </p>
                    {/* <h3>Delivered on {formatDate(item.order_item_status)}</h3> */}
                    <h3>{finalStatusText}</h3>
                    <p className="item-size">{item.name}</p>
                    {/* <p className="item-size">{item.size}</p> */}
                    <p className="item-price">₹{Number(item.selling_price).toFixed(2)}</p>

                    <span className="item-delivery">
                      Ordered at {item.ordered_at}
                      {/* {finalStatusText} */}
                    </span>
                  </div>

                  <div className="item-actions">
                    {/* <span>Qty: {item.quantity}</span> */}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-updates">
              <h3>Updates</h3>
              <div className="timeline">
                {updates.map((update, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-icon">
                      <span className="check">&#10004;</span>
                    </div>
                    <div className="timeline-content">
                      <p className="status">{update.status}</p>
                      <p className="date">{update.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="price-details">
            {/* <div className="add-address-container">
              <div className="add-address">
                <h3 className="add-address-head">Shipping Details</h3>
              </div>
              <p className="add-address-description">
                {addresses.address.split(", ").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
            <hr /> */}
            <h3>Price Details</h3>
            <div className="price-item-container">
              {/* <div className="price-item">
                <span>List price</span>
                <span>₹{totalAmount}</span>
              </div> */}
              <div className="price-item">
                <span>Selling price</span>₹{orderDetails[0]?.selling_price}
                {/* <span>₹{orderDetails[0].selling_price}</span> */}
              </div>
              <div className="price-item">
                <span>Discount</span>
                <span>₹0</span>
              </div>
              <div className="price-item">
                <span>Delivery Charge</span>
                <span>₹0</span>
              </div>
              {/* <div className="price-item">
                <span>Platform Fee</span>
                <span>₹0</span>
              </div> */}
            </div>
            <div className="price-total">
              <span>Total Amount</span>
              <span>₹{orderDetails[0]?.selling_price}</span>
            </div>

            <div className="experience-rating">
              <p>
                <b>• Cash On Delivery:</b> ₹{orderDetails[0]?.selling_price}
              </p>
              <div className="rating-section">
                {/* <div className="rate-rating">
                  <p>Rate your experience</p>
                  <div className="stars">
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="rating-text">(Great)</span>
                  </div>
                </div>
                <p className="return-policy">Return policy ended on Dec 06</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="products-footer">
        <Footer />
      </div>
    </div>
  );
}
