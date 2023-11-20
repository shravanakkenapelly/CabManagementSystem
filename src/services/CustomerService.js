import axios from 'axios';

const CUSTOMER_API_BASE_URL = "http://localhost:8080/customer";

class CustomerService {

    registerCustomer(customer) {
        return axios.post(`${CUSTOMER_API_BASE_URL}/register`, customer);
    }

    updateCustomerByUserName(userName, customer) {
        return axios.put(`${CUSTOMER_API_BASE_URL}/updateCustomer/${userName}`, customer);
    }

    viewCustomerByUserName(userName) {
        return axios.get(`${CUSTOMER_API_BASE_URL}/viewcustomerbyusername/${userName}`);
    }
}

export default new CustomerService();
