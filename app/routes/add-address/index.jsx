// import type { MetaFunction } from "@remix-run/node";
// import "../styles/home.scss";
import "../../styles/add-address.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import {
    Outlet, useNavigate
} from "@remix-run/react";
import { addAddressData, editAddressData, getAddressFromPin } from "../../utils/api";
import { withSwal } from 'react-sweetalert2';
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };


function AddAddress({ swal }) {

    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");

    const navigate = useNavigate();
    const [addAddress, setAddAddress] = useState(false);
    const [authToken, setAuthToken] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        mobile_number: "",
        pin_code: "",
        state: "",
        city: "",
        // address: "",
        area: "",
        land_mark: "",
        house_name: "",
        type: "home", // default type
    });

    useEffect(() => {
        const fetchData = async () => {
            const isVerified = localStorage.getItem("authToken");

            if (id === null) {
                localStorage.removeItem("editAddress");
            }

            const storedAddress = localStorage.getItem("editAddress");
            const address = storedAddress ? JSON.parse(storedAddress) : null;

            if (isVerified && isVerified !== "") {
                setAuthToken(true);

                if (id !== null && address !== null) {
                    setFormData(address)
                }

                // if (id !== null && address !== null) {
                //     console.log("Fetching address...", address);
                //     try {
                //         const existAddress = await getAddressById(address);
                //         console.log(existAddress);
                //     } catch (error) {
                //         console.error("Error fetching address:", error);
                //     }
                // }
            } else {
                navigate("/");
            }
        };

        fetchData();
        if (formData.pin_code.length === 6) {
            fetchLocationByPincode();
        }
    }, [navigate, formData.pin_code]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddressType = (type) => {
        setFormData({
            ...formData,
            type: type,
        });
    };

    const fetchLocationByPincode = async () => {
        try {
            const data = await getAddressFromPin(formData.pin_code);
            console.log(data);

            if (data) {
                if (data.data.pincode_data.length !== 0) {
                    const location = data.data.pincode_data[0];
                    setFormData(prev => ({
                        ...prev,
                        city: location.city,
                        state: location.state,
                        pin_code: location.pincode
                    }));
                } else {
                    swal.fire({
                        title: "Warning!",
                        text: data.status.message,
                        icon: "warning"
                    }).then(() => {
                        setFormData(prev => ({
                            ...prev,
                            pin_code: ""
                        }));
                    });

                }
            } else {
                console.log("Invalid Pincode");
            }
        } catch (err) {
            console.error("Error fetching location:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        if (formData.id) {
            const res = await editAddressData(formData);
            console.log(res);
            swal.fire({
                title: res.type === 'success' ? 'Success' : 'Error',
                text: res.message,
                icon: res.type === 'success' ? 'success' : 'error',
            }).then(() => {
                // Redirect after clicking OK
                navigate("/order-address");
            });
        } else {
            const res = await addAddressData(formData);
            console.log(res.message);
            swal.fire({
                title: res.type === 'success' ? 'Success' : 'Error',
                text: res.message,
                icon: res.type === 'success' ? 'success' : 'error',
            }).then(() => {
                // Redirect after clicking OK
                navigate("/order-address");
            });
        }
    };

    return (
        <div className="products-container">
            <div className="products-navbar">
                <Navbar />
            </div>

            <div className="address-container">
                <h1>
                    {(formData?.id) ? "Edit Address" : "Add Address"}
                </h1>
                <form className="address-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input
                            type="text"
                            name="full_name"
                            placeholder="Name"
                            value={formData?.full_name}
                            onChange={handleChange}
                            required
                            minLength="2"
                            maxLength="50"
                            title="Enter a valid name"
                        />
                        <input
                            type="tel"
                            name="mobile_number"
                            placeholder="Phone No"
                            value={formData?.mobile_number}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}"
                            maxLength="10"
                            title="Enter a 10-digit phone number"
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="text"
                            name="pin_code"
                            placeholder="Pin code"
                            value={formData?.pin_code}
                            onChange={handleChange}
                            pattern="[0-9]{6}"
                            maxLength="6"
                            title="Enter a valid 6-digit pin code"
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData?.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData?.city}
                            onChange={handleChange}
                            required
                        // style={{ marginRight: "53%" }}
                        />
                        <input
                            type="text"
                            name="house_name"
                            placeholder="House Name"
                            value={formData?.house_name}
                            onChange={handleChange}
                            required
                        // style={{ marginRight: "53%" }}
                        />
                    </div>
                    <div className="form-row">
                        {/* <textarea
                            name="address"
                            placeholder="Provide house / Flat number, street details etc.."
                            rows="6"
                            style={{ height: "120px" }}
                            value={formData.address}
                            onChange={handleChange}
                        ></textarea> */}
                        <input
                            type="text"
                            name="area"
                            placeholder="Area"
                            value={formData?.area}
                            onChange={handleChange}
                            style={{ marginRight: "53%" }}
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="text"
                            name="land_mark"
                            placeholder="Landmark (Optional)"
                            value={formData?.land_mark}
                            onChange={handleChange}
                            style={{ marginRight: "41%" }}
                        />
                        <div className="address-type">
                            <button
                                type="button"
                                className={`type-btn ${formData?.type === "home" ? "selected" : ""}`}
                                onClick={() => handleAddressType("home")}
                            >
                                <i className="fa-solid fa-house"></i>
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${formData?.type === "office" ? "selected" : ""}`}
                                onClick={() => handleAddressType("office")}
                            >
                                <i className="fa-solid fa-building"></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="save-address-btn">
                        {(formData?.id) ? "Edit Address" : "Save Address"}
                    </button>
                </form>
            </div>

            <div className="products-footer">
                <Footer />
            </div>
        </div>
    );
}

export default withSwal(({ swal }) => <AddAddress swal={swal} />);