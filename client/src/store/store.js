import AuthService from '../services/AuthService'
import $api from '../api/api'
import { makeAutoObservable } from 'mobx'
import UserService from '../services/UserService'

export default class Store {
    account = {}
    isAuth = false
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setAccount(account) {
        this.account = account
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    async login(number, password) {
        try {
            const response = await AuthService.login(number, password)
            console.log(response)
            this.setAuth(true)
            this.setAccount(response.data.account)
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
            this.setAccount(response.data.account)
        } catch (e) {
            console.log(e.response)
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('isAuth')
            this.setAuth(false)
            this.setAccount({})
        } catch (e) {
            console.log(e.response)
        }
    }

    async checkAuth() {
        this.setLoading(true)

        try {
            const response = await $api.get('/validate')
            console.log(response)
            this.setAccount(response.data.account)
        } catch (e) {
            await this.logout()
            console.log(e.response)
        } finally {
            this.setLoading(false)
        }
    }

    async getAccount() {
        try {
            await UserService.fetchAccount()
            this.setAccount(response.data.account)
        } catch (e) {
            console.log(e.response)
        }
    }
}