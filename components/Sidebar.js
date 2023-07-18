import React, {useEffect, useRef, useState } from "react";
import styles from "../styles/sidebar.module.css";
import Image from "next/image";


export default function Sidebar({ width=280, children }) {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();
  
  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };
  
  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async e => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-width); 
      await setOpen(false);
    }
  }

  useEffect(()=> {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  })
  
  
 
  return (
    <div className={styles.container}>
      <div ref={side}  className="shadow-lg bg-gray-100 fixed top-0 bottom-0 right-0 transition ease duration-400 text-gray-800 z-50" style={{ width: `${width}px`, height: '100%',  transform: `translatex(${-xPosition}px)`}}>
          <button onClick={() => toggleMenu()}
          className={styles.button}>
            {isOpen ? 
            <span className="font-medium">X</span> : <Image src="/sidemenu.png" width="50" height="50" alt="contact open button" className={styles.openBtn}/>
            } 
          </button>
        <div className={styles.content}>{children}</div>
        {/*//사이드바 컴포넌트 내부 값이 구현되는 위치*/}
      </div>
    </div>
  );
};