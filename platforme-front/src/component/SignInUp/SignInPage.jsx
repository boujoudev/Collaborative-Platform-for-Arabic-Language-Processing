import React, { useState } from "react";

const SignInPage = () => {
  const [show, setShow] = useState(false);
  const [EmailConnect, setEmailConnect] = useState("");
  const [PassWordConnect, setPassWordConnect] = useState("");
  const [UserInfoConnect, setUserInfoConnect] = useState({
    PassWord: "",
    Email: "",
  });
  const [TryToConnect, setTryToConnect] = useState(false);

  function ChangeShowButton() {
    setShow((prev) => !prev);
  }

  return (
    <form
      onSubmit={
        () => {
          
          setUserInfoConnect({ PassWordConnect, EmailConnect });
          console.log(UserInfoConnect);
          setEmailConnect("");
          setPassWordConnect("");
          console.log(UserInfoConnect);
          setTryToConnect(true);
        } // handleSubmit()  // setUserInfo({FullName,PassWord,Email})  // console.log(UserInfo)  // setFullName("")  // setPassWord("")  // setEmail("");
      }
      className=" SignInPage"
    >
      <h1>Name Platform</h1>
      <h2 style={{ color: "black" }}>Create an account</h2>
      <div className="InfoInput">
        <div className="formSignInPage">
          <label className="labelText" htmlFor="Email Address">
            Email Address
          </label>
          <input
          
            required
            value={EmailConnect}
            id="Email Address"
            type="email"
            placeholder="Enter your email address"
            className="input"
            onChange={(e) => setEmailConnect(e.target.value)}
          />

          <label className="labelText" htmlFor="Password">
            Password
          </label>
          <div className="Passworddd">
            <input
              
              required
              id="Password"
              value={PassWordConnect}
              className="inputPassword"
              placeholder="Enter your password"
              type={show ? "text" : "password"}
              onChange={(e) => setPassWordConnect(e.target.value)}
            />
            <button
              type="button"
              className="buttonShow"
              onClick={ChangeShowButton}
            >
              {!show ? (
                <i class="fa-solid fa-eye-slash"></i>
              ) : (
                <i class="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
        </div>
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
    </form>
  );
};

export default SignInPage;
