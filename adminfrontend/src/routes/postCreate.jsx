import Axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';

export default function CreatePost() {
  const [text, setText] = useState();
  const [title, setTitle] = useState();
  const [about, setAbout] = useState();
  const [url, setUrl] = useState();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get('https://server-production-9d6d.up.railway.app/api/userinfo', { headers: { 'Authorization': localStorage.getItem("SavedToken") } });
      setUserInfo(res.data);
    }
    getData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    Axios.post('https://server-production-9d6d.up.railway.app/api/posts', { title, text, about, url },
      { headers: { 'Authorization': localStorage.getItem("SavedToken") } }
    )
      .then((res) => {
        window.location = '/';
      })
      .catch((e) => {
        console.log(e);
      })
  }
  if(!userInfo.username){return <h1>NOT AUTHORIZED</h1>}else{
  return (
    <div className='flex items center justify-center min-h-screen h-auto w-full bg-gray-200 pb-40'>
            <div className='flex flex-col pt-40 w-1/2 gap-10 px-40 pb-20 bg-white'>
                <h1 className='text-2xl'>Create Blog Post</h1>
                <div>
                    <p className='text-lg'>Title</p>
                    <div contentEditable='plaintext-only' id='title' className='text-2xl w-full border-2'
                    onInput={(e) => {setTitle(e.currentTarget.textContent)}}></div>
                </div>
                <div>
                    <p className='text-lg'>About</p>
                    <div contentEditable='plaintext-only' className='text-lg w-full border-2'
                     onInput={e =>  setAbout(e.currentTarget.textContent)}></div>
                </div>
                <div>
                    <p className='text-lg'>Text</p>
                    <div contentEditable='plaintext-only' className='text-med w-full border-2'
                     onInput={(e) => {setText(e.currentTarget.textContent)}}></div>
                </div>
                <div>
                    <p className='text-lg'>Image Url</p>
                    <div contentEditable='plaintext-only' className='text-med w-full border-2 whitespace-pre-wrap'
                     onInput={(e) => {setUrl(e.currentTarget.textContent)}}></div>
                </div>
                <div>
                    <p className='text-lg'>Image Preview</p>
                    <img src={url} alt="" />
                </div>
                <button onClick={handleSubmit} className='hover:text-cyan-500'>Create</button>
            </div>
        </div>
  )}
}