import React from 'react';
function Footer() {
    const linkStyle = {
        color: 'yellow',
    };
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-left text-white">
                        Contact us at: <a href="mailto:contact@cabmanagement.com" style={linkStyle}>contact@cabmanagement.com</a>
                    </div>
                    <div className="col-md-6 text-right text-white">
                        <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a> |{' '}
                        <a href="/terms-of-service" style={linkStyle}>Terms of Service</a> |{' '}
                        <a href="/contact" style={linkStyle}>Contact Us</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <span className="text-white">
                            © 2023 Cab Management System - All Rights Reserved.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
