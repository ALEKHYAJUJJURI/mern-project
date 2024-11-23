import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };


  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Email is not valid';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(validate())
    if (!validate()) {
      alert("invalid ")
    }
    setLoading(true);

    try {
      const result = await axios.post("http://localhost:5001/api/login", { email, password });
      console.log("result from backend api call ", result)
      localStorage.setItem("accessToken", result.data.accessToken)
      localStorage.setItem("refreshToken", result.data.refreshToken)
      if ( result.data.accessToken && result.data.refreshToken) {
        navigate('/home')
      }
    }
    catch (err) {
      console.error('Login error:', err.response?.data?.error || err.message);
      alert("Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <div className="">
        <h2 className="">Log in to your account</h2>
        <form className="bg-light m-3 p-3" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="form-control">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"

                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={handleChange}
              />
            </div>
            <span className='text-danger'>{errors.email}</span>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"

                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <span className='text-danger'>{errors.password}</span>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-outline-primary"
            >
              Log in
            </button>
            <Link className='btn btn-secondary mx-2' to="/signup">Signup</Link>
          </div>
        </form>
        <span className='text-danger'>{errors.general}</span>
      </div>
    </div>
  );
}

export default Login;