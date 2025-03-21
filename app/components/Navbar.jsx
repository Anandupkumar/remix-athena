import "../styles/components/Navbar.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";

export default function HomeNavbar() {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [authToken, setAuthToken] = useState(false);

    useEffect(() => {
        const isVerified = localStorage.getItem("authToken");
        if (isVerified && isVerified !== "") {
            setAuthToken(true);
        } else {
            setAuthToken(false);
        }

    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleRedirectToLogin = () => {
        navigate("/login");
    }

    const handleRedirectToProfile = () => {
        navigate("/my-account");
    }

    const handleRedirectToCart = () => {
        navigate("/cart");
    }

    const handleRedirectToCategory = () => {
        navigate("/categories")
    }

    const handleRedirectToHome = () => {
        navigate("/");
    }

    return (
        <div>
            <div className="top-header">
                {/* <div className="logo-container">
                    <img
                        src="/logo-login.png"
                        alt="Lulu Rayyan Group"
                        className="logo"
                    />
                </div> */}
                <div className="search-container">
                    <img
                        src="/athena-logo.png"
                        alt="Lulu Rayyan Group"
                        className="logo"
                    />
                    {/* <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="search-input"
                    />
                    <button className="search-button">
                        <i className="fas fa-search" />
                    </button> */}
                </div>

                {/* <div className="user-actions">
                    {authToken ?
                        <span onClick={handleRedirectToProfile} className="action-item">
                            <i className="fas fa-user" />
                            My Account
                        </span>
                        : <div className="login-signup-cont">
                            <span onClick={handleRedirectToLogin} className="action-item">
        
                                Login/Signup
                            </span>
                        </div>
                    }

                    <span onClick={handleRedirectToCart} className="action-item"><i className="fas fa-cart-shopping" /> Cart</span>
                </div> */}

            </div>



            <nav className="bottom-header">
                <div className="menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ?
                        <i className="fa-solid fa-xmark" />
                        : <i className="fa-solid fa-bars" />}
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li onClick={handleRedirectToHome}>Home</li>
                    <li onClick={handleRedirectToCategory}>
                        Category <i className="fas fa-chevron-down" />
                    </li>
                    <li>Offers</li>
                    <li>Why Athena</li>
                    {/* <li>BEST SELLING</li>
                    <li>
                        COMPANY <i className="fas fa-chevron-down" />
                    </li>
                    <li>CONTACT US</li> */}
                </ul>
            </nav>

        </div>
    );
}
