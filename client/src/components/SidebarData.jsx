import React from "react";
import {AiOutlineHistory, AiOutlineHome} from 'react-icons/ai'

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "History",
    path: "/history",
    icon: <AiOutlineHistory />,
    cName: "nav-text",
  },
];