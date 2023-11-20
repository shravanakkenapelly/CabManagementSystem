import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import UserRegistrationComponent from './components/UserRegistrationComponent'; 
import LoginComponent from './components/LoginComponent';
import CustomerHomePage from './components/CustomerHomePage';
import DriverHomePage from './components/DriverHomePage';
import AvailableDrivers from './components/AvailableDrivers';
import DriverDetails from './components/DriverDetails';
import TripDetails from './components/TripDetails';
import Payment from './components/Payment';
import RegisterCabComponent from './components/RegisterCabComponent';
import UpdateDriverProfileComponent from './components/UpdateDriverProfileComponent';
import UpdateCustomerProfileComponent from './components/UpdateCusromerProfileComponent';
import ViewCustomerProfile from './components/ViewCustomerProfile';
import ViewDriverProfile from './components/ViewDriverProfile';
import RideHistory from './components/RideHistory';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <div className="container123">
                    <Routes>
                        <Route path="/" exact element={<Main />} />
                        <Route path="/register" element={<UserRegistrationComponent />} />
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path="/customerHome" element={<CustomerHomePage/>}/>
                        <Route path="/driverHome" element={<DriverHomePage/>}/>
                        <Route path="/available-drivers" element={<AvailableDrivers />} />
                        <Route path="/driver-details" element={<DriverDetails />} />
                        <Route path="/tripdetails" element={<TripDetails/>} />
                        <Route path="/payment" element={<Payment/>} />
                        <Route path="/registerCab" element={<RegisterCabComponent/>} />
                        <Route path="/updateDriverProfile" element={<UpdateDriverProfileComponent/>} />
                        <Route path="/updateCustomerProfile" element={<UpdateCustomerProfileComponent/>} />
                        <Route path="/viewCustomerProfile" element={<ViewCustomerProfile/>} />
                        <Route path="/viewDriverProfile" element={<ViewDriverProfile/>} />
                        <Route path="/rideHistory" element={<RideHistory/>} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                        <Route path="/terms-of-service" element={<TermsOfService/>} />
                        <Route path="/contact" element={<ContactUs/>} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
