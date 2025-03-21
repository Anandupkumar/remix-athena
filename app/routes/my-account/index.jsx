// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/my-account.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React, { useState, useEffect } from "react";
import {
    Outlet, useNavigate
} from "@remix-run/react";
import { getAddressData, deleteAddressData, setDefaultAddress, getProfileData, saveProfileData } from "../../utils/api";
import { withSwal } from 'react-sweetalert2';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };


function MyAccount({ swal }) {

    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [profileData, setProfileData] = useState({});

    const addresses = {
        title: "Mr.",
        name: "Anandhu",
        mobile: "+9122222222",
        email: "anandhu@gmail.com",
    };

    useEffect(() => {
        const isVerified = localStorage.getItem("authToken");
        if (isVerified && isVerified !== "") {
            getProfileInfo();
        } else {
            navigate("/");
        }
    }, []);

    const getProfileInfo = async () => {
        setShowSkeleton(true);
        try {
            const profile = await getProfileData();
            if (profile) {
                setShowSkeleton(false);
                setProfileData(profile[0])
            } else {
                setShowSkeleton(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setShowSkeleton(false);
        }
    }

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setShowEdit(!showEdit);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(profileData);
        const res = await saveProfileData(profileData);
        console.log(res);
        swal.fire({
            title: res.status.type === 'success' ? 'Success' : 'Error',
            text: res.status.message,
            icon: res.status.type === 'success' ? 'success' : 'error',
        }).then(() => {
            // Redirect after clicking OK
            window.location.reload();
        });
    }

    const handleVewAddress = () => {
        navigate("/order-address");
    }

    const handleViewOrders = () => {
        navigate("/orders");
    }

    const handleLogout = () => {
        swal.fire({
            title: "Are you sure?",
            text: "Do you really want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    localStorage.removeItem("authToken");

                    swal.fire({
                        title: "Success!",
                        text: "The address has been set to default address successfully.",
                        icon: "success"
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } catch (error) {
                    swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        icon: "error"
                    });
                }
            }
        });
    }

    return (
        <div className="products-container">
            <div className="products-navbar">
                <Navbar />
            </div>

            <div className="address-container">
                <div className="address-head">
                    <h2>My Account</h2>

                </div>
                <div className="account-container">
                    <div className="main-head">
                        <div className="add-address" onClick={handleVewAddress}>
                            <span className="address-add-btn-cont" >
                                <i className="fa-solid fa-location-dot" />
                            </span>
                            <h3>
                                My Address
                            </h3>
                        </div>
                        <div className="add-address" onClick={handleViewOrders}>
                            <span className="address-add-btn-cont" >
                                <i className="fa-solid fa-cart-shopping" />
                            </span>
                            <h3>
                                My Orders
                            </h3>
                        </div>
                        <div className="add-address" >
                            <span className="address-add-btn-cont" >
                                <i className="fa-solid fa-heart" />
                            </span>
                            <h3>
                                Wishlist
                            </h3>
                        </div>
                        <div className="add-address" onClick={handleLogout}>
                            <span className="address-add-btn-cont" >
                                <i className="fa-solid fa-right-from-bracket" />
                            </span>
                            <h3>
                                Logout
                            </h3>
                        </div>
                    </div>


                    <div className="review-card">
                        {!showSkeleton ? (
                            <>
                                {!showEdit ? (
                                    <div className="add-address-container">
                                        <div className="select-address-head-container">
                                            <div>
                                                <button className="edit-btn" onClick={() => handleEdit()}>Edit</button>
                                            </div>
                                        </div>
                                        <div className="select-address">
                                            <span className="address-select-btn-cont" >
                                                <i className="fa-solid fa-user add-address-btn" />
                                            </span>
                                            <p className="select-address-description">
                                                {(profileData.title !== null && profileData.name !== null) ?
                                                    (`${profileData.title}, ${profileData.name}`) : "NIL"
                                                }
                                            </p>
                                        </div>
                                        <div className="select-address">
                                            <span className="address-select-btn-cont" >
                                                <i className="fa-solid fa-phone add-address-btn" />
                                            </span>
                                            <p className="select-address-description">
                                                {profileData.mobile !== null ? (profileData.mobile) : "NIL"}
                                            </p>
                                        </div>
                                        <div className="select-address">
                                            <span className="address-select-btn-cont" >
                                                <i className="fa-solid fa-envelope add-address-btn" />
                                            </span>
                                            <p className="select-address-description">
                                                {profileData.email !== null ? (profileData.email) : "NIL"}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <form className="address-form" onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    value={(profileData?.name) ? profileData?.name : ""}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    placeholder="Mobile"
                                                    value={(profileData?.mobile) ? profileData?.mobile : ""}
                                                    onChange={handleChange}
                                                    disabled
                                                // pattern="[0-9]{10}"
                                                // maxLength="10"
                                                // title="Please enter a 10-digit phone number"
                                                />
                                            </div>
                                            <div className="form-row">

                                                <input
                                                    type="text"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={(profileData?.email) ? profileData?.email : ""}
                                                    onChange={handleChange}
                                                    // className="half-width"
                                                    required
                                                // style={{ marginRight: "50%" }}
                                                />

                                                {/* <div className="form-row"> */}
                                                <select
                                                    name="title"
                                                    value={profileData?.title || ""}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Mr">Male</option>
                                                    <option value="Ms">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {/* </div> */}

                                            </div>
                                            <button type="submit" className="save-address-btn">
                                                Save
                                            </button>
                                        </form>
                                        <div>

                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Skeleton count={10} />
                        )}
                    </div>
                </div>
            </div>

            <div className="products-footer">
                <Footer />
            </div>
        </div >
    );
}

export default withSwal(({ swal }) => <MyAccount swal={swal} />);