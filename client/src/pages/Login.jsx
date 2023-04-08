import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { observer } from 'mobx-react-lite'

const Login = () => {
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')

  const {store} = useContext(Context)

  return (
    <div>
      <input
        onChange={e => {setNumber(e.target.value)}}
        value={number}
        type='text'
        placeholder='number'
      ></input>
      <input
        onChange={e => {setPassword(e.target.value)}}
        value={password}
        type='text'
        placeholder='password'
      ></input>
      <button onClick={() => store.login(number, password)}>Login</button>
    </div>
  )
}

export default observer(Login)
