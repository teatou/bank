import AuthService from '../services/AuthService'
import $api from '../api/api'
import { makeAutoObservable } from 'mobx'

export default class Store {
    account = {}
    transactions = []
    isAuth = false
    isLoading = false
    isFirstTime = true

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

    setTransactions(transactions) {
        this.transactions = transactions
    }

    async login(number, password) {
        try {
            await AuthService.login(number, password)
            this.setAuth(true)
            localStorage.setItem('isAuth', 'true')
            await this.checkAuth()
        } catch (e) {
            console.log(e.response.data)
        }
    }

    async signup(firstName, lastName, password) {
        try {
            const response = await AuthService.signup(firstName, lastName, password)
            this.setAuth(true)
            await this.login(response.data.number, response.data.password)
        } catch (e) {
            console.log(e)
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('isAuth')
            this.setAuth(false)
            this.setAccount({})
            this.setTransactions([])
        } catch (e) {
            console.log(e.response)
        }
    }

    async checkAuth() {
        this.setLoading(true)

        try {
            const response = await $api.get('/account')
            this.setAuth(true)
            this.setAccount(response.data.account)
            this.setTransactions(response.data.transactions)
        } catch (e) {
            await this.logout()
            console.log(e.response)
        } finally {
            this.setLoading(false)
        }
    }
}