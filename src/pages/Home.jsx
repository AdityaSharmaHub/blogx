import React, { useState, useEffect } from 'react';
import { getPosts } from "../services/appwrite/postServices.js"
import { Container, PostCard } from '../components'
import { fetchPostsStart, fetchPostsFailure, fetchPostsSuccess } from "../features/posts/postsSlice"
import { useDispatch } from 'react-redux';
import { login } from "../features/auth/authSlice.js"
import { getCurrentUser } from "../services/appwrite/authServices.js"

const Home = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [postsFromState, setPostsFromState] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
      getCurrentUser()
      .then((user) => {
        if (user) {
            dispatch(login(user))
        }
      })
      .catch((error) => (
        console.log(error)
      ))
    }, [])
    

    useEffect(() => {
        dispatch(fetchPostsStart());
        setLoading(true);
        getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                dispatch(fetchPostsSuccess(posts))
                setPostsFromState(posts.documents)
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            dispatch(fetchPostsFailure(err))
            console.error(err)
        })
    }, [])

    if (loading) {
        return (
            <Container>
                <div className="py-40 text-center">
                    <h1 className='text-2xl font-medium'>Loading posts...</h1>
                </div>
            </Container>
        )
    }

    if (postsFromState) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <h1 className='font-semibold text-4xl mb-6 text-center'>Featured Posts</h1>
                    <div className='flex flex-wrap'>
                        {postsFromState.map((post) => (
                            <div key={post.$id} className='p-4 w-full sm:w-1/2 md:w-1/3'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
    </div>
        )
    }

    if (posts.length === 0) {
        return (
            <Container>
                <div className="py-40 text-center">
                    <h1 className='text-2xl font-medium'>No posts found</h1>
                </div>
            </Container>
        )
    } 
    

  return (
    <div className='w-full py-8'>
        <Container>
            <h1 className='font-semibold text-4xl mb-6 text-center'>Featured Posts</h1>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-4 w-full sm:w-1/2 md:w-1/3'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home