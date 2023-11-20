import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import TripBookingService from '../services/TripBookingService';
import DriverService from '../services/DriverService';

const CustomerHomePage = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); 
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropOffLocation] = useState('');
    const [cabType, setCabType] = useState('');
    const [tripBookingId, setTripBookingId] = useState(null);

    const handleLogout = () => {
        UserService.logOutCustomer('yes')
        .then(response => {
            if(response.data === 'Logged out successfully') {
                navigate('/login');  
            } else {
                alert('Failed to logout');
            }
        })
        .catch(error => {
            if (error.response) {
                // The request was made, and the server responded with a status code outside of the 2xx range
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received:', error.request);
            } else {
                console.error('Axios error:', error.message);
            }
            alert('Failed to start the trip.');
        });
        
    };

    const handleStartTrip = () => {

        if (!pickupLocation || !dropoffLocation) {
            alert("Please fill in both pickup and drop locations.");
            return;
        }

        if (!cabType) {  // Check if a cab type has been selected
            alert("Please select a cab type.");
            return;
        }

        const tripBooking = {
            pickupLocation: pickupLocation,
            dropoffLocation: dropoffLocation,
            cabType: cabType,
            bookingStatus: 'CONFIRMED'
        };

        // Assuming the username is stored in localStorage or fetch from wherever it is stored.
        const userName = localStorage.getItem('userName');


        if (!userName) {
            alert("User not recognized. Please log in again.");
            // Potentially redirect to login or handle this error appropriately.
            return;
        }

        TripBookingService.addTripBooking(tripBooking, userName)
            .then(response => {
                console.log('Trip Booked!', response);
                alert('Trip Booked successfully! Your Booking ID is: '+ response.data.tripBookingId);
                setTripBookingId(response.data.tripBookingId); // Set the tripBookingId to state
                navigateToAvailableDrivers(response.data.tripBookingId);
            })
            .catch(error => {
                console.error('Error starting trip: ', error);
                alert('Failed to start the trip.');
            });
    };

    const navigateToAvailableDrivers = (currentTripBookingId) => {
        // Assuming 'yes' indicates that the driver is available
        DriverService.getDriverByAvailability('yes')
            .then(response => {
                const availableDrivers = response.data;
                console.log('Available drivers:', availableDrivers);
                // Sending cabType to AvailableDrivers through the router state
                navigate('/available-drivers', { state: { drivers: availableDrivers, selectedCabType: cabType, tripBookingId: currentTripBookingId } });
            })
            .catch(error => {
                console.error('Error fetching available drivers:', error);
            });
    };
    
    
    return (
        <div style={{ paddingTop: '50px', backgroundImage: "url('./customer.jpeg')", fontFamily: 'Arial, sans-serif',backgroundSize:'cover' }}>
            <nav className="navbar1" style={{ display: 'flex',backgroundColor:'white', justifyContent: 'space-between', padding: '10px 50px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <div className="navbar-brand1" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                        Customer Portal
                    </div>
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            &#8942;
                        </button>
                        {menuOpen && (
                            <div style={{ position: 'absolute', top: '100%', right: 0, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '5px', background: 'white', width: '250px', padding: '10px 0' }}>
                                <a 
                                    onClick={() => navigate('/viewCustomerProfile')}
                                    style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', transition: '0.3s ease', background: 'black', color: 'white', whiteSpace: 'nowrap' }}
                                    onMouseOver={e => e.currentTarget.style.background = '#0056b3'}
                                    onMouseOut={e => e.currentTarget.style.background = 'black'}
                                >
                                    View Profile
                                </a>
                                <a 
                                    onClick={() => navigate('/updateCustomerProfile')}
                                    style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', transition: '0.3s ease', background: '#007BFF', color: 'white', whiteSpace: 'nowrap' }}
                                    onMouseOver={e => e.currentTarget.style.background = '#0056b3'}
                                    onMouseOut={e => e.currentTarget.style.background = '#007BFF'}
                                >
                                    Update Profile
                                </a>
                                <a 
                                    onClick={() => navigate('/rideHistory')}
                                    style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', transition: '0.3s ease', background: 'green', color: 'white', whiteSpace: 'nowrap' }}
                                    onMouseOver={e => e.currentTarget.style.background = '#0056b3'}
                                    onMouseOut={e => e.currentTarget.style.background = 'green'}
                                >
                                    Ride History
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
            
            <div style={styles.centeredContainer}>
            <div className="trip-form" style={styles.tripForm}>
    <h1 style={styles.header}>Start Your Journey!!</h1>
    
    <input 
        type="text"
        placeholder="Pickup Location"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
        style={styles.input}
    />

    <input 
        type="text"
        placeholder="Drop Location"
        value={dropoffLocation}
        onChange={(e) => setDropOffLocation(e.target.value)}
        style={styles.input}
    />

    <div className="form-group mb-2" style={styles.formGroup}>
        <label className="form-label" style={styles.label}>Cab Type:</label>
        <select name="cabType" className="form-control" value={cabType} onChange={e => setCabType(e.target.value)} style={styles.select}>
            <option value="">Select Cab Type</option>
            <option value="SEDAN">SEDAN</option>
            <option value="SUV">SUV</option>
            <option value="HATCHBACK">HATCHBACK</option>
        </select>
    </div>

    {tripBookingId && (
        <div style={styles.bookingId}>
            Your Trip Booking ID: {tripBookingId}
        </div>
    )}

    <button onClick={handleStartTrip} style={styles.button}>
        Start Trip
    </button>
</div>
</div>

        </div>
    );
}


const styles = {
    centeredContainer: {
        display: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 70px)',  // Subtracting the paddingTop value to ensure proper centering
    },
    tripForm: {
        position:'relative',
        top:'2rem',
        backgroundColor:'white',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        margin: 'auto'
    },
    header: {
        marginBottom: '20px',
        color: '#333',
        fontWeight: '400'
    },
    input: {
        padding: '10px 15px',
        margin: '10px 0',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px'
    },
    formGroup: {
        width: '100%',
        margin: '10px 0',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#555'
    },
    select: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px'
    },
    bookingId: {
        marginTop: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: '15px'
    },
    button: {
        padding: '10px 20px',
        background: '#3498DB',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#2980B9'
        }
    }
};

export default CustomerHomePage;
