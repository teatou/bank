import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../styles/Home.css'
import { Context } from '../main';
import UserService from '../services/UserService';

const Home = () => {
  const {store} = useContext(Context)
  const [to, setTo] = useState('')
  const [sum, setSum] = useState('')
  const [transferError, setTransferError] = useState('')

  const transfer = async (e, to, sum) => {
    e.preventDefault()
    try {
      const response = await UserService.transferMoney(to, sum)
      setTransferError('Operation successful')
    } catch (e) {
      setTransferError('Operation failed: ' + e.response.data.error)
    }
  }

  return (
    <main>
      <div className='card-info'>
        <span>My card</span>
        <span>$ {store.account.balance}</span>
        <span>{store.account.number}</span>
      </div>
      <div className='last-transactions'>
        <span>last transactions</span>
        {store.transactions.length != 0 ? store.transactions.map(t => <div key={t.id}>{t.sum}</div>) : <div>No transactions</div>}
      </div>
      <div className='transfer'>
        <form onSubmit={(e) => transfer(e, to, sum)}>
          <input type="text" value={to} onChange={(e) => setTo(e.target.value)}/>
          <input type="text" value={sum} onChange={(e) => setSum(e.target.value)}/>
          <button type="submit">transfer</button>
        </form>
        <div>{transferError}</div>
      </div>
    </main>
  )
}

export default observer(Home)
