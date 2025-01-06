import React, { useState, useEffect } from "react";
import { getPosts } from "../services/appwrite/postServices";
import { Container, PostCard } from "../components";
import { fetchPostsStart, fetchPostsFailure, fetchPostsSuccess } from "../features/posts/postsSlice"
import { useDispatch } from "react-redux";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [postsFromState, setPostsFromState] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsStart())
    setLoading(true);
    getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          dispatch(fetchPostsSuccess(posts.documents))
          setPostsFromState(posts.documents)
        }
        setLoading(false);
      })
      .catch((error) => (setLoading(false), console.error(error), dispatch(fetchPostsFailure(error))));
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="py-40 text-center">
          <h1 className="text-2xl font-medium">
            <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading posts...
            </div>
          </h1>
        </div>
      </Container>
    );
  }

  if (postsFromState) {
    return (
      <div className="w-full py-8">
        <Container>
        <h1 className='font-semibold text-3xl md:text-4xl mb-6 text-center'>All Posts</h1>
          <div className="flex flex-wrap">
            {postsFromState.map((post) => (
              <div key={post.$id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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
          <h1 className="text-2xl font-medium">No posts found</h1>
        </div>
      </Container>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
      <h1 className='font-semibold text-3xl md:text-4xl mb-6 text-center'>All Posts</h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
