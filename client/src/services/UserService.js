export default class UserService {
    static fetchTransactions() {
        return $api.get('/transactions')
    }
}