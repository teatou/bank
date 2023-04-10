import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import { Context } from '../main';

function Navbar() {
  const {store} = useContext(Context)

  return (
    <div>
      <div>{store.account ? store.account.firstName + ' ' + store.account.lastName : 'user' }</div>
      <IconContext.Provider value={{ color: "undefined" }}>
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
      <button onClick={() => store.logout()}>logout</button>
    </div>
  );
}

export default Navbar;
