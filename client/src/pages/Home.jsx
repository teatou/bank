import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import '../styles/Home.css'
import { Context } from '../main';

const Home = () => {
  const {store} = useContext(Context)

  return (
    <main>
      <div className='card-info'>
        <span>My card</span>
        <span>$ {store.account.balance}</span>
        <span>{store.account.number}</span>
      </div>
      <div className='last-transactions'>
        <span>last transactions</span>
        {store.transactions.map(t => <div key={t.id}>{t.sum}</div>)}
      </div>
      <div className='transfer'>
        <input></input>
      </div>
    </main>
  )
}

export default observer(Home)
