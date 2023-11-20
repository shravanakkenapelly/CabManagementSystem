import React, { useState } from 'react';
import CabService from '../services/CabService';
import { useNavigate } from 'react-router-dom';

const RegisterCabComponent = () => {

    const navigate = useNavigate();
    const [cabDetails, setCabDetails] = useState({
        cabType: '',
        registrationNo: '',
        cabAvailability: '',
        currentLocation: '',
        driver: {
            userName: localStorage.getItem('userName') || '',
            driverName: ''
        }
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let formErrors = {};

        if (!cabDetails.cabType) formErrors.cabType = "Cab type is required!";
        if (!cabDetails.registrationNo) formErrors.registrationNo = "Registration number is required!";
        if (!cabDetails.cabAvailability) formErrors.cabAvailability = "Cab availability is required!";
        if (!cabDetails.currentLocation) formErrors.currentLocation = "Current location is required!";
        if (!cabDetails.driver.driverName) formErrors.driverName = "Driver name is required!";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

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

    const registerCab = () => {
        if (validate()) {
        CabService.registerCab(cabDetails, cabDetails.driver.userName)
            .then(response => {
                alert('Cab registered successfully!');
            })
            .catch(error => {
                console.log('Error during cab registration: ', error);
                alert('Cab registration failed. Please try again.');
            });
            navigate('/driverHome')
        }
    };

    return (
        <div className="regcab" style={styles['regcab']}>
        <div style={styles.wrapper}>
            <div style={styles.container}>
            <h2>Register Cab</h2>
            <form>
                <div>
                    <label>Cab Type:</label>
                    <select name="cabType" value={cabDetails.cabType} onChange={handleInputChange} style={styles.input}>
                        <option value="">-- Select Cab Type --</option>
                        <option value="SEDAN">SEDAN</option>
                        <option value="SUV">SUV</option>
                        <option value="HATCHBACK">HATCHBACK</option>
                    </select>
                    {errors.cabType && <div style={styles.error}>{errors.cabType}</div>}
                </div>

                <div>
                    <label>Registration No:</label>
                    <input type="text" name="registrationNo" value={cabDetails.registrationNo} onChange={handleInputChange} style={styles.input} />
                    {errors.registrationNo && <div style={styles.error}>{errors.registrationNo}</div>}
                </div>

                <div>
                    <label>Cab Availability:</label>
                    <input type="text" name="cabAvailability" value={cabDetails.cabAvailability} onChange={handleInputChange} style={styles.input} />
                    {errors.cabAvailability && <div style={styles.error}>{errors.cabAvailability}</div>}
                </div>

                <div>
                    <label>Current Location:</label>
                    <input type="text" name="currentLocation" value={cabDetails.currentLocation} onChange={handleInputChange} style={styles.input} />
                    {errors.currentLocation && <div style={styles.error}>{errors.currentLocation}</div>}
                </div>

                <h3>Driver Details:</h3>
                <div>
                    <label>Driver Name:</label>
                    <input type="text" name="driverName" value={cabDetails.driver.driverName} onChange={(e) => handleInputChange(e, true)} style={styles.input} />
                    {errors.driverName && <div style={styles.error}>{errors.driverName}</div>}
                </div>
                    
                    <button type="button" onClick={registerCab} style={styles.button}>Add Cab</button>
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
    'regcab':{
backgroundColor:'#b1762ccf',
marginTop:'0.8rem'
    },
    container: {
        maxWidth: '400px',
        marginTop: '50px',
        marginBottom: '50px',
        margin: '10-px',
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
    },
    error: {
        color: 'red',
        fontSize: '0.8rem',
        marginLeft: '5px'
    }
};

export default RegisterCabComponent;
