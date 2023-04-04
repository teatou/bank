import {makeAutoObservable} from 'mobx'
import AuthService from '../services/AuthService'

export default class Store {
    user
    isAuth

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    async login(number, password) {
        try {
            const response = await AuthService.login(number, password)
            localStorage.setItem('token', response.data.accessToken)
            console.log(response)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response.data)
        }
    }

    async signup(firstName, lastName, password) {
        try {
            const response = await AuthService.signup(firstName, lastName, password)
            localStorage.setItem('token', response.data.accessToken)
            console.log(response)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response.data.error)
        }
    }
}