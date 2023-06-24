import React,{ useState } from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

const Header = (props) => {
    return (
      <div>
        <nav>
          <ul>
            <li>home</li>
            <li>project</li>
          </ul>
        </nav>
        <Sidebar width={320}>
          <NavBar />
        </Sidebar>
      </div>
      )
  };
  
  export default Header;