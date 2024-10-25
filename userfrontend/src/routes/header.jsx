import Axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';


export default function Header() {
    const [userInfo, setUserInfo] = useState([]);

    const handleEvent = (e) => {
        window.location = "/post/create";
    }

    const handleLogin = (e) => {
        window.location = "/login";
    }

    const handleLogout = (e) => {
        localStorage.setItem('SavedToken', null);
        window.location = "/login";
    }

    useEffect(() => {
        const getData = async () => {
            if (localStorage.getItem("SavedToken") !== null) {
                const res = await Axios.get('https://server-production-9d6d.up.railway.app/api/userinfo', { headers: { 'Authorization': localStorage.getItem("SavedToken") } });
                setUserInfo(res.data);
            }
        }
        getData();
    }, [])

    useEffect(() => { console.log(userInfo) });

    return (
        <div className="flex flex-row h-20 w-full justify-between items-center px-20 border-2 fixed top-0 left-0 text-lg font-semibold bg-white">
            {userInfo.username ? <div>
                <a href="/" className='relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-cyan-500 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-cyan-500 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'><h2>Blog Website.</h2></a>
            </div> :
                <div>
                    <a href="/" className='relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-cyan-500 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-cyan-500 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'><h2>Blog Website.</h2></a>
                </div>
            }
            <div className='flex gap-5'>
                <div>
                    {userInfo.username ? <button className='relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-cyan-500 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-cyan-500 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]' onClick={handleLogout}>Log out</button> : <button className='hButton' onClick={handleLogin}>Log in</button>}
                </div>
            </div>
        </div>
    )
}