import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import { Context } from '../main';
import '../styles/Sidebar.css'
import {AiOutlinePoweroff} from 'react-icons/ai'
import { observer } from 'mobx-react-lite';

const Navbar = () => {
  const {store} = useContext(Context)

  return (
    <div className='sidebar'>
      <div className='account-name'>
        <span className='icon1'>{store.account.firstName + ' ' + store.account.lastName}</span>
        <span className='icon2'>B</span>
      </div>
      <div className='bottom-nav'>
        <IconContext.Provider value={{size: 24}}>
          <nav>
            <ul>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
        <div className='logout'>
          <button className='logout-btn' onClick={() => {
            store.logout()
            window.location.reload(false)
            }}>
              <AiOutlinePoweroff size={24} className='logout-icon'/>
              <span>Logout</span>
            </button>
        </div>
      </div>
    </div>
  );
}

export default observer(Navbar);
