import Axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ViewPost() {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    let params = useParams();
    useEffect(() => {
        const getData = async () => {
            const res = await Axios.get(`http://localhost:4000/api/post/${params.id}`);
            setPost(res.data);
        }
        getData();
    }, [])

    useEffect(() => {
        const getData = async () => {
            const res = await Axios.get(`http://localhost:4000/api/comments/${params.id}`);
            setComments(res.data);
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

    const deletePost = async (e) => {
        e.preventDefault();
        const res = await Axios({ method: 'delete', url: `http://localhost:4000/api/post/${params.id}`, headers: { 'Authorization': localStorage.getItem("SavedToken") } });
        window.location = '/';
    }

    const deleteComment = async (id) => {
        const res = await Axios({ method: 'delete', url: `http://localhost:4000/api/comments/${id}`, headers: { 'Authorization': localStorage.getItem("SavedToken") } });
    }

    const publishPost = async (e) => {
        e.preventDefault();
        const res = await Axios({ method: 'post', url: `http://localhost:4000/api/publish/${params.id}`, headers: { 'Authorization': localStorage.getItem("SavedToken") } });
        window.location = '/';
    }

    const unpublishPost = async (e) => {
        e.preventDefault();
        const res = await Axios({ method: 'post', url: `http://localhost:4000/api/unpublish/${params.id}`, headers: { 'Authorization': localStorage.getItem("SavedToken") } });
        window.location = '/';
    }

    return (
        <div className='flex min-h-screen justify-center bg-gray-100 pb-20'>
            <div className='flex flex-col w-1/2 mt-20 gap-10 bg-white h-full pb-20 pt-20 px-10 overflow-hidden'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-3xl font-semibold'>{post.title}</h1>
                    </div>
                    <div className='flex justify-center items-center'>
                        {post.published == false && userInfo.id == post.userId ? <form className='text-xl hover:text-cyan-600' onSubmit={publishPost}><button>Publish</button></form> : null}
                        {post.published == true && userInfo.id == post.userId ? <form className='text-xl hover:text-cyan-600' onSubmit={unpublishPost}><button>Unpublish</button></form> : null}
                        {post.published == false && userInfo.id == post.userId ? <a href={`/edit/post/${params.id}`} className='hover:outline hover:outline-cyan-600 hover:outline-2'>
                            <input type="image" height='25px' src="https://logowik.com/content/uploads/images/888_edit.jpg" border="0" alt="Submit" />
                        </a> : null}
                        {post.published == false && userInfo.id == post.userId ? <form onSubmit={deletePost} className='hover:outline hover:outline-cyan-600 hover:outline-2'>
                            <input type="image" height='25px' src="https://www.pngfind.com/pngs/m/47-471196_icon-trash-png-font-awesome-trash-o-transparent.png" border="0" alt="Submit" />
                        </form> : null}
                    </div>
                </div>
                {post.published == false ? <p className='italic'>Last edited {post.createdAt}</p> : <p className='italic'>Published on {post.createdAt} by {post.username}</p>}
                <img src={post.url} className='' />
                <p className='indent-20 whitespace-pre-wrap' >{post.text}</p>
                {post.published == true ? <div className='flex flex-col'>
                    <h3 className='text-lg'>Comments</h3>
                    {comments[0] == null ? <div className='flex justify-center text-gray-500 italic mt-10 '>No comments to display</div> : null}
                    {comments.map((comment) => {
                        return (
                            <div className='p-5 flex items-center justify-between'>
                                <div>
                                    <div className='font-semibold'> {comment.username}</div>
                                    <div> {comment.text}</div>
                                </div>
                                <div>
                                        <input onClick={() => deleteComment(comment.id)} type="image" height='20px' src="https://www.pngfind.com/pngs/m/47-471196_icon-trash-png-font-awesome-trash-o-transparent.png" border="0" alt="Submit" />
                                </div>
                            </div>
                        )
                    })}
                </div> : null}
            </div>
        </div>
    )
}