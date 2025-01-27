import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import logo from "../assets/logo.png";
import '../css/custom.css'
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Home from "./Home";
import top from '../assets/top.svg'

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
          const log = localStorage.getItem("verified");
          setVerified(log);
    }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userotp = { otp: otp };
    axios
      .post("http://localhost:7005/verify-email", userotp)
      .then(() => {
        toast.success("Email Verified");
        setVerified(true);
        localStorage.setItem("verified", true);
        localStorage.setItem("email",email);
        setEmail("");
        setOtp("");
      })
      .catch((error) => {
        toast.error("Verification Failed");
        console.log("error", error);
      });
  };

  const signoutHandler = () => {
    localStorage.clear("verified");
    setVerified(false);
  }

  return (
    <>
    {!verified ?
    <div className="d-flex flex-column align-items-center">
    <div className="d-flex justify-content-center m-3">
      <img src={logo} alt="" />
    </div>

    <h3 className="sign-up-heading">Sign In</h3>
    <p className="sign-up-para">Please login to continue to your account.</p>

    <form
      className="mx-auto mt-2 p-4 border rounded"
      style={{ maxWidth: "600px" }}
    >
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
              required
            />
          </div>
        </fieldset>
      </div>

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

      <button
        className="btn btn-primary w-100"
        onClick={(e) => {
          submitHandler(e);
        }}
      >
        Sign In
      </button>
    </form>

    <div className='d-flex mt-3 justify-content-center'>
   <p className='sign-up-para'>Need an account?</p>
   <Link to='/register'>Create One</Link>
   </div>
  </div>
  :
  <>
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
