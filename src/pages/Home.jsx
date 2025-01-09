import React, { useState, useEffect } from 'react';
import { getPosts } from "../services/appwrite/postServices.js"
import { Container, PostCard } from '../components'
import { fetchPostsStart, fetchPostsFailure, fetchPostsSuccess } from "../features/posts/postsSlice"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import EmblaCarousel from "../components/Carousel/EmblaCarousel.jsx"
import '../components/Carousel/embla.css'

const Home = () => {

    const posts = useSelector((state) => state.posts.posts)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const OPTIONS = { loop: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    
    useEffect(() => {
        setLoading(true);

        async function fetchPosts() {
            try {
                // fetch the posts from state if present
                if (posts.length > 0) {
                    setLoading(false);
                    return;
                }
                
                // if not, get the posts from the server
                dispatch(fetchPostsStart());

                const response = await getPosts();
                if (response) {
                    const fetchedPosts = response.documents;
                    dispatch(fetchPostsSuccess(fetchedPosts));
                    setLoading(false);
                }
            } catch (error) {
                dispatch(fetchPostsFailure(error.message))
                console.error(error)
                toast.error(`Error in fetching posts :: Home.js :: ${error.message}`)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts();
    
    }, [])

    const postImages = posts.map((post) => post.featuredImage);

    return (
        <Container>
            {loading ? (<div className="py-40 text-center">
                    <h1 className='text-2xl font-medium'>
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading posts...
                        </div>
                    </h1>
                </div>) : 
                (
                    <div className='flex flex-col items-center my-6'>
                        <EmblaCarousel slides={posts} options={OPTIONS} />
                        <h1 className='font-semibold text-3xl md:text-4xl mt-10 mb-6'>{posts && posts.length > 0 ? "Featured Posts" : "No Posts Found!"}</h1>
                        <div className='flex w-full flex-wrap'>
                            {posts && posts.length > 0 && posts !== null ? (
                                posts.map((post) => (
                                    <div key={post.$id} className='p-4 w-full sm:w-1/2 md:w-1/3'>
                                        <PostCard {...post} />
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>
                )
            }
        </Container>
    )
}

export default Home