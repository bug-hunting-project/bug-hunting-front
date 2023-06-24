import Link from "next/link";
import {useState} from "react";
import ModalBasic from "./ModalBasic";

// Modal On
function Modal(){
  const [modalOpen, setModalOpen] = useState(false);
  const howModal = () => {
    setModalOpen(true);
  };

  return(
    <div>
      <button onClick={howModal}>Login</button>
      {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
    </div>
  );
}


export default function NavBar() {

  return (
    <nav>
      <img src="/vercel.svg" />
      <div>
        <Link href="/">
          Home
        </Link>
        <Link href="/about">
          About
        </Link>
        <Link href="/api/auth/signin">
          Sign
        </Link>
        <Modal />
      </div>
      <style jsx>{`
        Modal{
          color: red;
        }
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
