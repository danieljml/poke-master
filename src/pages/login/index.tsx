import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/monoma-logo.png';
import { findUser } from '../../utils';
import Swal from 'sweetalert2'

interface User {
  id: number;
  email: string;
  password: string;
}

interface LoginProps {
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.backgroundColor = '#D6E4E5';
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [email, password] = [
      formData.get('email') as string,
      formData.get('password') as string,
    ];
    const userExist = findUser(email, password);
    if (userExist) {
      const {id, email} = userExist
      setUser(userExist);
      localStorage.setItem('user', JSON.stringify({id, email}));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1500
      })
      return navigate('/');
    }
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'This user has an error',
      showConfirmButton: false,
      timer: 1500
    })
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 bg-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
