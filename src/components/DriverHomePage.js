import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const DriverHomePage = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        UserService.logOutDriver('yes')
            .then(response => {
                if (response.data === 'Logged out successfully') {
                    navigate('/login');
                } else {
                    alert('Failed to logout');
                }
            })
            .catch(error => {
                console.log('Error during logout: ', error);
                alert('Logout failed. Please try again.');
            });
    };

    const userName = localStorage.getItem('userName');

    if (!userName) {
        alert("User not recognized. Please log in again.");
        // Potentially redirect to login or handle this error appropriately.
        return;
    }

    return (
        <div style={{height:'37rem', backgroundImage:"url('./yellow-taxis-rush-through-city-streets-twilight-generated-by-ai_188544-37155.jpg')",paddingTop: '55px',  fontFamily: 'Arial, sans-serif' }}>
            <nav className="navbar1" style={{backgroundColor:'white', display: 'flex', justifyContent: 'space-between', padding: '10px 50px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <div className="navbar-brand1" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                    Driver Portal
                </div>
                <div style={{ position: 'relative' }}>
                    <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        &#8942;
                    </button>
                    {menuOpen && (
                        <div style={{ position: 'absolute', top: '100%', right: 0, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '5px', background: 'white', width: '250px', padding: '10px 0' }}>
                            
                            <a
                                onClick={() => navigate('/viewDriverProfile')}
                                style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', transition: '0.3s ease', background: 'black', color: 'white', whiteSpace: 'nowrap' }}
                                onMouseOver={e => e.currentTarget.style.background = '#0056b3'}
                                onMouseOut={e => e.currentTarget.style.background = '#007BFF'}
                            >
                                View Profile
                            </a>
                            <a
                                onClick={() => navigate('/updateDriverProfile')}
                                style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', transition: '0.3s ease', background: '#007BFF', color: 'white', whiteSpace: 'nowrap' }}
                                onMouseOver={e => e.currentTarget.style.background = '#0056b3'}
                                onMouseOut={e => e.currentTarget.style.background = '#007BFF'}
                            >
                                Update Profile
                            </a>
                            <a
                                onClick={() => navigate('/registerCab')}
                                style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', transition: '0.3s ease', background: '#28a745', color: 'white', whiteSpace: 'nowrap' }}
                                onMouseOver={e => e.currentTarget.style.background = '#218838'}
                                onMouseOut={e => e.currentTarget.style.background = '#28a745'}
                            >
                                Add Cab
                            </a>

                            <a
                                onClick={handleLogout}
                                style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', transition: '0.3s ease', background: '#dc3545', color: 'white', whiteSpace: 'nowrap' }}
                                onMouseOver={e => e.currentTarget.style.background = '#b02a37'}
                                onMouseOut={e => e.currentTarget.style.background = '#dc3545'}
                            >
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default DriverHomePage;