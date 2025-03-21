// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/order-address.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React, { useState, useEffect } from "react";
import {
    Outlet, useNavigate
} from "@remix-run/react";
import { getAddressData, deleteAddressData, setDefaultAddress } from "../../utils/api";
import { withSwal } from 'react-sweetalert2';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };


function OrderAddress({ swal }) {

    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState(false);
    const [addressData, setAddressData] = useState([]);
    const [defaultAddressId, setDefaultAddressId] = useState(null);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const addresses = [
        {
            type: "Home",
            address: "Arun Kumar, Ashirvadh Ashokapuram,Kozhikode, Kerala,673303",
        },
        {
            type: "Office",
            address: "Arun Kumar, Ashirvadh Ashokapuram,Kozhikode, Kerala,673303",
        },
    ];


    useEffect(() => {
        const fetchAddressData = async () => {
            setShowSkeleton(true);
            localStorage.removeItem("editAddress");
            const isVerified = localStorage.getItem("authToken");

            if (isVerified && isVerified !== "") {
                setAuthToken(true);

                try {
                    const res = await getAddressData();
                    console.log(res);

                    if (res) {
                        setShowSkeleton(false);
                        setAddressData(res);

                        const defaultAddr = res.find(addr => addr.default === "1");
                        if (defaultAddr) {
                            setDefaultAddressId(defaultAddr.id);
                        }

                        // const formattedData = res.map(item => ({
                        //     type: item.type,  // You can set the type dynamically if available in `res`
                        //     address: [
                        //         item.full_name,
                        //         item.house_name,
                        //         item.city,
                        //         item.state,
                        //         item.pin_code
                        //     ].filter(Boolean)
                        //     .join(", ")
                        // }));

                        // setAddressData(formattedData);
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
        };

        fetchAddressData();
    }, []);


    const handleAddAddress = () => {
        navigate("/add-address");
    }

    const handleEditAddress = (address) => {
        console.log(address);
        localStorage.setItem("editAddress", JSON.stringify(address));
        navigate(`/add-address?id=${address.id}`);
    }

    const handleDeleteAddress = (addressId) => {
        console.log(addressId);

        const data = {
            id: addressId
        };

        swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this address? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteAddressData(data);
                    console.log(res.message);

                    swal.fire({
                        title: "Deleted!",
                        text: "The address has been deleted successfully.",
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

    const handleDefaultChange = (id) => {

        const data = {
            id: id
        };

        swal.fire({
            title: "Are you sure?",
            text: "Do you really want to make this address as your default delivery location?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Make it!",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setDefaultAddressId(id);
                    const res = await setDefaultAddress(data);
                    console.log(res.message);

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

    };

    return (
        <div className="products-container">
            <div className="products-navbar">
                <Navbar />
            </div>

            <div className="address-container">
                <div className="address-head">
                    <h2>Address</h2>
                    <div className="add-address" onClick={handleAddAddress}>
                        <span className="address-add-btn-cont" >
                            <i className="fa-solid fa-plus add-address-btn" />
                        </span>
                        <h3>
                            Add Address
                        </h3>
                    </div>
                </div>
                <div className="reviews-grid">
                    {addressData.length > 0 ? addressData.map((address, index) => (
                        <div key={index} className="review-card">
                            <div className="add-address-container">
                                <div className="select-address-head-container">
                                    <h3>
                                        {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                                    </h3>
                                    <div>
                                        <button className="edit-btn" onClick={() => handleEditAddress(address)}>Edit</button>
                                        <button className="change-btn" onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                                    </div>
                                </div>
                                <hr className="select-address-line" />
                                <div className="select-address">
                                    <span className="address-select-btn-cont" >
                                        {address.type === "home" ? (
                                            <i className="fa-solid fa-house add-address-btn" />
                                        ) : (
                                            <i className="fa-solid fa-building add-address-btn"></i>
                                        )}
                                    </span>
                                    <p className="select-address-description">
                                        {/* {address.address.split(", ").map((line, idx) => (
                                            <React.Fragment key={idx}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))} */}
                                        {
                                            `${address.full_name}, ${address.house_name}, ${address.city}, ${address.state}, ${address.pin_code}`
                                        }
                                    </p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={(address?.default !== "0") && (defaultAddressId === address?.id)}
                                        onChange={() => handleDefaultChange(address?.id)}
                                    />
                                    <span className="slider"></span>
                                    <span className="label-text">Default Address</span>
                                </label>
                            </div>
                        </div>
                    )) : showSkeleton ? (
                        <Skeleton count={10} />
                    ) : (
                        <div className="empty-address">
                            <h4>
                                No addresses found.
                            </h4>
                        </div>
                    )}
                </div>
            </div>

            <div className="products-footer">
                <Footer />
            </div>
        </div>
    );
}

export default withSwal(({ swal }) => <OrderAddress swal={swal} />);