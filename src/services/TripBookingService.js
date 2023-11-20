import axios from 'axios';

const TRIPBOOKING_API_BASE_URL = "http://localhost:8080/trip";

class TripBookingService {

    addTripBooking(tripBooking, userName) {
        return axios.post(`${TRIPBOOKING_API_BASE_URL}/addtripbooking/${userName}`, tripBooking);
    }    

    updateTripBooking(tripBookingId, tripBooking, userName) {
        return axios.put(`${TRIPBOOKING_API_BASE_URL}/update/${tripBookingId}/${userName}`, tripBooking);
    }

    cancelTripBooking(tripBookingId) {
        return axios.delete(`${TRIPBOOKING_API_BASE_URL}/cancel/${tripBookingId}`);
    }

    viewAllBookings() {
        return axios.get(`${TRIPBOOKING_API_BASE_URL}/viewallbookings`);
    }

    viewBookingByBookingId(tripBookingId) {
        return axios.get(`${TRIPBOOKING_API_BASE_URL}/viewbookingbybookingid/${tripBookingId}`);
    }

    viewBookingByBookingStatus(status) {
        return axios.get(`${TRIPBOOKING_API_BASE_URL}/viewbookingbybookingstatus/${status}`);
    }

    viewBookingsByDatewiseSortingOrder() {
        return axios.get(`${TRIPBOOKING_API_BASE_URL}/viewbookingsbydatewisesortingorder`);
    }

    viewBookingByUserName(userName){
        return axios.get(`${TRIPBOOKING_API_BASE_URL}/viewBooking/${userName}`);
    }

}

export default new TripBookingService();
