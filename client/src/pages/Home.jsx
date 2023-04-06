import React, { useContext } from 'react'
import { Context } from '../main';

const Home = () => {
  const {store} = useContext(Context)

  return (
    <div>
      <button onClick={() => store.logout()}>logout</button>
    </div>
  )
}

export default Home
