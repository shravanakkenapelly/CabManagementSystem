import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [pickup, setPickup] = React.useState('');
    const [dropoff, setDropoff] = React.useState('');

    const handleStartClick = () => {
        if (pickup && dropoff) {
            navigate('/register');
        } else {
            alert('Please enter both pickup and drop-off locations.');
        }
    };

    return (
        <div style={containerStyle}>
            <div style={contentContainer}>
            <br/>
                <h1 style={headerStyle}>Cab Management System</h1>

                <div style={bookingBox}>
                    <div style={userBox}>
                        <h2>Customer</h2>
                        <input 
                            type="text"
                            value={pickup}
                            onChange={e => setPickup(e.target.value)}
                            placeholder="Pickup Location"
                            style={inputStyle}
                        />
                        <input 
                            type="text"
                            value={dropoff}
                            onChange={e => setDropoff(e.target.value)}
                            placeholder="Drop-off Location"
                            style={inputStyle}
                        />
                        <button onClick={handleStartClick} style={startButtonStyle}>Start Ride</button>
                    </div>
                    <div style={driverBox}>
                        <h2>Driver</h2>
                        <p>Join our fleet and earn on your schedule.</p>
                        <button onClick={() => navigate('/register')} style={driverButtonStyle}>Become a Driver</button>
                    </div>
                </div>
                <div style={loginContainer}>
                    <p>Already have an account?</p>
                    <button onClick={() => navigate('/login')} style={loginButtonStyle}>Login Here</button>
                    <br/> <br/>
                </div>
            </div>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: "url('./homebg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    color: 'white',
};

const contentContainer = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '40px',
    borderRadius: '15px',
    width: '85%',
    maxWidth: '800px'
};

const headerStyle = {
    fontWeight: 'bold',
    fontSize: '3.5em',
    marginBottom: '30px'
};

const bookingBox = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '30px',
    marginTop: '20px'
};

const userBox = {
    width: '45%',
    padding: '20px',
    background: 'black',
    borderRadius: '10px',
    textAlign: 'center'
};

const driverBox = {
    width: '45%',
    padding: '20px',
    background: 'black',
    borderRadius: '10px',
    textAlign: 'center'
};

const inputStyle = {
    padding: '10px 15px',
    width: '100%',
    fontSize: '1em',
    marginBottom: '10px',
    border: 'none',
    borderBottom: '2px solid white',
    backgroundColor: 'transparent',
    color: 'white'
};

const startButtonStyle = {
    padding: '10px 30px',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#E91E63',
    color: 'white',
    cursor: 'pointer',
    marginTop: '10px'
};

const driverButtonStyle = {
    ...startButtonStyle,
    backgroundColor: '#3498DB'
};

const loginContainer = {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '1.2em'
};

const loginButtonStyle = {
    padding: '8px 20px',
    fontSize: '1em',
    border: '1px solid white',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    marginLeft: '10px',
    transition: 'background-color 0.3s ease',
};

export default Home;
