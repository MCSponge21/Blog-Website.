import Axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        if(username == ''){setErrors((errors) => [...errors, 'Username is required'])}
        if(password == ''){setErrors((errors) => [...errors, 'Password is required'])}
        console.log(errors);

        Axios.post('http://localhost:4000/api/login', { username, password })
            .then((res) => {
                if (res.data == 'unauthorized') {
                    if(username && password){setErrors((errors) => [...errors, 'Account not found'])}
                } else {
                    let token = res.data.accessToken;
                    localStorage.setItem("SavedToken", 'Bearer ' + token);
                    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    window.location = "/"
                }
            })
            .catch((e) => { console.log(e) })
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-gray-100 text-black">
            <div className="bg-white w-1/4 shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Log in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label for="email" className="block text-sm font-medium mb-2">Username</label>
                        <input type="text" id="email" onChange={(e) => { setUsername(e.target.value) }} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" ></input>
                    </div>
                    <div className="mb-4">
                        <label for="password" className="block text-sm font-medium mb-2">Password</label>
                        <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" ></input>
                    </div>
                    <div>
                        {errors ? errors.map((error) => {
                            return(
                                <div className='pb-2'>
                                    <p className='text-red-600 text-sm'>{error}</p>
                                </div>
                            )
                        }): null}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <p href="#"
                            className="text-xs  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Don't have an account?
                            <a href="/signup" className='hover:text-cyan-500'> Create Account.</a></p>
                    </div>
                    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                </form>
            </div>
        </div>)
}