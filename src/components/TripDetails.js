import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TripBookingService from '../services/TripBookingService';

const TripDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);

    const tripBookingId = location.state?.tripBookingId;

    useEffect(() => {
        if (tripBookingId) {
            TripBookingService.viewBookingByBookingId(tripBookingId)
                .then(response => {
                    setTrip(response.data);
                })
                .catch(error => {
                    console.error('Error fetching trip details:', error);
                    alert('Failed to fetch trip details.');
                });
        }
    }, [tripBookingId]);

    const handlePaymentNavigation = () => {
        navigate('/payment'); // Assuming your payment route is "/payment"
    };

    return (
        <div className="tripdet" style={styles['tripdet']}>
        <div style={styles.container}>
            <h1 style={styles.header}>Trip Details</h1>
            {trip ? (
                <>
                    <h2 style={styles.subHeader}>Booking ID: {trip.tripBookingId}</h2>
                    <p style={styles.text}><strong>Pickup Location:</strong> {trip.pickupLocation}</p>
                    <p style={styles.text}><strong>Dropoff Location:</strong> {trip.dropoffLocation}</p>
                    <p style={styles.text}><strong>Start Date & Time:</strong> {trip.startDateTime}</p>
                    <p style={styles.text}><strong>Booking Status:</strong> {trip.bookingStatus}</p>
                    <p style={styles.text}><strong>Distance:</strong> {trip.distanceInKm} Km</p>
                    <p style={styles.text}><strong>Rate Per Km:</strong> ${trip.ratePerKm}</p>
                    <p style={styles.text}><strong>Bill:</strong> ${trip.bill}</p>
                    <button style={styles.button} onClick={handlePaymentNavigation}>
                        Go to Payment
                    </button>
                </>
            ) : (
                <p style={styles.text}>Loading trip details...</p>
            )}
        </div>
        </div>
    );
}

//reuse the styles object from the DriverDetails component.
const styles = {
    container: {
        position:'relative',
        top:'1rem',
        fontFamily: '"Roboto", sans-serif',
        margin: '3.5rem auto 3rem',  // Increased top margin
        maxWidth: '600px',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.09)',
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    'tripdet':{
        height:'32rem',
        backgroundColor:'#0e3ba0c4'
    },
    header: {
        color: '#2C3E50',
        borderBottom: '2px solid #3498DB',
        paddingBottom: '1rem',
        marginBottom: '1.5rem',
        fontSize: '1.75rem'
    },
    subHeader: {
        color: '#34495E',
        fontSize: '1.5rem',
        margin: '1.5rem 0'
    },
    text: {
        color: '#7F8C8D',
        fontSize: '1.1rem',
        margin: '0.2rem 0'
    },
    button: {
        backgroundColor: '#3498DB',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '2rem',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#2980B9'
        }
    }
};

export default TripDetails;
