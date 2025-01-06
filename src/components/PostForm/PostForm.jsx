import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import {
  createPost,
  uploadFile,
  deleteFile,
  updatePost,
  getFilePreview,
} from "../../services/appwrite/postServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost as addPostState } from "../../features/posts/postsSlice";
import { toast } from "sonner";

export default function PostForm({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isCreating, setIsCreating] = useState(false);
    const userData = useSelector((state) => state.auth.userData);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
        },
    });

    const submit = async (data) => {
        setIsCreating(true);
        toast("Started uploading. Please wait...");

        try {
            let file;

            if (data.image[0]) {
                file = await uploadFile(data.image[0]);
                if (file) {
                    if (post?.featuredImage) {
                        await deleteFile(post.featuredImage);
                    }
                }
            }

            const updatedPostData = {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
                userId: userData.$id,
                username: userData.name,
            }

            if (post) {
                toast("Updating...")
                
                try {
                    const dbPost = await updatePost(post.$id, updatedPostData);
    
                    if (dbPost) {
                        toast.success("Post updated successfully!");
                        navigate(`/post/${dbPost.$id}`);
                    }
                } catch (error) {
                    console.log("Error in updating posts :: ", error)
                }
                
            } 
            else 
            {
                if (!file) {
                    toast.error("Image is required for a new post.");
                    setIsCreating(false);
                    return;
                }

                const dbPost = await createPost(updatedPostData);

                if (dbPost) {
                    toast.success("Post created successfully!");
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
            toast.error("An error occurred while submitting the post.");
        } finally {
            setIsCreating(false)
        }
  };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    useEffect(() => {
        if (post) {
        setValue("title", post.title);
        setValue("content", post.content);
        setValue("slug", slugTransform(getValues("title")));
        setValue("status", post.status);
        }
    }, [post, setValue]);

    return (
        <>
            <h1 className="text-3xl font-bold mb-10 text-center">Add Post</h1>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-10 lg:gap-0">
                <div className="w-full lg:w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                        />
                    {errors.title && (
                        <p className="text-red-400 text-sm pl-1 bg-red-500/10 px-3 py-1.5 rounded-lg inline-block">
                            Title is required
                        </p>
                    )}
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), {
                                shouldValidate: true,
                            });
                        }}
                        />
                    {errors.slug && (
                        <p className="text-red-400 text-sm pl-1 bg-red-500/10 px-3 py-1.5 rounded-lg inline-block">
                            Slug is required
                        </p>
                    )}
                    <RTE
                        label="Content :"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                        />
                </div>
                <div className="w-full lg:w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                        />
                    {errors.image && (
                        <p className="text-red-400 text-sm pl-1 mt-1 bg-red-500/10 px-3 py-1.5 rounded-lg inline-block">
                            Image is required
                        </p>
                    )}

                    {post && (
                        <div className="w-full mb-4">
                            {post?.featuredImage && 
                                <img
                                src={getFilePreview(post.featuredImage)}
                                alt={post.title || "null"}
                                className="rounded-lg"
                                />
                            }
                        </div>
                    )}

                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                        />
                    <Button
                        type="submit"
                        textColor="text-white"
                        bgColor={post ? "bg-green-700" : undefined}
                        className={`w-full ${post ? "bg-green-700" : undefined}`}
                        >
                    {isCreating ? "Posting..." : post ? "Update" : "Create Post"}
                    </Button>
                </div>
            </form>
        </>
    );
}
