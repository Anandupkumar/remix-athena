import { useState, useEffect } from "react";
import { Form, useNavigation, useNavigate } from "@remix-run/react";
import { sendOTP } from "../utils/api";
// import Loader from "react-loader-spinner";
import "../styles/login/login.scss";

export default function Login() {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authToken, setAuthToken] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isVerified = localStorage.getItem("authToken");
        if (isVerified && isVerified !== "") {
            setAuthToken(true);
            navigate("/");
        } else {
            setAuthToken(false);
        }

    }, []);
    // const navigation = useNavigation();
    // const isSubmitting = navigation.state === "submitting";

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setPhoneNumber(value);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const resp = await sendOTP(phoneNumber);
            if (resp) {
                // let resp = {
                //     verify_id: "d6v5g6e5g6rg56rgr6g5"
                // }
                const userData = {
                    mobile: phoneNumber,
                    verify_id: resp.verify_id
                };
                localStorage.setItem("user", JSON.stringify(userData));
                navigate("/verify-otp", { replace: true });
            } else {
                setIsSubmitting(false);
            }

        } catch (err) {
            setIsSubmitting(false);
            console.log("Failed to send OTP: ", err);
        }

    };

    const handleSkipLogin = () => {
        navigate("/");
    }

    return (
        <div className="row">

            {/* <div className="loader-container">
                <Loader.ThreeDots className="loader"
                    visible={true}
                    height={150}
                    width={150}
                    color="#EC2329"
                    ariaLabel="oval-loading"
                />
            </div> */}

            <div className="col-6 container1">
                <div className="logo-container">
                    <img src="/athena-logo.png" alt="" className="logo" />
                </div>
                <div className="icon-container">
                    <img src="/pefume-main.png" alt="" className="logoLogin" />
                </div>
            </div>
            <div className="col-6 container2">
                <div className="form-container">

                    <div className="title-discription-container">
                        <h1 className="title">Login/Signup</h1>
                        <p className="description">Enter your phone number to login</p>
                    </div>

                    <Form method="post" className="form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <span className="country-code">+91</span>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Mobile number"
                                value={phoneNumber}
                                onChange={handleInputChange}
                                maxLength={10}
                                className="input"
                                required
                            />
                        </div>
                        <button type="submit" className="button" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Login/Signup"}
                        </button>
                    </Form>

                    <div className="divider">or</div>
                    <button onClick={handleSkipLogin} className="skip-button">Skip Login</button>
                </div>
            </div>
        </div>
    );
}
