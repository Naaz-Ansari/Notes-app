import React, { useEffect, useState } from 'react'
import '../css/custom.css'
import { Eye, EyeOff } from "react-feather";
import axios from 'axios';
import toast from 'react-hot-toast';
import Home from './Home';
import logo from '../assets/logo.png'
import top from '../assets/top.svg'
import { Link } from 'react-router-dom';
import SignIn from './SignIn';

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState()
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const log = localStorage.getItem("verified");
        setVerified(log);
        
      }, [])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const otpClickHandler = (e) => {
        e.preventDefault();
        if(username==='' || email==='' || dob==='') {
            return
        }
        else {
            const user = {
                username: username,
                email: email,
                dob: dob
            }
            console.log("user",user)   
            axios.post("http://localhost:7005/register",user)
            .then(()=>{
                toast.success("OPT Send");
                localStorage.setItem("user",user.username);
                localStorage.setItem("email",user.email);
            })
            .catch((error)=>{toast(error.response.data.message)})
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const userotp = {otp: otp}
        const useremail = {email:email}
        axios.post("http://localhost:7005/verify-email",userotp)
        .then(()=>{
            toast.success("Email Verified");
            setVerified(true); 
            localStorage.setItem("verified",true)
            setUsername('');
            setEmail('');
            setOtp('');
            setDob();
        })
        .catch((error)=>{toast.error("Verification Failed"); console.log("error",error)})
    }

    const signoutHandler = () => {
        localStorage.clear("verified");
        setVerified(false);
      }

  return (
    <>
    { !verified ?
     <div className='d-flex flex-column align-items-center'>
        <div className='d-flex justify-content-center m-3'>
              <img src={logo} alt="" />
            </div>
     <h3 className='sign-up-heading'>Sign up</h3>
     <p className='sign-up-para'>Sign up to enjoy the feature of HD</p>
     <div className='container'>
     <form
       className="mx-auto mt-2 p-4 border rounded"
       style={{ maxWidth: "600px" }}
     >
       {/* Name Field */}
       <div className="mb-3">
         <fieldset>
           <legend htmlFor="name" className="form-label">
             Your Name
           </legend>
           <input
             type="text"
             className="form-control"
             id="name"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
           />
         </fieldset>
       </div>

       {/* Date of Birth Field */}
       <div className="mb-3">
         <fieldset>
           <legend htmlFor="dob" className="form-label">
             Date of Birth
           </legend>
           <input
             type="date"
             className="form-control"
             id="dob"
             value={dob}
             onChange={(e) => setDob(e.target.value)}
             required
           />
         </fieldset>
       </div>

       {/* Email Field */}
       <div className="mb-3">
         <fieldset>
           <legend htmlFor="email" className="form-label">
             Email
           </legend>
           <div className="d-flex gap-2 align-items-center">
             <input
               type="email"
               className="form-control"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Enter your email"
               required
             />
             <button
               className="btn btn-primary px-4"
               type="button"
               id="button-addon2"
               disabled={!email.trim()}
               onClick={(e) => otpClickHandler(e)}
             >
               Send OTP
             </button>
           </div>
         </fieldset>
       </div>

       {/* OTP Field */}
       <div className="mb-3">
         <div className="input-group">
           <input
             type={showPassword ? "text" : "password"}
             id="password"
             className="form-control"
             placeholder="OTP"
             value={otp}
             onChange={(e) => setOtp(e.target.value)}
           />
           <span
             className="input-group-text"
             onClick={togglePasswordVisibility}
             style={{ cursor: "pointer" }}
           >
             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
           </span>
         </div>
       </div>

       {/* Submit Button */}
       <button
         className="btn btn-primary w-100"
         onClick={(e)=>{submitHandler(e)}}
       >
         Sign Up
       </button>
     </form>
     <div className='d-flex mt-3 justify-content-center'>
     <p className='sign-up-para'>Already have an account?</p>
     <Link to='/signin'>Sign in</Link>
     </div>
     </div>
    
   </div> 
   : <>
   <div className='d-flex justify-content-between m-3'>
        <div className='d-flex gap-2'>
          <img src={top} alt="" />
          <p className='mb-0'>Dashboard</p>
        </div>
        <div>
          <button className='btn signout-btn' onClick={()=>signoutHandler()}>Sign Out</button>
        </div>
      </div>
      <Home></Home>
   </>
   }
    </>  
   
  );
}
