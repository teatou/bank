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
    return (
        <div className='history-container'>
            {transactions.length != 0 ? transactions.map(t =>
            <div className='lastTransaction' key={t.id}>
                {t.from == store.account.number ? <span>+</span> : <span>-</span>}
                <span>{t.from === store.account.number ? t.to : t.from}</span>
                <span>{t.from === store.account.number ? '+' : '-'} ${t.sum}</span>
            </div>) : <div>No transactions</div>}
        </div>
    )
}

export default observer(History)
