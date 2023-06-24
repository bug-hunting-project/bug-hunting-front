import Link from "next/link";
import {useState} from "react";
import ModalBasic from "./ModalBasic";
import Image from "next/image";

export default function NavBar() {

  return (
    <nav className="flex shadow-lg">
      <div className="logo">
        <Link href="/">
         <Image src="/logo.png" alt="logo" width="127" height="63"/>
        </Link> 
      </div>
      {/* <div>
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
      </div> */}
      <style jsx>{`
        Modal{
          color: red;
        }
        nav {
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
        }
        // nav a {
        //   font-weight: 600;
        //   font-size: 18px;
        // }
        // .active {
        //   color: tomato;
        // }
        // nav div {
        //   display: flex;
        //   gap: 10px;
        // }
      `}</style>
    </nav>
  );
}
