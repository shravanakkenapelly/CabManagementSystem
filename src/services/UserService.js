import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/user";

class UserService {
    
    logInCustomer(userName, password) {
        return axios.post(`${USER_API_BASE_URL}/customer?userName=${userName}&password=${password}`, {
            userName: userName,
            password: password
        });
    }

    logOutCustomer(logoutMsg) {
        return axios.get(`${USER_API_BASE_URL}/customer/logout/${logoutMsg}`);
    }

    logInDriver(userName, password) {
        return axios.post(`${USER_API_BASE_URL}/driver?userName=${userName}&password=${password}`, {
            userName: userName,
            password: password
        });
    }

    logOutDriver(logoutMsg) {
        return axios.get(`${USER_API_BASE_URL}/driver/logout/${logoutMsg}`);
    }

}

export default new UserService();
