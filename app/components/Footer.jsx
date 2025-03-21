import "../styles/components/Footer.scss";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="logo-container">
                <img src="/athena.png" alt="Lulu Rayyan Group" className="footer-logo" />
            </div>
            <div className="footer-container">

                <div className="footer-brand">

                    <p className="footer-description">
                        Athena is dedicated to crafting timeless, luxurious fragrances that embody elegance and individuality. Inspired by nature and the art of perfumery, each scent is a journey of discovery, designed to captivate your senses.
                    </p>
                </div>
                <div className="footer-links">
                    <div>
                        <h4>Shop by Category</h4>
                        <ul>
                            <li>Women's Fragrances</li>
                            <li>Men's Fragrances</li>
                            <li>Unisex Scents</li>
                            <li>Limited Editions</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Customer Service</h4>
                        <ul>
                            <li>Shipping & Delivery</li>
                            <li>Returns & Exchanges</li>
                            <li>Contact Us</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <h4>About LRG</h4>
                        <ul>
                            <li>Our Story</li>
                            <li>Sustainability</li>
                            <li>Press & Media</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <span>|</span>
                    <a href="#">Terms & Conditions</a>
                </div>
                <div className="footer-social">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
        </footer>
    );
}
