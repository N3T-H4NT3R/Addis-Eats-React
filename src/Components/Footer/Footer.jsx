import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>Addis Eats</h2>
          <p>
            Delicious Ethiopian food, made with love.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/menu">Menu</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📍 Addis Ababa, Ethiopia</p>
          <p>📞 +251 909 739 087</p>
          <p>✉️ getahunalta09@gmail.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Addis Eats. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;