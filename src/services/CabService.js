import axios from 'axios';

const CAB_API_BASE_URL = "http://localhost:8080/cab";

class CabService {

    registerCab(cab, userName) {
        return axios.post(`${CAB_API_BASE_URL}/registercab/${userName}`, cab);
    }

    updateCabByUsername(userName, updatedCab) {
        return axios.put(`${CAB_API_BASE_URL}/updatecabbyusername/${userName}`, updatedCab);
    }

    getCabs() {
        return axios.get(`${CAB_API_BASE_URL}/viewcabs`);
    }

    getCabByUserName(userName) {
        return axios.get(`${CAB_API_BASE_URL}/byusername/${userName}`);
    }

    getCabsByType(cabType) {
        return axios.get(`${CAB_API_BASE_URL}/viewcabsbytype/${cabType}`);
    }

    getCabsByCurrentLocation(currentLocation) {
        return axios.get(`${CAB_API_BASE_URL}/viewcabsbycurrentlocation/${currentLocation}`);
    }

    getCabById(cabId) {
        return axios.get(`${CAB_API_BASE_URL}/viewCabById/${cabId}`);
    }

    getCabsByTypeAndLocation(cabType, currentLocation) {
        return axios.get(`${CAB_API_BASE_URL}/viewcabsbytypeandcurrentlocation/${cabType}/${currentLocation}`);
    }

    getCabsByAvailability(cabAvailability) {
        return axios.get(`${CAB_API_BASE_URL}/viewcabsbyavailability/${cabAvailability}`);
    }

}

export default new CabService();
