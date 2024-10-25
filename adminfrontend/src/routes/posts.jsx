import Axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get('http://localhost:4000/api/userinfo', { headers: { 'Authorization': localStorage.getItem("SavedToken") } });
      setUserInfo(res.data);
    }
    getData();
  }, [])


  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get('http://localhost:4000/api/userposts', { headers: { 'Authorization': localStorage.getItem("SavedToken") } });
      setPosts(res.data);
    }
    getData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location = 'post/create';
  }

  if(userInfo.username == null || userInfo.role == 'USER'){
    return(
      <div className='flex mt-40 h-full w-full items-center justify-center'>
        <h1>Log in as a blog writer to view this page.</h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col bg-gray-200 w-full min-h-screen h-fit items-center pb-20' >
      <div className='flex flex-col w-1/2 h-full mt-20 pt-10'>
        <div className=''>
          <h1 className='text-lg'>Welcome back, {userInfo.username}. Here are your posts.</h1>
        </div>
        <div className='flex flex-col mt-20 h-auto w-full flex-wrap'>
          <h1>Published Posts</h1>
          <div className='flex flex-row mt-10 h-auto w-full flex-wrap justify-base items-center gap-5'>
            {posts.map((post) => {
              if (post.published) {
                return (<div className='h-96 w-80  bg-white shadow-md hover:outline-cyan-500 hover:outline-2 hover:outline'>
                  <a href={`/post/${post.id}`}><div className='flex flex-row h-1/2 w-full  justify-center'>
                    <img src={post.url} alt="image" className='h-full w-full' />
                  </div>
                    <div className='flex flex-col h-1/2 pt-5 px-5 gap-5'>
                      <h1 className='font-semibold'>{post.title}</h1>
                      <p className='text-sm'>{post.about}</p>
                    </div></a>
                </div>)
              }
            }
            )}

          </div>
        </div>
        <div className='flex flex-col mt-20 h-auto w-full flex-wrap'>
          <h1>Unpublished Posts</h1>
          <div className='flex flex-row mt-10 h-auto w-full flex-wrap justify-base items-center gap-5'>
            {posts.map((post) => {
              if (!post.published) {
                return (<div className='h-96 w-80  bg-white shadow-md hover:outline-cyan-500 hover:outline-2 hover:outline'>

                  <a href={`/post/${post.id}`}><div className='flex flex-row h-1/2 w-full  justify-center'>
                    <img src={post.url} alt="image" className='h-full w-full' />
                  </div>
                    <div className='flex flex-col h-1/2 pt-5 px-5 gap-5'>
                      <h1 className='font-semibold'>{post.title}</h1>
                      <p className='text-sm'>{post.about}</p>
                    </div></a>
                </div>)
              }
            }
            )}
            <a href="/post/create">
              <div className='flex flex-col text-md text-gray-400 items-center justify-center h-40 w-40 ml-20 rounded-full border-gray-300 border-2 hover:outline-cyan-500 hover:outline-2 hover:outline hover:text-cyan-500'>
                <h1 className=''>+</h1>
                <h1 className=''>Create new post</h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}