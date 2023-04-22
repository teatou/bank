import { observer } from 'mobx-react-lite'
import React, { useState, useEffect, useContext } from 'react'
import UserService from '../services/UserService';
import '../styles/History.css'
import { Context } from '../main';

const History = () => {
    const [transactions, setTransactions] = useState([])
    const {store} = useContext(Context)

    useEffect(() => {
        getTransactions()
      }, [])

    async function getTransactions() {
        try {
            const response = await UserService.fetchTransactions()
            setTransactions(response.data)  
        } catch (e) {
            console.log(e.response)
        }
    }

    const sortDetailsUp = (e) => {
        e.preventDefault()
        transactions.sort((a, b) => {
            let numberA = a.from
            let numberB = b.from
            if (a.from === store.account.number) {
                numberA = a.to
            }
            if (b.from === store.account.number) {
                numberB = b.to
            }

            if (numberA > numberB) {
                return 1
            } else {
                return -1
            }
        })
        const tr = [...transactions]
        setTransactions(tr)
    }

    const sortDetailsDown = (e) => {
        e.preventDefault()
        transactions.sort((a, b) => {
            let numberA = a.from
            let numberB = b.from
            if (a.from === store.account.number) {
                numberA = a.to
            }
            if (b.from === store.account.number) {
                numberB = b.to
            }

            if (numberA > numberB) {
                return -1
            } else {
                return 1
            }
        })
        const tr = [...transactions]
        setTransactions(tr)
    }

    const sortDateUp = (e) => {
        e.preventDefault()
        transactions.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
        const tr = [...transactions]
        setTransactions(tr)
    }

    const sortDateDown = (e) => {
        e.preventDefault()
        transactions.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        const tr = [...transactions]
        setTransactions(tr)
    }

    const sortTotalUp = (e) => {
        e.preventDefault()
        transactions.sort((a, b) => a.sum > b.sum ? 1 : -1)
        const tr = [...transactions]
        setTransactions(tr)
    }

    const sortTotalDown = (e) => {
        e.preventDefault()
        transactions.sort((a, b) => a.sum > b.sum ? -1 : 1)
        const tr = [...transactions]
        setTransactions(tr)
    }

    return (
        <div className='history-container'>
            <h1>Transactions</h1>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <span>Details</span>
                            <button onClick={sortDetailsUp}>up</button>
                            <button onClick={sortDetailsDown}>down</button>
                        </th>
                        <th>
                            <span>Date</span>
                            <button onClick={sortDateUp}>up</button>
                            <button onClick={sortDateDown}>down</button>
                        </th>
                        <th>
                            <span>Total</span>
                            <button onClick={sortTotalUp}>up</button>
                            <button onClick={sortTotalDown}>down</button>
                        </th>
                    </tr>
                    {transactions.length != 0 ? transactions.map(t =>
                    <tr key={t.id}>
                        <td>{t.from === store.account.number ? t.to : t.from}</td>
                        <td>{t.createdAt}</td>
                        <td>{t.from === store.account.number ? '+' : '-'} ${t.sum}</td>
                    </tr>) : <tr>
                        <td>no data</td>
                        <td>no data</td>
                        <td>no data</td>
                    </tr>}
                </tbody>
            </table>
        </div>
    )
}

export default observer(History)
