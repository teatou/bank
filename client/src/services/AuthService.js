import { AxiosResponse } from "axios"

export default class AuthService {
    async login(number, password) {
        return $api.post('/login', {number, password})
    }

    async signup(firstName, lastName, password) {
        return $api.post('/signup', {firstName, lastName, password})
    }
}
