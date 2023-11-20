import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CabService from '../services/CabService';


const UpdateDriverProfileComponent = () => {

    const navigate = useNavigate();

    const [cabDetails, setCabDetails] = useState({
        cabAvailability: '',
        currentLocation: '',
        driver: {
            userName: localStorage.getItem('userName') || '',
            password: '',
            address: '',
            mobileNumber: '',
            email: '',
            driverName: '',
            licenseNo: '',
            driverAvailability: ''
        }
    });

    useEffect(() => {
        if(cabDetails.driver.userName) {  // add a condition to check if username exists
            CabService.getCabByUserName(cabDetails.driver.userName)
                .then(response => {
                    setCabDetails(response.data);
                })
                .catch(error => {
                    console.log("Error fetching current cab details:", error);
                    if (error && error.response && error.response.data) {
                        alert(error.response.data.message || 'Failed to get current details. Please try again.');
                    } else {
                        alert('Failed to get current details. Please try again.');
                    }
                });
                
        }
    }, [cabDetails.driver.userName]);  // Dependency array
    

    const handleInputChange = (event, nested = false) => {
        const { name, value } = event.target;
        if (nested) {
            setCabDetails(prevDetails => ({
                ...prevDetails,
                driver: {
                    ...prevDetails.driver,
                    [name]: value
                }
            }));
        } else {
            setCabDetails(prevDetails => ({
                ...prevDetails,
                [name]: value
            }));
        }
    };

    const updateCab = () => {
        console.log("Sending data to backend:", cabDetails); // Log the data
    
        CabService.updateCabByUsername(cabDetails.driver.userName, cabDetails)
            .then(response => {
                alert('Profile updated successfully!');
            })
            .catch(error => {
                console.log('Error during profile update: ', error);
                alert('Profile update failed. Please try again.');
            });

            navigate('/driverHome')
    };
    

    return (
        <div className="updri" style={styles['updri']}>
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2>Update Driver Profile</h2>
                <form>

                    <div>
                        <label>Cab Availability:</label>
                        <input type="text" name="cabAvailability" value={cabDetails.cabAvailability} onChange={handleInputChange} style={styles.input} />
                    </div>

                    <div>
                        <label>Current Location:</label>
                        <input type="text" name="currentLocation" value={cabDetails.currentLocation} onChange={handleInputChange} style={styles.input} />
                    </div>

                    <h3>Driver Details:</h3>
                    <div>
                        <label>User Name:</label>
                        <input type="text" name="userName" value={cabDetails.driver.userName} onChange={(e) => handleInputChange(e, true)} style={styles.input} />
                    </div>

                    <div>
                        <label>Driver Name:</label>
                        <input type="text" name="driverName" value={cabDetails.driver.driverName} onChange={(e) => handleInputChange(e, true)} style={styles.input} />
                    </div>

                    <div>
                        <label>License No:</label>
                        <input type="text" name="licenseNo" value={cabDetails.driver.licenseNo} onChange={(e) => handleInputChange(e, true)} style={styles.input} />
                    </div>

                    <div>
                        <label>Address:</label>
                        <input type="text" name="address" value={cabDetails.driver.address} onChange={(e) => handleInputChange(e, true)} style={styles.input} />
                    </div>

                    <div>
                        <label>Mobile Number:</label>
                        <input type="text" name="mobileNumber" value={cabDetails.driver.mobileNumber} onChange={(e) => handleInputChange(e, true)} style={styles.input} />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={cabDetails.driver.email} onChange={(e) => handleInputChange(e, true)} style={styles.input} />
                    </div>

                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={cabDetails.driver.password} onChange={(e) => handleInputChange(e, true)} style={styles.input} />
                    </div>

                    <div>
                        <label>Driver Availability:</label>
                        <input type="text" name="driverAvailability" value={cabDetails.driver.driverAvailability} onChange={(e) => handleInputChange(e, true)} style={styles.input} />
                    </div>
                    <button type="button" onClick={updateCab} style={styles.button}>Update Profile</button>
                </form>
            </div>
        </div>
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
        width: '100%',
        // backgroundColor: '#f4f4f4'
    },
    'updri':{
backgroundColor:'#651965ba'
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

export default UpdateDriverProfileComponent;