import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/user/store';
import { setUsername, setPassword, resetForm } from '../../store/user/formSlice';
import { FaUserAstronaut } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SignUp from '../../pages/SignUp';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { username, password } = useSelector((state: RootState) => state.form);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch login action or API call here
    console.log('Logging in...');
    dispatch(resetForm());
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="">
        <div className="w-96 p-6 shadow-lg bg-custom-color1 rounded-md">
        <FaUserAstronaut className='text-5xl font-semibold text-custom-color3 items-center'/>
        <h1 className='text-3xl block text-center font-semibold text-custom-color3 items-center'>Login</h1>
        <hr className='mt-3'/>
        <div className='mt-3'>
          <label className="block text-base mb-2" htmlFor="username">Username</label>
          <input className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-custom-color2" id="username" type="text" placeholder="Enter Username" value={username} onChange={handleUsernameChange} required/>
        </div>
        <div className="">
          <label className="block text-base mb-2" htmlFor="password">Password</label>
          <input className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-custom-color2" id="password" type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange} required/>
        </div>
        <div className='mt-3 flex justify-between items-center'>
          <div>
            <label htmlFor="signUp">Don't have an account? <span className='text-custom-color3 font-semibold'><Link to='/signUp'>Register</Link></span></label>
          </div>
        </div>
        <div className='mt-5'>
          <button className='border-2 border-custom-color3 bg-custom-color3 text-white py-1 w-full hover:bg-transparent hover:text-custom-color3 font-semibold' type='submit'>Login</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
