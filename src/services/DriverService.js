import axios from 'axios';

const DRIVER_API_BASE_URL = "http://localhost:8080/driver";

class DriverService {
    // Register a new driver
    registerDriver(driver) {
        return axios.post(`${DRIVER_API_BASE_URL}/register`, driver);
    }

    // Get all drivers
    getDrivers() {
        return axios.get(`${DRIVER_API_BASE_URL}/getdriver`);
    }

    // Update a driver by license number
    updateDriver(licenseNo, driver) {
        return axios.put(`${DRIVER_API_BASE_URL}/update/${licenseNo}`, driver);
    }

    // Get drivers by their availability
    getDriverByAvailability(driverAvailability) {
        return axios.get(`${DRIVER_API_BASE_URL}/getdriver/${driverAvailability}`);
    }

    // Get a driver by their username
    getDriverByUsername(userName) {
        return axios.get(`${DRIVER_API_BASE_URL}/getdriverbyuser/${userName}`);
    }
}

export default new DriverService();
