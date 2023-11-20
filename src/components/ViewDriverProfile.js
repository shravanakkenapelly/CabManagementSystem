import React, { useState, useEffect } from 'react';
import CabService from '../services/CabService';

const ViewDriverProfile = () => {
    const [cabData, setCabData] = useState({});
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        if (userName) {
            CabService.getCabByUserName(userName)
                .then(response => {
                    setCabData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching cab data: ', error);
                    alert('Failed to fetch driver profile. Please try again.');
                });
        } else {
            alert('User not recognized. Please log in again.');
            // Here, you might want to redirect the user to the login page.
        }
    }, [userName]); // Dependency array

    return (
        <div className="dcp" style={styles['dcp']}>
        <div style={styles.container}>
            <h2 style={styles.header}>Driver and Cab Profile</h2>
            
            <h3 style={styles.subHeader}>Cab Details:</h3>
            <p style={styles.text}><strong>Cab ID:</strong> {cabData.cabId}</p>
            <p style={styles.text}><strong>Cab Type:</strong> {cabData.cabType}</p>
            <p style={styles.text}><strong>Registration Number:</strong> {cabData.registrationNo}</p>
            <p style={styles.text}><strong>Cab Availability:</strong> {cabData.cabAvailability}</p>
            <p style={styles.text}><strong>Current Location:</strong> {cabData.currentLocation}</p>

            <h3 style={styles.subHeader}>Driver Details:</h3>
            <p style={styles.text}><strong>User Name:</strong> {cabData.driver?.userName}</p>
            <p style={styles.text}><strong>Driver Name:</strong> {cabData.driver?.driverName}</p>
            <p style={styles.text}><strong>License No:</strong> {cabData.driver?.licenseNo}</p>
            <p style={styles.text}><strong>Address:</strong> {cabData.driver?.address}</p>
            <p style={styles.text}><strong>Mobile Number:</strong> {cabData.driver?.mobileNumber}</p>
            <p style={styles.text}><strong>Email:</strong> {cabData.driver?.email}</p>
            <p style={styles.text}><strong>Driver Availability:</strong> {cabData.driver?.driverAvailability}</p>
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
        textAlign: 'center'  // Center aligning content
    },
    'dcp':{
        paddingTop:'2rem',
        paddingBottom:'2rem',
backgroundColor:'#ffbc00'
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
    }
};

export default ViewDriverProfile;
