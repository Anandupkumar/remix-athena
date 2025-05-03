import { useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import { setupProfile } from "../utils/api";
import "../styles/login/verify-otp.scss";

export default function ProfileSetup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // console.log(name);

        const data = {
            name,
            email: "",
            gender: "",
        };

        if (name !== "") {
            // const response = await setupProfile(data);
            // if (response) {
            //     navigate("/"); // Redirect to home page
            // }

            try {
                const response = await setupProfile(data);
                if (response) {
                    navigate("/"); // Redirect to home page
                }
            } catch (error) {
                setIsSubmitting(false);
                console.log("Failed to verify user: ", err);
            }

        } else {
            setIsSubmitting(false);
        }

    };


    return (
        <div className="otp-page">
            <div className="logo-container-otp">
                <img src="/athena-logo.png" alt="Logo" className="logo" />
            </div>
            <div className="form-container-otp">
                <h1 className="title">What do we call you ?</h1>
                <form className="otp-form" onSubmit={handleSubmit}>
        
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="username"/>
                    
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {/* Create */}
                        {isSubmitting ? "Signing in..." : "Signup"}
                    </button>
                </form>
            </div>
        </div>
    );
}
