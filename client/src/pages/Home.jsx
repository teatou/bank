import React, { useContext } from 'react'
import { Context } from '../main';
import { observer } from 'mobx-react-lite';

const Home = () => {
  const {store} = useContext(Context)

  return (
    <div>
      <button onClick={() => store.logout()}>logout</button>
    </div>
  )
}

export default observer(Home)
