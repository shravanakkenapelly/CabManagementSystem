import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DriverService from '../services/DriverService';
import CabService from '../services/CabService';

const DriverDetails = () => {
    const navigate=useNavigate();
    const location = useLocation();
    const [driver, setDriver] = useState(null);
    const [cab, setCab] = useState(null);

    const userName = location.state?.selectedDriver?.userName;
    const tripBookingId = location.state?.tripBookingId; 

    const handleProceedToTripDetails = (tripBookingId) => {
        navigate('/tripdetails', { state: { tripBookingId } });
    }

    useEffect(() => {
        if (userName) {
            DriverService.getDriverByUsername(userName)
                .then(response => {
                    setDriver(response.data);
                })
                .catch(errorHandler);

            CabService.getCabByUserName(userName)
                .then(response => {
                    setCab(response.data);
                })
                .catch(errorHandler);
        }
    }, [userName]);

    const errorHandler = (error) => {
        console.error('Error:', error);
        alert('Failed to fetch details.');

        console.log("Location State:", location.state);
    };

    return (
        <div className="dridet" style={styles['dridet']}>
        <div style={styles.container}>
            <h1 style={styles.header}>Driver Details</h1>
            {driver ? (
                <>
                    <h2 style={styles.subHeader}>{driver.userName}</h2>
                    <p style={styles.text}><strong>Email:</strong> {driver.email}</p>
                    <p style={styles.text}><strong>Mobile:</strong> {driver.mobileNumber}</p>
                </>
            ) : (
                <p style={styles.text}>Loading driver details...</p>
            )}

            {cab ? (
                <>
                    {/* <h2 style={styles.subHeader}>Cab Details</h2> */}
                    <p style={styles.text}><strong>Cab Registration No:</strong> {cab.registrationNo}</p>
                    <p style={styles.text}><strong>Current Location:</strong> {cab.currentLocation}</p>
                </>
            ) : (
                <p style={styles.text}>Loading cab details...</p>
            )}

            {tripBookingId && (
                <p style={styles.text}><strong>Booking ID:</strong> {tripBookingId}</p> // Display the tripBookingId
            )}

            <button style={styles.button} onClick={() => handleProceedToTripDetails(tripBookingId)}>
            Proceed to Bill
        </button>
        </div>
        </div>
    );
}

 const styles = {
        container: {
            position:'relative',
            top:'2rem',
            fontFamily: '"Roboto", sans-serif',
            margin: '3.5rem auto 3rem',
            maxWidth: '600px',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.09)',
            backgroundColor: 'powderblue',
            textAlign: 'center'  // Center aligning content
        },
        'dridet':{
            height:'34rem',
            backgroundSize:'contain',
            backgroundImage:"url('./taxi-app-interface-concept_23-2148497604.jpg')",
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
            color: 'black',
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
        }
    };

export default DriverDetails;
