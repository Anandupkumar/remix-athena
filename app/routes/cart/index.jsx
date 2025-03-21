// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/cart.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "@remix-run/react";
import { getCartData, getAddressData, deleteFromCart, updateCartQty, createNewOrder } from "../../utils/api";
import { withSwal } from 'react-sweetalert2';
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };


function Cart({ swal }) {

    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [buyButtonContent, setBuyButtonContent] = useState("BUY NOW");
    const [isDisabled, setIsDisabled] = useState(false);
    const [showSelectAddress, setShowSelectAddress] = useState(false);
    const [buttonStyle, setButtonStyle] = useState({});
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [miscData, setMiscData] = useState({});
    const [defaultAddress, setDefaultAddress] = useState({})
    const [qtyLoading, setQtyLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("COD");
    const [cartItems, setCartItems] = useState([
        // {
        //     product_id: 1,
        //     name: "Greenstone's AAC Brick",
        //     size: "600mmX200mmX100mm",
        //     price: 38,
        //     selling_price: "28",
        //     reviews: 18,
        //     star_value: 5,
        //     count: 1,
        //     image_paths: ["/prod-list1.jpeg"],
        // },
        // {
        //     product_id: 2,
        //     name: "Binding Wire",
        //     size: "91 Meter",
        //     price: 599,
        //     selling_price: "579",
        //     reviews: 18,
        //     star_value: 5,
        //     count: 1,
        //     image_paths: ["/carousel1.jpg"],
        // },
        // {
        //     product_id: 3,
        //     name: "Magic Acrylic Wall Putty",
        //     size: "20 Ltr",
        //     price: 1350,
        //     selling_price: "579",
        //     reviews: 18,
        //     star_value: 5,
        //     count: 1,
        //     image_paths: ["/carousel2.png"],
        // },
    ]);

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        const isVerified = localStorage.getItem("authToken");

        if (isVerified && isVerified !== "") {
            setAuthToken(true);

            try {
                const res = await getCartData();
                const addressRes = await getAddressData();

                if (res) {
                    setCartItems(res.cart_data);
                    setMiscData(res.misc);
                }

                if (addressRes && Array.isArray(addressRes)) {
                    const defaultAddress = addressRes.find(addr => addr.default === "1");

                    if (defaultAddress) {
                        setDefaultAddress(defaultAddress);
                        // console.log("Default Address:", defaultAddress);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            navigate("/");
        }
    };

    const totalItems = cartItems.reduce((acc, item) => acc + Number(item.count), 0);
    const totalAmount = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.count), 0);
    const totalSellingAmount = cartItems.reduce((acc, item) => acc + Number(item.selling_price) * Number(item.count), 0);
    const totalDiscount = totalAmount - totalSellingAmount;

    const handleItemQty = async (item, operation) => {

        if (operation === "plus") {
            setQtyLoading(true);
            let updatedQty = Number(item.count) + 1;

            const data = {
                product_id: item.product_id,
                count: updatedQty
            };
            const res = await updateCartQty(data);
            console.log(res);
            await fetchCartData();
            setQtyLoading(false);

        } else if (Number(item.count) > 1) {
            setQtyLoading(true);
            let updatedQty = Number(item.count) - 1;

            const data = {
                product_id: item.product_id,
                count: updatedQty
            };
            const res = await updateCartQty(data);
            console.log(res);
            await fetchCartData();
            setQtyLoading(false);

        }

        // const updatedCartItems = cartItems.map(item => {
        //     if (item.product_id === itemId) {
        //         return {
        //             ...item,
        //             count:
        //                 operation === "plus"
        //                     ? Number(item.count) + 1
        //                     : Number(item.count) > 1
        //                         ? Number(item.count) - 1
        //                         : Number(item.count),
        //         };
        //     }
        //     return item;
        // });

        // setCartItems(updatedCartItems);
    }

    const handleItemRemove = async (itemId) => {

        swal.fire({
            title: "Are you sure?",
            text: "Do you really want to remove this item from cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Remove it!",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const data = {
                        product_id: itemId
                    };
                    const res = await deleteFromCart(data);
                    setCartItems(res?.data?.cart_data);

                    swal.fire({
                        title: "Deleted!",
                        text: "The item has been deleted successfully.",
                        icon: "success"
                    });

                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 2000);
                } catch (error) {
                    swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        icon: "error"
                    });
                }
            }
        });

        // const updatedCartItems = cartItems.filter(item => item.product_id !== itemId);
        // setCartItems(updatedCartItems);
    }

    const handleAddAddress = async () => {

        !showSelectAddress && setShowAddress(true);
        !showAddress && setIsDisabled(true);
        !showAddress && setButtonStyle({ backgroundColor: "#ad9253", });

        if (showAddress && !showSelectAddress) {
            setBuyButtonContent("BUY NOW");
        } else {

            if (showAddress && showSelectAddress && buyButtonContent !== 'MAKE PAYMENT') {
                setShowPaymentMethod(true);
                setBuyButtonContent("MAKE PAYMENT");
            } else if (showAddress && showSelectAddress && buyButtonContent === 'MAKE PAYMENT') {
                // console.log(cartItems);
                
                const orderData = {
                    address_id: Number(defaultAddress.id),
                    flow_path: "cart",
                    product_id: cartItems.length === 1 ? `${cartItems[0].product_id}` : "",
                    coupon_state_token: "",
                    payment_method: `${selectedMethod}`,
                    referred_by: ""
                };
                
                const res = await createNewOrder(orderData);
                console.log(res);
                if (res && res?.data?.order_status) {
                    setOrderPlaced(true);
                } else {
                    swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        icon: "error"
                    }).then(() => {
                        window.location.reload();
                    });
                }
                
            } else {
                setBuyButtonContent("PROCEED");
            }
        }
    }

    const handleAddressAdd = () => {
        setShowSelectAddress(true);
        if (Object.keys(defaultAddress).length) {
            setIsDisabled(false);
            setButtonStyle({});
            setIsDisabled(false);
        }
    }

    const handleAddressChange = () => {
        navigate("/order-address");
    }

    const handleRedirectToProducts = () => {
        navigate("/");
    }

    return (
        <div className="products-container">
            <div className="products-navbar">
                <Navbar />
            </div>
            <div className="cart-content-container">
                {!orderPlaced ? (
                    <div className="cart-container">
                        <div className="cart-items">
                            <h2>Cart</h2>
                            {cartItems.length > 0 ? (
                                <>
                                    {cartItems.map((item) => (
                                        <div key={item.product_id} className="cart-item">
                                            <img src={item.image_paths[0]} alt={item.name} className="item-image" />
                                            <div className="item-details">
                                                <h3>{item.name}</h3>
                                                <p className="item-size">{item.second_title}</p>
                                                <div className="item-rating">
                                                    {"★".repeat(item.star_value)}
                                                    <span className="reviews">({item.star_value} Reviews)</span>
                                                </div>
                                                <p className="item-price">₹{Number(item.price).toFixed(2)}</p>
                                            </div>
                                            <div className="item-actions">

                                                {!showAddress ? (
                                                    <>
                                                        <button className="remove-btn" onClick={() => handleItemRemove(item.product_id)}>Remove</button>
                                                        <div className={`quantity-control ${qtyLoading ? "qty-loading" : ""}`}>
                                                            <i className="fa-solid fa-plus quantity-btn" onClick={() => handleItemQty(item, "plus")} />
                                                            <span className="quantity">{item.count}</span>
                                                            <i className="fa-solid fa-minus quantity-btn" onClick={() => handleItemQty(item, "minus")} />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span>
                                                        Qty: {item.count}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="empty-cart">
                                    <h4 className="empty-cart-label">
                                        {miscData.response_message}
                                    </h4>
                                    <button onClick={handleRedirectToProducts} className="order-placed-btn" >BACK TO SHOPPING</button>
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="price-details">

                                {showAddress && !showSelectAddress && (
                                    <div className="add-address-container">
                                        <div className="add-address">
                                            <span className="address-add-btn-cont" onClick={handleAddressAdd}>
                                                <i className="fa-solid fa-plus add-address-btn" />
                                            </span>
                                            <h3 className="add-address-head">Add Address</h3>
                                        </div>
                                        <p className="add-address-description">Please provide your complete delivery address to ensure timely and accurate delivery.</p>
                                    </div>
                                )}

                                {showSelectAddress && !showPaymentMethod && (
                                    <div className="add-address-container">
                                        <div className="select-address-head-container">
                                            <h3>
                                                Delivery To
                                            </h3>
                                            <button className="change-btn" onClick={handleAddressChange}>
                                                {Object.keys(defaultAddress).length > 0 ? (
                                                    "Change"
                                                ) : (
                                                    "Set"
                                                )}
                                            </button>
                                        </div>
                                        <hr className="select-address-line" />
                                        <div className="select-address">
                                            <span className="address-select-btn-cont" >
                                                <i className="fa-solid fa-house add-address-btn" />
                                            </span>
                                            {/* <p className="select-address-description">Arun Kumar <br />
                                                Ashirvadh, Ashokapuram, Kozhikode, <br />
                                                Kerala, 673303.</p> */}
                                            {Object.keys(defaultAddress).length > 0 ? (
                                                <p className="select-address-description">
                                                    {`${defaultAddress.full_name}, ${defaultAddress.house_name}, ${defaultAddress.city}, ${defaultAddress.state}, ${defaultAddress.pin_code}`}
                                                </p>
                                            ) : (
                                                <p className="select-address-description">No default address set</p>
                                            )}
                                        </div>

                                    </div>
                                )}

                                {showPaymentMethod && (
                                    // <div className="add-address-container">
                                    //     <div className="select-address-head-container">
                                    //         <h3>
                                    //             Available payment methods
                                    //         </h3>
                                    //     </div>
                                    //     <hr className="select-address-line" />
                                    //     <div className="select-payment">
                                    //         <div className="payment-method" style={{ height: "65%" }}>
                                    //             <p className="select-payment-description">Cash on delivery</p>
                                    //             <img src="/payment-cash.png" alt="payment-cash" className="payment-img" />
                                    //         </div>
                                    //         <div className="payment-method">
                                    //             <p className="select-payment-description">UPI</p>
                                    //             <img src="/payment-upi.png" alt="payment-upi" className="payment-img" />
                                    //         </div>
                                    //         <div className="payment-method">
                                    //             <p className="select-payment-description">Debit/Credit Card</p>
                                    //             <img src="/payment-card.png" alt="payment-card" className="payment-img" />
                                    //         </div>
                                    //     </div>
                                    // </div>
                                    <div className="add-address-container">
                                        <div className="select-address-head-container">
                                            <h3>Available payment methods</h3>
                                        </div>
                                        <hr className="select-address-line" />
                                        <div className="select-payment">
                                            <label className="payment-option">
                                                <span>Cash on delivery</span>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cod"
                                                    checked={selectedMethod === 'COD'}
                                                    onChange={() => setSelectedMethod('COD')}
                                                />
                                            </label>
                                            {/* <div className="or-text">Or</div>
                                            <label className="payment-option">
                                                <span>Online Payment</span>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="online"
                                                    checked={selectedMethod === 'online'}
                                                    onChange={() => setSelectedMethod('online')}
                                                />
                                            </label> */}
                                        </div>
                                    </div>

                                )}

                                <h3>Price Details</h3>
                                <div className="price-item-container">
                                    <div className="price-item">
                                        <span>{totalItems} item(s)</span>
                                        <span>₹{totalAmount}</span>
                                    </div>
                                    <div className="price-item">
                                        <span>Delivery Charge</span>
                                        <span>₹0</span>
                                    </div>
                                    <div className="price-item">
                                        <span>Total Discount</span>
                                        <span>₹{totalDiscount}</span>
                                    </div>
                                </div>
                                <div className="price-total">
                                    <span>Total Amount</span>
                                    <span>₹{totalSellingAmount}</span>
                                </div>
                                <button className="buy-now-btn" disabled={isDisabled} style={buttonStyle} onClick={handleAddAddress}>{buyButtonContent}</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="order-placed">
                        <h2 className="order-placed-head">Order Placed Successfully <img className="order-placed-head-img" src="/orderplaced.png" alt="" /></h2>
                        <img className="order-placed-img" src="/ordered.png" alt="" />
                        <p className="order-placed-text">Your delivery is on its way and will be arriving soon!</p>
                        <button onClick={handleRedirectToProducts} className="order-placed-btn" >BACK TO SHOPPING</button>
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

export default withSwal(({ swal }) => <Cart swal={swal} />);