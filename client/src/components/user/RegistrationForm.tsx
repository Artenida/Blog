import { FaUserAstronaut } from "react-icons/fa";
import { Link } from 'react-router-dom';


const RegistrationForm = () => {

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="x-96">
        <div className="p-6 shadow-lg bg-custom-color1 rounded-md">

        <div className="flex justify-center">
            <FaUserAstronaut className='text-5xl font-semibold text-custom-color3 items-center'/>
        </div>
        <h1 className='text-3xl block text-center font-semibold text-custom-color3 items-center mt-3'>Become part of our world</h1>
        <hr className='mt-3'/>

        <div className='mt-3'>
          
        </div>

        <div className='mt-3'>
          <label className="block text-base mb-2" htmlFor="username">Name</label>
          <input className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0
                             focus:border-custom-color2" id="username" type="text" placeholder="Enter Name" required/>
        </div>

        <div className='mt-3'>
            <label className="block text-base mb-2" htmlFor="username">Username</label>
            <input className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0
                             focus:border-custom-color2" id="username" type="text" placeholder="Enter Username" required/>
        </div>

        <div className='mt-3'>
          <label className="text-base mb-2" htmlFor="username">Bio<input className="border w-full text-base px-2 py-1 
          focus:outline-none focus:ring-0 
          focus:border-custom-color2" id="username" type="text" placeholder="Enter Bio"/></label>
        </div>

        <div className="mt-3">
          <label className="block text-base mb-2" htmlFor="password">Password</label>
          <input className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 
          focus:border-custom-color2" id="password" type="password" placeholder="Enter Password" required/>
        </div>

        <div className="mt-3">
          <label className="block text-base mb-2" htmlFor="password">Confirm Password</label>
          <input className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 
          focus:border-custom-color2" id="password" type="password" placeholder="Confirm Password" required/>
        </div>

        <div className='mt-3 flex justify-between items-center'>
          <div>
            <label htmlFor="signUp">Already part of us? <span className='text-custom-color3 font-semibold'><Link to='/signIn'>Login</Link></span></label>
          </div>
        </div>

        <div className='mt-5'>
          <button className='border-2 border-custom-color3 bg-custom-color3 text-custom-color1 py-1 
          w-full hover:bg-transparent hover:text-custom-color3 font-semibold' type='submit'>Register</button>
        </div>

        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
