import React, { useContext, useState } from 'react'
import { Context } from '../main'

export default function Signup() {
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const {store} = useContext(Context)

  return (
    <div>
      <input
        onChange={e => {setFirstName(e.target.value)}}
        value={firstName}
        type='text'
        placeholder='firstname'
      ></input>
      <input
        onChange={e => {setLastName(e.target.value)}}
        value={lastName}
        type='text'
        placeholder='lastname'
      ></input>
      <input
        onChange={e => {setPassword(e.target.value)}}
        value={password}
        type='text'
        placeholder='password'
      ></input>
      <button onClick={() => store.signup(firstName, lastName, password)}>Signup</button>
    </div>
  )
}
