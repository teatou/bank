import AuthService from '../services/AuthService'
import $api from '../api/api'
import { makeAutoObservable } from 'mobx'

export default class Store {
    user = {}
    isAuth = false
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    async login(number, password) {
        try {
            const response = await AuthService.login(number, password)
            console.log(response)
            this.setAuth(true)
            this.setUser(response.data.account)
            localStorage.setItem('isAuth', 'true')
        } catch (e) {
            console.log(e.response.data)
        }
    }

    async signup(firstName, lastName, password) {
        try {
            const response = await AuthService.signup(firstName, lastName, password)
            console.log(response)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            console.log(response)
            this.setAuth(false)
            this.setUser({})
            localStorage.removeItem('isAuth')
        } catch (e) {
            console.log(e.response)
        }
    }

    async checkAuth() {
        this.setLoading(true)

        try {
            const response = await $api.get('/validate')
            console.log(response)
            
            this.setAuth(true)
            this.setUser(response.data.account)
        } catch (e) {
            console.log(e.response)
        } finally {
            this.setLoading(false)
        }
    }
}