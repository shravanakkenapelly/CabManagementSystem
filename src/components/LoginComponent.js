import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const LoginComponent = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isDriver, setIsDriver] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        let loginMethod = isDriver ? UserService.logInDriver : UserService.logInCustomer;

        loginMethod(userName, password)
            .then(response => {
                if(response.data === "Logged in successfully") {
                    console.log('Successfully logged in!');
                    //For Saving the name
                    localStorage.setItem('userName', userName);

                    if(isDriver) {
                        navigate('/driverHome');
                    } else {
                        navigate('/customerHome');
                    }
                } else {
                    alert('Invalid login credentials!');
                }
            })
            .catch(error => {
                console.log('Login Error: ', error);
                alert('Login failed!');
            });
    };

    return (
        <div className="login-container" style={styles['login-container']}>
            <form className="form_main" onSubmit={handleLogin}>
                <p className="heading">Login</p>
                <div className="inputContainer">
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                        {/* ... SVG path here ... */}
                    </svg>
                    <input 
                        placeholder="Username" 
                        id="username" 
                        className="inputField" 
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)} 
                    />
                </div>
    
                <div className="inputContainer">
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                        {/* ... SVG path here ... */}
                    </svg>
                    <input 
                        placeholder="Password" 
                        id="password" 
                        className="inputField" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="check-box">
                    <input 
                        type="checkbox" 
                        checked={isDriver} 
                        onChange={() => setIsDriver(!isDriver)}
                    />
                    <label>Login as Driver</label>
                </div>
                <button id="button" type="submit">Submit</button>
                <div className="signupContainer">
                    <p><a href="/register">Click Here To Register</a></p>
                </div>
            </form>
        </div>
    )
}
const styles = {
    'login-container': {
        height: '37rem',
        backgroundColor: '#ff0000ad'
    }
};
export default LoginComponent;
