import AuthService from '../services/AuthService'
import $api from '../api/api'
import { makeAutoObservable } from 'mobx'

export default class Store {
    account = {}
    transactions = []
    transactionsMonth = {
        datasets: [
            {
                label: "Money flow",
                borderColor: "#e0e9b6",
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
            },
        ]
    }
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

    setTransactionsMonth(transactions) {
        const data = new Map()
        
        for (let i = 0; i < transactions.length; i++) {
            let t = transactions[i]
            let date = t.createdAt.slice(8, 10) + '/' +t.createdAt.slice(5, 7)
            // let date = t.createdAt.slice(11, 13) + '/' + t.createdAt.slice(14, 16) every minute
            if (data.has(date)) {
                data.set(date, (data.get(date) ?? 0) + t.sum)
            } else {
                data.set(date, t.sum)
            }
        }

        let keys = []
        for (let key of data) {
            keys.push(key)
        }   

        const sp = {
            labels: keys,
            datasets: [
                {
                    label: "Money flow",
                    data: [...data.values()],
                    fill: true,
                    borderColor: "#e0e9b6",
                    backgroundColor: "rgba(75,192,192,0.2)",
                },
            ]
        }

        this.transactionsMonth = sp
    }

    async login(number, password) {
        try {
            await AuthService.login(number, password)
            this.setAuth(true)
            localStorage.setItem('isAuth', 'true')
            await this.checkAuth()
            return ''
        } catch (e) {
            console.log(e.response.data)
            return e.response.data
        }
    }

    async signup(firstName, lastName, password) {
        try {
            const response = await AuthService.signup(firstName, lastName, password)
            this.setAuth(true)
            await this.login(response.data.number, response.data.password)
            return ''
        } catch (e) {
            console.log(e.response.data)
            return e.response.data
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('isAuth')
            this.setAuth(false)
            this.setAccount({})
            this.setTransactions([])
            this.setTransactionsMonth([])
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
            const response2 = await $api.get('/transactions/month')
            this.setTransactionsMonth(response2.data)
        } catch (e) {
            await this.logout()
            console.log(e.response)
        } finally {
            this.setLoading(false)
        }
    }
}