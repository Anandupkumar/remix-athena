import { useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import { setupProfile } from "../utils/api";
import "../styles/login/verify-otp.scss";

export default function ProfileSetup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(name);

        const data = {
            name,
            email: "",
            gender: "",
        };

        if (name !== "") {
            const response = await setupProfile(data);
            if (response) {
                navigate("/"); // Redirect to home page
            }
        }

    };


    return (
        <div className="otp-page">
            <div className="logo-container">
                <img src="/logo-login.png" alt="Logo" className="logo" />
            </div>
            <div className="form-container">
                <h1 className="title">Enter Profile Details</h1>
                <form className="otp-form" onSubmit={handleSubmit}>
        
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="username"/>
                    
                    <button type="submit" className="submit-button">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
