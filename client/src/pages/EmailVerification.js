import React from 'react';
import {useNavigate} from "react-router-dom";
import success from "../images/success.png"

const EmailVerification = () => {
    const navigate = useNavigate();
  return (
    <div className='emailVerification'>
        <img src={success} alt={success}/>
        <h1 style={{fontFamily:"cursive"}}>Email verified successfully</h1>
        <button style={{borderRadius: "10px", width:"100px", border:"none", padding:"5px", color:"white", backgroundColor:"#1a365d"}} onClick={()=>navigate("/")}>Login</button>
    </div>
  )
}

export default EmailVerification