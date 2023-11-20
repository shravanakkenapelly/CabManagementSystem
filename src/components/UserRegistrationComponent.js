import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService';
import DriverService from '../services/DriverService';

const UserRegistrationComponent = () => {

    const [logoutMsg] = useState('yes');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [driverName, setDriverName] = useState('');
    const [licenseNo, setLicenseNo] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate();


    const validateForm = () => {
        let errors = {};
    
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const mobileRegex = /^[0-9]{10}$/;
    
        // Common validations
        if (!userName.trim() || userName.length < 3 || /[^a-zA-Z0-9_]/.test(userName)) {
            errors.userName = "Username must be at least 3 characters and cannot contain special characters.";
            alert(errors.userName);
        }
    
        if (!password.trim() || password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            errors.password = "Password must be at least 6 characters, contain an uppercase, a lowercase, and a digit.";
            alert(errors.password);
        }
    
        if (!address.trim()) {
            errors.address = "Address is required";
            alert(errors.address);
        }
    
        if (!mobileNumber.trim() || !mobileRegex.test(mobileNumber)) {
            errors.mobileNumber = "Please enter a valid 10-digit mobile number.";
            alert(errors.mobileNumber);
        }
    
        if (!email.includes('@') || !emailRegex.test(email)) {
            errors.email = "Invalid email format.";
            alert(errors.email);
        }
    
        if (!roles.trim() || !['CUSTOMER', 'DRIVER'].includes(roles)) {
            errors.roles = "Roles is required";
            alert(errors.roles);
        }
    
        if (roles === "CUSTOMER" && !customerName.trim()) {
            errors.customerName = "Customer name is required";
            alert(errors.customerName);
        }
    
        if (roles === "DRIVER" && !driverName.trim()) {
            errors.driverName = "Driver name is required";
            alert(errors.driverName);
        }
    
        if (roles === "DRIVER" && !licenseNo.trim()) {
            errors.licenseNo = "License number is required";
            alert(errors.licenseNo);
        }
    
        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    }
    
    

    const registerUser = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        let userData = {
            logoutMsg, userName, password, address, mobileNumber, email, roles
        };

        if (roles === "CUSTOMER") {
            userData = { ...userData, customerName };
        } else if (roles === "DRIVER") {
            userData = { ...userData, driverName, licenseNo };
        }

        const service = roles === "CUSTOMER" ? CustomerService.registerCustomer : DriverService.registerDriver;

        service(userData).then(response => {
            console.log(response.data);
            navigate('/login'); 
        }).catch(error => {
            console.log(error);

            if (error.response && error.response.data) {
                if (error.response.data.message === "Username already exists") {
                    alert("The username is already taken. Please choose another.");
                } else if (error.response.data.message === "Email already registered") {
                    alert("The email is already registered. Try logging in or using a different email.");
                } // ... add more conditions for other specific error messages from the backend
                else {
                    alert(error.response.data.message); // Display the server's error message directly (if any other generic error messages)
                }
            } else {
                alert('An unexpected error occurred while registering.');
            }
        });
    }

    return (
        <div className='Noortest' style={styles.container}>
        <div style={styles.card}>
            <h2 style={styles.header}>User Registration</h2>
            <form>
                <div style={styles.formGroup}>
                    <label style={styles.label}>User Name:</label>
                    <input type="text" name="userName" value={userName} onChange={e => setUserName(e.target.value)} style={styles.input} />
                    {validationErrors.userName && <span style={styles.errorText}>{validationErrors.userName}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Password:</label>
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
                    {validationErrors.password && <span style={styles.errorText}>{validationErrors.password}</span>}
                </div>

                <div style={styles.formGroup}>
                   <label style={styles.label}>Address:</label>
                   <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} style={styles.input} />
                   {validationErrors.address && <span style={styles.errorText}>{validationErrors.address}</span>}
                </div>


    <div style={styles.formGroup}>
        <label style={styles.label}>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} style={styles.input} />
        {validationErrors.mobileNumber && <span style={styles.errorText}>{validationErrors.mobileNumber}</span>}
    </div>

    <div style={styles.formGroup}>
        <label style={styles.label}>Email:</label>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
        {validationErrors.email && <span style={styles.errorText}>{validationErrors.email}</span>}
    </div>

    <div style={styles.formGroup}>
        <label style={styles.label}>Roles:</label>
        <select name="roles" value={roles} onChange={e => setRoles(e.target.value)} style={styles.input}>
            <option value="">Select Role</option>
            <option value="CUSTOMER">Customer</option>
            <option value="DRIVER">Driver</option>
        </select>
        {validationErrors.roles && <span style={styles.errorText}>{validationErrors.roles}</span>}
    </div>

    {roles === "CUSTOMER" && (
        <div style={styles.formGroup}>
            <label style={styles.label}>Customer Name:</label>
            <input type="text" name="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} style={styles.input} />
            {validationErrors.customerName && <span style={styles.errorText}>{validationErrors.customerName}</span>}
        </div>
    )}

    {roles === "DRIVER" && (
        <>
            <div style={styles.formGroup}>
                <label style={styles.label}>Driver Name:</label>
                <input type="text" name="driverName" value={driverName} onChange={e => setDriverName(e.target.value)} style={styles.input} />
                {validationErrors.driverName && <span style={styles.errorText}>{validationErrors.driverName}</span>}
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>License Number:</label>
                <input type="text" name="licenseNo" value={licenseNo} onChange={e => setLicenseNo(e.target.value)} style={styles.input} />
                {validationErrors.licenseNo && <span style={styles.errorText}>{validationErrors.licenseNo}</span>}
            </div>
        </>
    )}

    {/* Register Button */}
    <div style={styles.formGroup}>
        <button style={styles.button} onClick={e => registerUser(e)}>Register</button>
    </div>
</form>
        </div>
    </div>
    )
}

const styles = {
    container: {
        paddingTop:'3rem',
        paddingBottom:'3rem',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%',
        backgroundImage: "url('./register-now-application-information-concept_53876-125164.jpg')",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100vh',
        backgroundColor: '#f4f4f4',
        marginTop: '55px',
        marginBottom: '40px'
    },
    card: {
        width: '80%',
        maxWidth: '500px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'white'
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center'
    },
    formGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '500',
        fontSize: '16px'
    },
    input: {
        width: '100%',
        padding: '10px 15px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    button: {
        width: '100%',
        padding: '10px 15px',
        fontSize: '18px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out'
    },
    errorText: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px'
    }
};

export default UserRegistrationComponent;
