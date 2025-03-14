import React from "react";

const SignUpPage = () => {
    return (
        <div className=" SignUpPage">
        <h1>Name Platform</h1>
        <h2 style={{ color: "black" }}>Create an account</h2>
        <div className="InfoInput">
            <form className="formSignUpPage">
            <label htmlFor="Email Address">Email Address</label>
            <input
                id="Email Address"
                type="email"
                placeholder="Enter your email address"
                className="input"
            />

            <label htmlFor="Full Name">Full Name</label>
            <input
                id="Full Name"
                type="text"
                placeholder="Enter your full name"
                className="input"
            />

            <label htmlFor="Password">Password</label>
            <input
                id="Password"
                type="password"
                placeholder="Create your password"
                className="input"
            />
            </form>
        </div>
        <button type="submit" className="ButtonCreateAccount">Create an account</button>
        <p className="login-text">
            Already have an account?{" "}
            <a href="#" className="login-link">
            Login
            </a>
        </p>
        <div className="social-icons">
            <a className="social" href="#"><i class="fa-brands fa-facebook"></i></a>
            <a className="social" href="#"><i class="fa-brands fa-square-twitter"></i></a>
            <a className="social" href="#"><i class="fa-brands fa-instagram"></i></a>
            <a className="social" href="#"><i class="fa-brands fa-linkedin"></i></a>
        </div>
        </div>
    );
};

export default SignUpPage;
