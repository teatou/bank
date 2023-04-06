import $api from "../api/api"

export default class AuthService {
    static async login(number, password) {
        const body = { number: parseInt(number, 10), password: password }
        return $api.post('/login', body)
    }

    static async signup(firstName, lastName, password) {
        return $api.post('/signup', {firstname: firstName, lastname: lastName, password: password})
    }

    static async logout() {
        return $api.post('/logout', {})
    }
}
