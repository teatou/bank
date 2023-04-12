import $api from "../api/api";

export default class UserService {
    static fetchTransactions() {
        return $api.get('/transactions')
    }

    static fetchAccount() {
        return $api.get('/account')
    }

    static fetchNavbar() {
        return $api.get('/navbar')
    }
}