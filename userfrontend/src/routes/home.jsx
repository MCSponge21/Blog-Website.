import Axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import Footer from './footer';
import Loader from './loader';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsDataLoading(true);
            const res = await Axios.get('http://localhost:4000/api/publishedposts', { headers: { 'Authorization': localStorage.getItem("SavedToken") } });
            setPosts(res.data);
            setIsDataLoading(false);
        }
        getData();
    }, [])

    useEffect(() => {
        const getData = async () => {
            const res = await Axios.get('http://localhost:4000/api/latestpost', { headers: { 'Authorization': localStorage.getItem("SavedToken") } });
            setLatestPosts(res.data);
        }
        getData();
    }, [])

    return (
        <div className='flex flex-col h-screen'>
            <div className=' bg-blurry bg-cover bg-fixed mt-20 flex h-1/2 w-full px-80 justify-between'>
                <div className='flex flex-col w-1/2 h-full justify-center gap-5 px-20 text-white' >
                    <h1 className='text-4xl font-semibold '>Welcome to my Blog Website.</h1>
                    <p className='text-md'>This is the viewer portion of my blog project. I like to write about
                        things going on the rap scene as it is very fascinating to me. Feel free
                        to make a writer account and post about whatever you want though. Also,
                        look at this cool drawing that I made a couple years ago.
                    </p>
                </div>
                <div className='w-1/2 h-full flex justify-end bg-transparent'>
                    <img src="/cool guy.jpg" alt="drawing" className=' flex' />
                </div>
            </div>
            <div className='flex flex-col px-60 mt-20 text-gray-700 bg-gray-100 pb-40'>
                <h1 className='text-3xl font-semibold mt-10'>Articles: Explore the posts of Blog Website.</h1>
                <p className='mt-4'>Browse through our collection of fun to read and well written articles.</p>

                <div className='flex'>
                    {isDataLoading ? <Loader/> :<div className='flex flex-col px-20 w-3/4 pt-5 mt-10 gap-10 bg-white'>
                        {posts.map((post) => {
                            return (
                                <div className='flex gap-20 h-1/2 pb-10 border-b-2 bg-white'>
                                    <div className='flex w-1/2 h-full'>
                                        <a href={`/post/${post.id}`}><img src={post.url} className='h-full' /></a>
                                    </div>
                                    <div className='flex flex-col gap-10 w-1/2'>
                                        <a href={`/post/${post.id}`}><h1 className='text-3xl font-semibold hover:underline'>{post.title}</h1></a>
                                        <p className='text-gray-700'>{post.about}</p>
                                        <p className='text-gray-700 text-sm'>by {post.username}</p>
                                        <p className='text-xs'>{post.createdAt}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                    <div className='flex-col w-1/4 gap-28'>
                        {latestPosts[0] && !isDataLoading ? <div className='pt-5 pr-10 bg-white ml-10 h-fit pb-10  flex flex-col text-gray-600 gap-4 border-l-2 pl-10'>
                            <h1 className='text-2xl font-semibold'>Latest Post</h1>
                            <a href={`/post/${latestPosts[0].id}`}><img src={latestPosts[0].url} alt="" className='mt-10' /></a>
                            <a href={`/post/${latestPosts[0].id}`}><h1 className='mt-5 text-lg font-semibold hover:underline'>{latestPosts[0].title}</h1></a>
                            <p className='text-sm'>by {latestPosts[0].username} on {latestPosts[0].createdAt}</p>
                            <p>{latestPosts[0].about}</p>
                        </div> : null}

                    </div>
                </div>
            </div>
            <div className='h-96 flex'>

            </div>
            <Footer />
        </div>
    )
}