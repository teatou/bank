import { observer } from 'mobx-react-lite'
import React, { useState, useEffect, useContext } from 'react'
import UserService from '../services/UserService';
import '../styles/History.css'
import { Context } from '../main';
import {GoTriangleDown, GoTriangleUp} from 'react-icons/go'

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

    const green = {
        color: '#228c22'
      }
    
      const red = {
        color: '#d21404'
      }

    return (
        <div className='history-container'>
            <h1>My transactions</h1>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <div className='header-container'>
                                <span>Date</span>
                                <div className='sorting-container'>
                                    <GoTriangleUp className='sorting-icon' onClick={sortDateUp}/>
                                    <GoTriangleDown className='sorting-icon' onClick={sortDateDown}/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className='header-container'>
                                <span>Details</span>
                                <div className='sorting-container'>
                                    <GoTriangleUp className='sorting-icon' onClick={sortDetailsUp}/>
                                    <GoTriangleDown className='sorting-icon' onClick={sortDetailsDown}/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className='header-container'>
                                <span>Total</span>
                                <div className='sorting-container'>
                                    <GoTriangleUp className='sorting-icon' onClick={sortTotalUp}/>
                                    <GoTriangleDown className='sorting-icon' onClick={sortTotalDown}/>
                                </div>
                            </div>
                        </th>
                    </tr>
                    {transactions.length != 0 ? transactions.map(t =>
                    <tr key={t.id}>
                        <td>{t.createdAt.slice(8, 10) + '/' + t.createdAt.slice(5, 7) + '/' + t.createdAt.slice(2, 4) + ' ' + t.createdAt.slice(11,16)}</td>
                        <td>{t.from === store.account.number ? t.to : t.from}</td>
                        <td className='greenred' style={t.from === store.account.number ? green : red}>{t.from === store.account.number ? '+' : '-'}${t.sum}</td>
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
