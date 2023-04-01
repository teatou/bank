export default class UserService {
    fetchTransactions() {
        return $api.get('/transactions')
    }
}