import Axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from './footer';
import Loader from './loader';

export default function ViewPost() {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [comment, setComment] = useState('');
    const [edit, setEdit] = useState('');
    const [emptyComment, setEmptyComment] = useState(false);
    const [emptyEdit, setEmptyEdit] = useState(false);
    const [commentId, setCommentId] = useState('');
    const [img, setImg] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    let params = useParams();
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
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
        setIsLoading(false);
    }, [])

    useEffect(() => {
        if (comment == '') {
            setEmptyComment(true);
        } else {
            setEmptyComment(false);
        }
    }, [comment])

    useEffect(() => {
        if (edit == '') {
            setEmptyEdit(true);
        } else {
            setEmptyEdit(false);
        }
    }, [edit])

    const deletePost = async (e) => {
        e.preventDefault();
        const res = await Axios({ method: 'delete', url: `http://localhost:4000/api/post/${params.id}`, headers: { 'Authorization': localStorage.getItem("SavedToken") } });
        window.location = '/';
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

    const postComment = async (e) => {
        e.preventDefault();
        document.getElementById('commentBox').textContent = '';
        const res = await Axios({ method: 'post', url: `http://localhost:4000/api/comments/${params.id}`, headers: { 'Authorization': localStorage.getItem("SavedToken") }, data: { comment } });
        const getData = async () => {
            const res = await Axios.get(`http://localhost:4000/api/comments/${params.id}`);
            setComments(res.data);
        }
        getData();
        setComment('');
    }

    const clearComment = async (e) => {
        document.getElementById('commentBox').textContent = '';
        setComment('');
    }

    const editComment = async (e) => {
        e.preventDefault();
        const res = await Axios({ method: 'put', url: `http://localhost:4000/api/comments/${commentId}`, headers: { 'Authorization': localStorage.getItem("SavedToken") }, data: { edit } });
        const getData = async () => {
            const res = await Axios.get(`http://localhost:4000/api/comments/${params.id}`);
            setComments(res.data);
        }
        getData();
        setImg(-1);
        setEdit('');
    }

    const deleteComment = async (id) => {
        const res = await Axios({ method: 'delete', url: `http://localhost:4000/api/comments/${id}`, headers: { 'Authorization': localStorage.getItem("SavedToken") } });
        const getData = async () => {
            const res = await Axios.get(`http://localhost:4000/api/comments/${params.id}`);
            setComments(res.data);
        }
        getData();
    }

    return (
        <div className='flex flex-col min-h-screen items-center bg-gray-100'>
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
                    <div className='flex flex-col w-full'>
                        <form onSubmit={postComment}>
                            {userInfo.username ? <div className='flex flex-row w-full justify-between'>
                                <div onInput={e => setComment(e.currentTarget.textContent)} id='commentBox' placeholder='Type comment here...' contentEditable='plaintext-only' className='w-full mt-10 focus:outline-0 focus:border-black border-b-2'></div>
                            </div> : <div className='mt-10'><p className='text-gray-500 text-sm ml-10'>Login to leave a comment.</p></div>}
                            <div className='justify-end flex'>
                                {!emptyComment ?
                                    <div className='flex gap-3'>
                                        <button className='rounded-lg mt-4 hover:bg-gray-400 px-3 py-1 h-fit text-sm text-black hover:text-white' type='button' onClick={clearComment}>Cancel</button>
                                        <button className='rounded-lg mt-4 bg-blue-500 hover:bg-blue-600 px-3 py-1 h-fit text-sm text-white'>Comment</button>
                                    </div>
                                    : null}
                            </div>
                        </form>
                    </div>
                    <div className='flex flex-col mt-10 gap-5'>
                        {comments.map((comment, index) =>
                        (
                            index == img ?
                                <form className='flex flex-col' onSubmit={editComment}>
                                    <div contentEditable='plaintext-only' placeholder='Edit comment here...' onInput={e => setEdit(e.currentTarget.textContent)} className='w-full focus:outline-0 focus:border-black border-b-2'>
                                        {comment.text}
                                    </div>
                                    <div className='flex justify-end gap-3'>
                                        {!emptyEdit ?
                                            <button className='rounded-lg mt-4 bg-blue-500 hover:bg-blue-600 px-3 py-1 h-fit text-sm text-white' >Edit</button>
                                            : null}
                                        <button className='rounded-lg mt-4 hover:bg-gray-400 px-3 py-1 h-fit text-sm text-black hover:text-white' onClick={() => { setImg(-1) }}>Cancel</button>
                                    </div>
                                </form> :
                                <div className='flex w-full justify-between'>
                                    <div className='flex flex-col justify-center'>
                                        <div className='flex gap-2'>
                                            <div className='font-semibold text-sm'>{comment.username}</div>
                                            <p className='text-xs text-gray-500 mt-1'> {comment.createdAt}</p>
                                            {comment.edited ? <p className='text-xs text-gray-500 mt-1'>(Edited)</p> : null}
                                        </div>
                                        <div className='text-sm whitespace-pre-wrap'> {comment.text}</div>
                                    </div>
                                    {userInfo.id == comment.userId ? <div className='flex flex-col'>
                                        <button onClick={() => { setImg(index); setCommentId(comment.id) }} className='hover:text-cyan-600'>
                                            <p className='text-xs'>edit</p>
                                        </button>
                                        <button className='hover:text-cyan-600' onClick={() => deleteComment(comment.id)}>
                                            <p className='text-xs'>delete</p>
                                        </button>
                                    </div> : null}
                                </div>
                        )
                        )}
                    </div>
                </div> : null}
            </div>
            <div className='w-full flex justify-end mt-20'>
                <Footer />
            </div>
        </div>
    )
}