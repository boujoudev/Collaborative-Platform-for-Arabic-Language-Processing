import React, { useState } from "react";

const SignInPage = () => {
  const [show, setShow] = useState(false);

  function ChangeShowButton() {
    setShow((prev) => !prev);
  }

  return (
    <div className=" SignInPage">
      <h1>Name Platform</h1>
      <h2 style={{ color: "black" }}>Create an account</h2>
      <div className="InfoInput">
        <form className="formSignInPage">
          <label className="labelText" htmlFor="Email Address">Email Address</label>
          <input
            id="Email Address"
            type="email"
            placeholder="Enter your email address"
            className="input"
          />

          <label className="labelText" htmlFor="Password">Password</label>
          <div className="Passworddd">
            <input className="inputPassword" placeholder="Enter your password" type={show ? "text" : "password"} />
            <button type="button" className="buttonShow" onClick={ChangeShowButton}>
              {!show ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}
            </button>
          </div>
        </form>
      </div>
      <button type="submit" className="ButtonSignIn">
        Sign In
      </button>
      <p className="login-text">
        Don't have an account?{" "}
        <a href="#" className="signup-link">
          Sign Up
        </a>
      </p>
      <div className="social-icons">
        <a className="social" href="#">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a className="social" href="#">
          <i class="fa-brands fa-square-twitter"></i>
        </a>
        <a className="social" href="#">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a className="social" href="#">
          <i class="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

export default SignInPage;
