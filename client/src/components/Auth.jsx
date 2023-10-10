import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';
import spinningGear from '../assets/spinning_gear.gif';
import './Signin-up.css';

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form;

    const URL = 'http://localhost:5000/auth';

    try {
      const response = await axios.post(`${URL}/signup`, {
        username,
        password,
        fullName: form.fullName,
        phoneNumber,
        avatarURL,
      });

      const { token, userId, hashedPassword, fullName } = response.data;

      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = form;

    const URL = 'http://localhost:5000/auth';

    try {
      const response = await axios.post(`${URL}/login`, {
        username,
        password,
      });

      const { token, userId, fullName } = response.data;

      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const switchMode = () => {
    setTimeout(() => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
    }, 2000); // Adjust the delay time (in milliseconds) as needed.

    console.log(isSignup);

    const wrapper = document.querySelector('.wrapper');
    if (isSignup) {
      wrapper.classList.remove('active');
    } else {
      wrapper.classList.add('active');
    }
  };

  return (
    <div className="auth__form-container">
      <div className="wrapper">
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>

        <div className="form-box login">
          <h2 className="animation" style={{ '--i': 0, '--j': 21 }}>
            Login
          </h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="username">Username</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button
              type="submit"
              className="btn animation"
              style={{ '--i': 3, '--j': 24 }}
            >
              Login
            </button>
            <div className="logreg-link animation" style={{ '--i': 4, '--j': 25 }}>
              <p onClick={switchMode}>
                Don't have an account?{' '}
                <a href="#" className="register-link">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="info-text login">
          <h1 className="animation" style={{ '--i': 0, '--j': 20 }}>
            WELCOME BACK!
          </h1>
          <p className="animation" style={{ '--i': 1, '--j': 21 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>

        {isSignup && (
          <div className="form-box register animation">
            <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>
              <br />
              <br />
              <br />
              <br />
              Sign Up
            </h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
                <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
                <label htmlFor="fullName">Full Name</label>
                <i className="bx bxs-user"></i>
              </div>
              <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
                <input type="text" name="username" value={form.username} onChange={handleChange} required />
                <label htmlFor="username">Username</label>
                <i className="bx bxs-user"></i>
              </div>
              <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
                <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
                <label htmlFor="phoneNumber">Phone No.</label>
                <i className="bx bxs-phone-call"></i>
              </div>
              <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
                <input type="text" name="avatarURL" value={form.avatarURL} onChange={handleChange} required />
                <label htmlFor="avatarURL">Avatar URL</label>
                <i className="bx bxs-image"></i>
              </div>
              <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
                <input type="password" name="password" value={form.password} onChange={handleChange} required />
                <label htmlFor="password">Password</label>
                <i className="bx bxs-lock-alt"></i>
              </div>
              <div className="input-box animation" style={{ '--i': 21, '--j': 4 }}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <i className="bx bxs-lock-alt"></i>
              </div>
              <button
                type="submit"
                className="btn animation"
                style={{ '--i': 21, '--j': 4 }}
              >
                Sign Up
              </button>
              <div className="logreg-link animation" style={{ '--i': 22, '--j': 5 }}>
                <p onClick={switchMode}>
                  Already have an account? <a href="#" className="login-link">Login</a>
                </p>
              </div>
            </form>
          </div>
        )}
        <div className="info-text register">
          <h1 className="animation" style={{ '--i': 17, '--j': 0 }}>
            Welcome to Gear!
          </h1>
          <img
            src={spinningGear}
            className="gear-spinning animation"
            style={{ '--i': 17, '--j': 0 }}
            width="50"
            height="50"
            alt="sign in"
          />
          <p className="animation" style={{ '--i': 18, '--j': 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
