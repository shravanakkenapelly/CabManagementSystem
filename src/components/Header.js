import React from 'react';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top header">
            <div className="container d-flex justify-content-center">
                <a className="navbar-brand" href="/" style={{ flexGrow: 1, textAlign: 'center' }}>
                    <span className="car-icon">🚖</span>
                    <span className="animated-text">Cab Management System</span>
                </a>
            </div>
        </nav>
    );
};



export default Header;
