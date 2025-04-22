import React, { useState } from "react";
import "../App.css";

const SignUpPage = () => {
  const [show, setShow] = useState(false);
  const [FullName, setFullName] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [Email, setEmail] = useState("");
  const [UserInfo, setUserInfo] = useState({
    FullName: "",
    PassWord: "",
    Email: "",
  });

  function ChangeShowButton() {
    setShow((prev) => !prev);
  }
  return (
    <div className=" SignUpPage">
      <h1>Name Platform</h1>
      <h2 style={{ color: "black" }}>Create an account</h2>
      <div className="InfoInput">
        <form className="formSignUpPage">
          <label className="labelText" htmlFor="Email Address">
            Email Address
          </label>
          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            id="Email Address"
            type="email"
            placeholder="Enter your email address"
            className="input"
          />

          <label className="labelText" htmlFor="Full Name">
            Full Name
          </label>
          <input
            value={FullName}
            onChange={(e) => setFullName(e.target.value)}
            id="Full Name"
            type="text"
            placeholder="Enter your full name"
            className="input"
          />

          <label className="labelText" htmlFor="Password">
            Password
          </label>
          <div className="Passworddd">
            <input
              value={PassWord}
              onChange={(e) => setPassWord(e.target.value)}
              className="inputPassword"
              placeholder="Create your password"
              type={show ? "text" : "password"}
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
        </form>
      </div>
      <button
        onClick={
          () => {
            setUserInfo({ FullName, PassWord, Email });
            console.log(UserInfo);
            setEmail("");
            setFullName("");
            setPassWord("");
            console.log(UserInfo);
          } // handleSubmit()  // setUserInfo({FullName,PassWord,Email})  // console.log(UserInfo)  // setFullName("")  // setPassWord("")  // setEmail("");
        }
        type="submit"
        className="ButtonCreateAccount"
      >
        Create an account
      </button>
      <p className="login-text">
        Already have an account?{" "}
        <a href="#" className="login-link">
          Login
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

export default SignUpPage;
