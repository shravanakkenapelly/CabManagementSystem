import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';

const ViewCustomerProfile = () => {
    const [customerData, setCustomerData] = useState({});
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        if (userName) {
            CustomerService.viewCustomerByUserName(userName)
                .then(response => {
                    setCustomerData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching customer data: ', error);
                    alert('Failed to fetch customer profile. Please try again.');
                });
        } else {
            alert('User not recognized. Please log in again.');
        }
    }, [userName]);

    return (
        <div className="custpro" style={styles['custpro']}>
        <div style={styles.container}>
            <h2 style={styles.header}>Customer Profile</h2>
            <p style={styles.text}><strong>User Name:</strong> {customerData.userName}</p>
            <p style={styles.text}><strong>Customer Name:</strong> {customerData.customerName}</p>
            <p style={styles.text}><strong>Address:</strong> {customerData.address}</p>
            <p style={styles.text}><strong>Mobile Number:</strong> {customerData.mobileNumber}</p>
            <p style={styles.text}><strong>Email:</strong> {customerData.email}</p>
            {/* ... Add other fields and apply styles as needed ... */}
        </div>
        </div>
    );
}

const styles = {
    container: {
        position:'relative',
        top:'6rem',
        fontFamily: '"Roboto", sans-serif',
        margin: '3.5rem auto 3rem',
        maxWidth: '600px',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.09)',
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    'custpro':{
backgroundColor:'#982c2cde',
height:'32rem'
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
    }
};

export default ViewCustomerProfile;
