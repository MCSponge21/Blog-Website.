import Axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function EditPost() {
    const [post, setPost] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');

    let params = useParams();
    useEffect(() => {
        const getData = async () => {
            const res = await Axios.get(`http://localhost:4000/api/post/${params.id}`);
            setPost(res.data);
            setTitle(res.data.title);
            setAbout(res.data.about);
            setText(res.data.text);
            setUrl(res.data.url);
        }
        getData();
    }, [])

    useEffect(() => {
        const getData = async () => {
            const res = await Axios.get('http://localhost:4000/api/userinfo', { headers: { 'authorization': localStorage.getItem("SavedToken") } });
            setUserInfo(res.data);
        }
        getData();
    }, [])

    const editPost = async (e) => {
        e.preventDefault();
        const res = await Axios({
            method: 'put',
            url: `http://localhost:4000/api/post/${params.id}`,
            data: {title, about, text, url},
            headers: { 'Authorization': localStorage.getItem("SavedToken") }
        });
        window.location = `/post/${params.id}`;
    }

    return (
        <div className='flex items center justify-center h-auto w-screen bg-gray-200 pb-40'>
            <div className='flex flex-col pt-40 w-1/2 gap-10 px-40 pb-20 bg-white'>
                <h1 className='text-2xl'>Edit Blog Post</h1>
                <div>
                    <p className='text-lg'>Title</p>
                    <div contentEditable='plaintext-only' id='title' className='text-2xl w-full border-2'
                    onInput={(e) => {setTitle(e.currentTarget.textContent)}}>{post.title}</div>
                </div>
                <div>
                    <p className='text-lg'>About</p>
                    <div contentEditable='plaintext-only' className='text-lg w-full border-2'
                     onInput={e =>  setAbout(e.currentTarget.textContent)}>{post.about}</div>
                </div>
                <div>
                    <p className='text-lg'>Text</p>
                    <div contentEditable='plaintext-only' className='text-med w-full border-2'
                     onInput={(e) => {setText(e.currentTarget.textContent)}}>{post.text}</div>
                </div>
                <div>
                    <p className='text-lg'>Image Url</p>
                    <div contentEditable='plaintext-only' className='text-med w-full border-2'
                     onInput={(e) => {setUrl(e.currentTarget.textContent)}}>{post.url}</div>
                </div>
                <div>
                    <p className='text-lg'>Image Preview</p>
                    <img src={url} alt="" />
                </div>
                <button onClick={editPost} className='hover:text-cyan-500'>Submit Changes</button>
            </div>
        </div>
    )
}