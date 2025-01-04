import React, { useState, useEffect } from "react";
import { getPosts } from "../services/appwrite/postServices";
import { Container, PostCard } from "../components";
import { fetchPostsStart, fetchPostsFailure, fetchPostsSuccess } from "../features/posts/postsSlice"

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false);
      })
      .catch((error) => (setLoading(false), console.error(error)));
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="py-40 text-center">
          <h1 className="text-2xl font-medium">Loading...</h1>
        </div>
      </Container>
    );
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
      <h1 className='font-semibold text-4xl mb-6 text-center'>All Posts</h1>
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
