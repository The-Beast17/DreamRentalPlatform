// Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Company Info */}
                <div className="footer-section">
                    <h4>Dream Rental</h4>
                    <p>Room, Flats, PGs – Rent or Purchase with Ease.</p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/properties">Properties</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div className="footer-section">
                    <h4>Customer Support</h4>
                    <p>Email: support@dreamrental.com</p>
                    <p>Phone: +91 7987416035</p>
                </div>

                {/* Social Media */}
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <Link href="#">Facebook</Link> <br/>
                    <Link href="#">Instagram</Link> <br/>
                    <Link href="#">Twitter</Link>
                </div>
            </div>

            <h2 className="copyright">&copy; 2025 Dream Rental. All Rights Reserved.</h2>
        </footer>
    );
};

export default Footer