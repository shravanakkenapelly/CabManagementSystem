import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState(""); // "UPI", "CARD", or "CASH"
    const [upiID, setUpiID] = useState("");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvv: ""
    });
    const navigate = useNavigate();

    const handlePaymentCompletion = () => {
        if (paymentMethod === "UPI") {
            if (!upiID.includes('@')) {
                alert("UPI ID must contain '@'.");
                return;
            }
        } else if (paymentMethod === "CARD") {
            const cardNumberPattern = /^\d{16}$/;
            const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;  // MM/YY format
            const cvvPattern = /^\d{3,4}$/;  // 3 or 4 digits
    
            if (!cardNumberPattern.test(cardDetails.cardNumber)) {
                alert("Please enter a valid 16-digit card number.");
                return;
            }
            
            if (!expiryPattern.test(cardDetails.expiry)) {
                alert("Please enter a valid expiry date in MM/YY format.");
                return;
            }
    
            if (!cvvPattern.test(cardDetails.cvv)) {
                alert("Please enter a valid CVV. It should be 3 or 4 digits.");
                return;
            }
        }
    
        alert('Payment successful! Redirecting to home...');
        navigate('/customerhome');
    };

    return (
        <div style={styles.wrapper}>
        <div style={styles.container}>
            <h2>Select Payment Method</h2>

            <div style={styles.optionContainer}>
                <button onClick={() => setPaymentMethod("UPI")} style={styles.button}>UPI Payment</button>
                {paymentMethod === "UPI" && (
                    <div style={styles.paymentDetails}>
                        <input 
                            type="text"
                            placeholder="Enter UPI ID"
                            value={upiID}
                            onChange={(e) => setUpiID(e.target.value)}
                            style={styles.input}
                        />
                       <button onClick={handlePaymentCompletion} style={{...styles.button, ...styles.doneButton}}>Done</button>
                    </div>
                )}
            </div>

            <div style={styles.optionContainer}>
                <button onClick={() => setPaymentMethod("CARD")} style={styles.button}>Card Payment</button>
                {paymentMethod === "CARD" && (
                    <div style={styles.paymentDetails}>
                        <input 
                            type="text"
                            placeholder="Card Number"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                            style={styles.input}
                        />
                        <input 
                            type="text"
                            placeholder="Expiry MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                            style={styles.input}
                        />
                        <input 
                            type="text"
                            placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            style={styles.input}
                        />
                       <button onClick={handlePaymentCompletion} style={{...styles.button, ...styles.doneButton}}>Done</button>
                    </div>
                )}
            </div>

            <div style={styles.optionContainer}>
                <button onClick={() => { 
                    setPaymentMethod("CASH");
                    handlePaymentCompletion(); 
                }} style={styles.button}>Cash Payment</button>
            </div>
        </div>
        </div>
    );
}

const styles = {
    wrapper: {
        backgroundSize:'cover',
        backgroundImage:"url('fintech-payment-aggregators.jpeg')",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#f4f4f4' // Optional background color, adjust as needed
    },
    container: {
        maxWidth: '400px',
        margin: '0 auto',  // Adjusted the margin
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
    doneButton: {
        backgroundColor: '#E74C3C', 
        color: '#fff'
    }
};

export default Payment;
