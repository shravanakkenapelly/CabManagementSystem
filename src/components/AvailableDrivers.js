import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AvailableDrivers = () => {
    const location = useLocation();
    const originalDrivers = location.state?.drivers || [];
    const selectedCabType = location.state?.selectedCabType;
    const tripBookingId = location.state?.tripBookingId;

    const navigate = useNavigate();

    console.log("Trip Booking ID:", tripBookingId);
    console.log("Selected Cab Type:", selectedCabType);
    console.log("Available drivers:", originalDrivers);

    const shuffledDrivers = [...originalDrivers].sort(() => Math.random() - 0.5); // Shuffling drivers

    const handleDriverSelection = (selectedDriver) => {
        console.log("Selected Driver:", selectedDriver.userName);
        navigate('/driver-details', { state: { selectedDriver, tripBookingId: tripBookingId } });
    }

    return (
        <div className="avaidri" style={styles['avaidri']}>
        <div style={styles.container}>
            <h1 style={styles.header}>Available Drivers</h1>
            {shuffledDrivers.length > 0 ? (
                shuffledDrivers.map(driver => (
                    <div key={driver.userName} style={styles.card}>
                        <h2 style={styles.driverName}>{driver.userName}</h2>
                        <p style={styles.cabType}>Cab Type: {selectedCabType}</p>
                        <button onClick={() => handleDriverSelection(driver)} style={styles.button}>
                            Select this Driver
                        </button>
                    </div>
                ))
            ) : (
                <p style={styles.noDrivers}>No drivers available at the moment.</p>
            )}
        </div>
        </div>
    );
}


const styles = {
    container: {
        maxWidth: '700px',
        margin: '3.5rem auto',
        padding: '0 1rem'
    },
    'avaidri':{
        height:'33rem',
        backgroundColor:'#2376af'
    },
    header: {
        fontSize: '2rem',
        marginBottom: '2rem',
        color: '#fff',
        textAlign: 'center'
    },
    card: {
        background: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    driverName: {
        fontSize: '1.5rem',
        color: '#333',
        marginBottom: '1rem'
    },
    cabType: {
        marginBottom: '1rem',
        color: '#555'
    },
    button: {
        backgroundColor: '#3498DB',
        color: '#fff',
        padding: '0.5rem 1.5rem',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#2980B9'
        }
    },
    noDrivers: {
        textAlign: 'center',
        color: '#888',
        fontSize: '1rem'
    }
};

export default AvailableDrivers;