import $api from "../api/api"

export default class UserService {
    static async fetchTransactions() {
        return $api.get('/transactions')
    }

    static async fetchAccount() {
        return $api.get('/account')
    }

    static async fetchNavbar() {
        return $api.get('/navbar')
    }

    static async transferMoney(to, sum) {
        const body = { to: parseInt(to, 10), sum: parseInt(sum, 10) }
        return $api.post('/transfer', body)
    }
}