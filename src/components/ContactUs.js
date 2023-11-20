import React from 'react';
function ContactUs() {
    const cities = [
        'Mumbai, Maharashtra',
        'Sangli, Maharashtra',
        'Ludhiyana, Punjab',
        'Pune,Maharashtra',
        'Solapur,Maharashtra',
        'Bareli, UP',
        // Add more cities here
    ];
    return (
        <div className="container">
            <br /><br /><br />
            <h1 className="text-center">Contact Us</h1>
            <br/>
            <div className="row">
                <div className="col-md-6">
                    <h2>Contact Information</h2>
                    <ul>
                        <li>
                            Email: <a href="mailto:contact@cabmanagementsystem.com">contact@cabmanagementsystem.com</a>
                        </li>
                        <li>Phone: +91 8555056858</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <h2>Visit Us</h2><h6>Head Office</h6>
                    <address>
                        Cab Management System Pvt Ltd<br />
                        123 Paramount Street<br />
                        Airoli, Maharashtra, 4003001<br />
                        India
                    </address>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h2>Our Service Areas</h2>
                    <ul>
                        {cities.map((city, index) => (
                            <li key={index}>{city}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default ContactUs;