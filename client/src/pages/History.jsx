import { observer } from 'mobx-react-lite'
import React, { useState, useEffect } from 'react'
import UserService from '../services/UserService';

const History = () => {
    const [transactions, setTransactions] = useState([])

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
        <div>
        {transactions.map(t => 
            <div key={t.id}>{t.sum}</div>)}
        </div>
    )
}

export default observer(History)
