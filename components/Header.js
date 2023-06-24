import React,{ useState } from 'react';
import Sidebar from './Sidebar';
import Link from 'next/link';


import ModalBasic from "./ModalBasic";

// Modal On
function Modal(){
  const [modalOpen, setModalOpen] = useState(false);
  const howModal = () => {
    setModalOpen(true);
  };

  return(
    <div>
      <button onClick={howModal}>Sign up</button>
      {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
    </div>
  );
}

export default function Header(props){
  return (
    <div>
      <Sidebar width={320}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Modal /></li>
          <li><Link href="/api/auth/signin">Sign in</Link></li>
          <li><Link href="/about">About us</Link></li>
        </ul>
      </Sidebar>


      <style jsx>{`
        li {
          padding: 50px;
        }
      `}</style>

    </div>
    )
};