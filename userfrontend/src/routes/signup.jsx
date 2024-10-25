import Axios from 'axios';
import { useState } from 'react';
import React from 'react';
import { useRef } from 'react';
import Footer from './footer';

export default function SignUpPage() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [cpassword, setCPassword] = useState();
    const [errors, setErrors] = useState([]);
    let errnum = useRef(0);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        errnum.current = 0;

        if (!username) {
            setErrors((errors) => [...errors, 'Username is required']);
            errnum.current = errnum.current + 1;
        } else if (username.length == 1) {
            setErrors((errors) => [...errors, 'Username must be more than one character']);
            errnum.current = errnum.current + 1;
        } else if (username.length >= 30) {
            setErrors((errors) => [...errors, 'Username must be less than thirty characters']);
            errnum.current = errnum.current + 1;
        };

        if (!password) {
            setErrors((errors) => [...errors, 'Password is required'])
            errnum.current = errnum.current + 1;
        } else if (password.length < 10) {
            setErrors((errors) => [...errors, 'Password must be more than ten characters']);
            errnum.current = errnum.current + 1;
        };

        if (password != cpassword) {
            setErrors((errors) => [...errors, 'Confirm password must match your password']);
            errnum.current = errnum.current + 1;
        };

        console.log(errnum);

        if (errnum.current == 0) {
            Axios.post('https://server-production-9d6d.up.railway.app/api/signup', { username, password })
            .then((res) => {
                console.log(res.data)
            })
            .catch((e) => { console.log(e) })
            window.location = '/login';
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full bg-gray-100 text-black">
            <div className="bg-white w-1/4 shadow-md rounded-lg mt-auto px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label for="email" className="block text-sm font-medium mb-2">Username</label>
                        <input type="text" id="email" onChange={(e) => { setUsername(e.target.value) }} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Captain Man" ></input>
                    </div>
                    <div className="mb-4">
                        <label for="password" className="block text-sm font-medium mb-2">Password</label>
                        <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" ></input>
                    </div>
                    <div className="mb-4">
                        <label for="password" className="block text-sm font-medium mb-2">Confirm Password</label>
                        <input type="password" id="password" onChange={(e) => { setCPassword(e.target.value) }} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Confirm your password" ></input>
                    </div>
                    <div>
                        {errors ? errors.map((error) => {
                            return (
                                <div className='pb-2'>
                                    <p className='text-red-600 text-sm'>{error}</p>
                                </div>
                            )
                        }) : null}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <p href="#"
                            className="text-xs  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Already have an account?
                            <a href="/login" className='hover:text-cyan-500'> Log in.</a></p>
                    </div>
                    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}