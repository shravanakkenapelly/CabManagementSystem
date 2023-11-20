import React, { useState, useEffect } from 'react';
import TripBookingService from '../services/TripBookingService';

const RideHistory = () => {
    const [bookings, setBookings] = useState([]);
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        if (userName) {
            TripBookingService.viewBookingByUserName(userName)
                .then(response => {
                    setBookings(response.data);
                })
                .catch(error => {
                    console.error('Error fetching ride history: ', error);
                    alert('Failed to fetch ride history. Please try again.');
                });
        } else {
            alert('User not recognized. Please log in again.');
            // Here, you might want to redirect the user to the login page.
        }
    }, [userName]); 

    return (
        <div className="ridhis" style={styles['ridhis']}>
        <div style={styles.container}>
            <h2 style={styles.header}>Ride History</h2>
            
            {bookings.length === 0 && <p>No bookings found.</p>}

            {bookings.map((booking, index) => (
                <div key={index} style={styles.rideItem}>
                    <h3>Trip ID: {booking.tripBookingId}</h3>
                    <p>Pickup Location: {booking.pickupLocation}</p>
                    <p>Dropoff Location: {booking.dropoffLocation}</p>
                    <p>Cab Type: {booking.cabType}</p>
                    <p>Booking Status: {booking.bookingStatus}</p>
                    {/* ... Add other fields as needed ... */}
                </div>
            ))}
        </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: '"Roboto", sans-serif',
        margin: '3.5rem auto 3rem',
        maxWidth: '600px',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.09)',
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    'ridhis':{
backgroundColor:'lightseagreen'
    },
    header: {
        color: '#2C3E50',
        borderBottom: '2px solid #3498DB',
        paddingBottom: '1rem',
        marginBottom: '1.5rem',
        fontSize: '1.75rem'
    },
    rideItem: {
        border: '1px solid #ddd',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px'
    }
};

export default RideHistory;
