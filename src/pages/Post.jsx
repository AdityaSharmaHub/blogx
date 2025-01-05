import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getPost,
  deletePost,
  deleteFile,
  getFilePreview,
} from "../services/appwrite/postServices";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function Post() {
  const [post, setPost] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
        else navigate("/");
      });
    } else navigate("/");
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
      <Container>
        <div className="w-full max-w-4xl flex justify-center mb-4 relative border border-slate-700 shadow-2xl shadow-slate-900 rounded-xl p-2">
          <img
            src={getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="mr-3 hover:scale-105 hover:bg-green-600 transition-all duration-200 ease-linear"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                className="hover:scale-105 hover:bg-red-600 transition-all duration-200 ease-linear"
                onClick={handleDeletePost}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          )}
        </div>
        <div className="w-full my-10">
          <h1 className="text-2xl md:text-4xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css leading-loose">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
