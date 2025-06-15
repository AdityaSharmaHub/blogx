import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getPost,
  deletePost,
  deleteFile,
  getFileView,
} from "../services/appwrite/postServices";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { deletePost as deletePostState } from "../features/posts/postsSlice"

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    setLoading(true)
    if (slug) {
      getPost(slug).then((post) => {
        if (post) {
          setPost(post.documents[0]);
          setLoading(false)
        }
        else {
          navigate("/");
          setLoading(false)
        } 
      });
    } 
    else {
      navigate("/");
      setLoading(false)
    } 
  }, [slug, navigate]);

  const handleDeletePost = () => {
    setIsDeleting(true);
    toast("Started deleting post...");
    deletePost(post.$id)
      .then((status) => {
        if (status) {
          deleteFile(post.featuredImage)
            .then((res) => {
              if (res) {
                setIsDeleting(false),
                dispatch(deletePostState({postId: post.$id}))
                toast.success("Post deleted successfully!"),
                navigate("/");
              }
            })
            .catch(
              (error) => (
                setIsDeleting(false),
                toast.error("Error deleting image file"),
                console.error("Error deleting image file: ", error)
              )
            );
        }
      })
      .catch(
        (error) => (
          setIsDeleting(false),
          toast.error("Failed to delete post"),
          console.error(error)
        )
      );
  };

  return post ? (
    <div className="py-8">
      {loading ? <h1 className="text-2xl font-semibold">Loading post...</h1> : (
        <Container>
        <Link to="/" className="md:hidden mb-6 bg-slate-900 rounded-xl py-2 px-3 text-xs text-slate-300 inline-flex">Back to home</Link>
        <div className="w-full max-w-4xl mx-auto flex justify-center mb-4 relative border border-slate-700 shadow-2xl shadow-slate-800 rounded-xl p-3">
          <img
            src={getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-lg"
            />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.slug}`}>
                <Button
                  bgColor="bg-green-500"
                  className="hover:scale-95 hover:bg-green-700 mr-3 transition-all duration-200 ease-linear"
                  >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                className="hover:scale-95 hover:bg-red-600 transition-all duration-200 ease-linear"
                onClick={handleDeletePost}
                >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          )}
        </div>
        <div className="my-10 w-full max-w-4xl mx-auto border-b border-b-slate-800 pb-6">
          <h1 className="text-2xl md:text-4xl font-bold">{post.title}</h1>
        </div>
        <div className="w-full max-w-4xl mx-auto text-base md:text-lg text-slate-200">{parse(post.content)}</div>
        <div className="pt-6 mt-10 flex items-center gap-2 border-t border-t-slate-800">
          <i className="fa fa-user h-8 w-8 flex items-center justify-center text-slate-300 bg-slate-800 p-2 rounded-full"></i>
          <p className="text-base font-medium text-slate-300">{post.username}</p>
        </div>
      </Container>
      )}
    </div>
  ) : null;
}
