import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../styles/Home.css'
import { Context } from '../main';
import UserService from '../services/UserService';
import {FcSimCardChip} from 'react-icons/fc'

const Home = () => {
  const {store} = useContext(Context)
  const [to, setTo] = useState('')
  const [sum, setSum] = useState('')
  const [transferError, setTransferError] = useState('') 

  const transfer = async (e, to, sum) => {
    e.preventDefault()
    try {
      await UserService.transferMoney(to, sum)
      setTransferError('Operation successful')
      store.checkAuth()
    } catch (e) {
      setTransferError('Operation failed: ' + e.response.data.error)
    }
  }

  return (
    <main>
      <div className='card-info'>
        <h1>My card</h1>
        <div className='card'>
          <div className='debit-chip'>
            <span className='debit'>Debit</span>
            <FcSimCardChip className='chip' size={46} color='white'/>
          </div>
          <span className='balance'>${store.account.balance}</span>
          <div className='name-number'>
            <span className='accountName'>{store.account.firstName + ' ' + store.account.lastName}</span>
            <span className='cardNumber'>{store.account.number}</span>
          </div>
          <span className='activated'>Activated {store.account.createdAt != undefined ? store.account.createdAt.slice(5, 7) + '/' + store.account.createdAt.slice(2, 4) : '00/00'}</span>
        </div>
      </div>
      <div className='last-transactions'>
        <h1>Last transactions</h1>
        {store.transactions.length != 0 ? store.transactions.map(t => <div className='lastTransaction' key={t.id}>
            {t.from == store.account.number ? <span>+</span> : <span>-</span>}
            <span>{t.from === store.account.number ? t.to : t.from}</span>
            <span>{t.from === store.account.number ? '+' : '-'} ${t.sum}</span>
          </div>) : <div>No transactions</div>}
      </div>
      <div className='transfer'>
        <h1>Quick transfer</h1>
        <form onSubmit={(e) => transfer(e, to, sum)}>
          <label htmlFor='to' className='labell'>
            <input type="text" placeholder="Card number" id='to' value={to} onChange={(e) => setTo(e.target.value)}/>
          </label>
          <label htmlFor='sum' className='labell'>
            <input type="text" placeholder="Amount" id='sum' autoComplete='off' value={sum} onChange={(e) => setSum(e.target.value)}/>
          </label>
          <button type="submit">{String('>')}</button>
        </form>
        <div>{transferError}</div>
      </div>
    </main>
  )
}

export default observer(Home)
