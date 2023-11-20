import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService'; // Assume you have this

const UpdateCustomerProfileComponent = () => {
    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState({
        userName: localStorage.getItem('userName') || '',
        password: '',
        address: '',
        mobileNumber: '',
        email: '',
        customerName: ''
    });

    useEffect(() => {
        if(customerDetails.userName) {  
            CustomerService.viewCustomerByUserName(customerDetails.userName)
                .then(response => {
                    setCustomerDetails(response.data);
                })
                .catch(error => {
                    console.log("Error fetching current customer details:", error);
                    if (error && error.response && error.response.data) {
                        alert(error.response.data.message || 'Failed to get current details. Please try again.');
                    } else {
                        alert('Failed to get current details. Please try again.');
                    }
                });
        }
    }, [customerDetails.userName]); 

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCustomerDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const updateCustomer = () => {
        console.log("Sending data to backend:", customerDetails); 
    
        CustomerService.updateCustomerByUserName(customerDetails.userName, customerDetails)
            .then(response => {
                alert('Profile updated successfully!');
            })
            .catch(error => {
                console.log('Error during profile update: ', error);
                alert('Profile update failed. Please try again.');
            });
            navigate('/customerHome')
    };
    

    return (
        <div className="updpro" style={styles['updpro']}>
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2>Update Customer Profile</h2>
                <form>
                    <div>
                        <label>User Name:</label>
                        <input type="text" name="userName" value={customerDetails.userName} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <div>
                        <label>Customer Name:</label>
                        <input type="text" name="customerName" value={customerDetails.customerName} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={customerDetails.password} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" name="address" value={customerDetails.address} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <div>
                        <label>Mobile Number:</label>
                        <input type="text" name="mobileNumber" value={customerDetails.mobileNumber} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={customerDetails.email} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <button type="button" onClick={updateCustomer} style={styles.button}>Update Profile</button>
                </form>
            </div>
        </div>
        </div>
    );
}

    const styles = {
        wrapper: {
            backgroundColor:'#982c2cde',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '100vh',
            width: '100%',
            // backgroundColor: '#f4f4f4'
        },
        'updpro':{
            backgroundColor:'#982c2cde',
            height:'32rem'
        },
        container: {
            maxWidth: '400px',
            marginTop: '100px',
            marginBottom: '80px',
            padding: '1rem',
            borderRadius: '10px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.09)',
            backgroundColor: '#fff',
            textAlign: 'center'
        },
        input: {
            padding: '10px',
            margin: '10px 0',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem'
        },
        button: {
            backgroundColor: '#3498DB',
            color: '#fff',
            padding: '10px 20px',
            margin: '10px 0',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
        }
    };

export default UpdateCustomerProfileComponent;
