import {useState} from "react";
//import auth from "../pages/api/auth/[...nextauth]";

import { BaseAuthLayout } from "./Auth/Base";
import { LoginForm } from "./Auth/Login";
import Link from "next/link";

const styles = {
  marginTop: 30,
  textAlign: "center",
};

function test({setModalOpen}){
  return(
    <button onClick={closeModal} className={"xbutton"}>
            X
    </button>
  );
}

function ModalBasic({setModalOpen}){
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
      <div>
        <BaseAuthLayout>
        <LoginForm />
          {/*<div style={styles}>
          <Link href="/auth/register">Signup now!</Link>
          </div>*/}
        </BaseAuthLayout>
        <button onClick={closeModal} className={"xbutton"}>
            X
        </button>

        {/*<auth />*/}
        <style jsx>{`
                div{
                    width: 300px;
                    height: 200px;
                  
                    z-index: 999;
                    
                    position: absolute;
                    top: 50%;
                    left: -110%;
                    transform: translate(-50%, -50%);

                    background-color: #CCCCCC;
                    border: 1px solid black;
                    border-radius: 8px;
                }
                .xbutton{
                    color: blue;
                }
                button{
                    position: absolute;
                    right: 10px;
                    top: 10px;
                }
            `}
        </style>
      </div>
  );
}
export default ModalBasic;