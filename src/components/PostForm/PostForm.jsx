import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import { createPost, uploadFile, deleteFile, updatePost, getFilePreview } from "../../services/appwrite/postServices"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost as addPostState } from "../../features/posts/postsSlice"
import { toast } from "sonner";

export default function PostForm({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isCreating, setIsCreating] = useState(false);
    const userData = useSelector((state) => state.auth.userData);

    // const submit = async (data) => {
    //     setIsCreating(true);
    //     toast("Started uploading. Please wait...");
    //     if (post) {
    //         const file = data.image[0] ? await uploadFile(data.image[0]) : null;

    //         if (file) {
    //             deleteFile(post.featuredImage);
    //         }

    //         const dbPost = await updatePost(post.$id, {
    //             ...data,
    //             featuredImage: file ? file.$id : undefined,
    //         });

    //         if (dbPost) {
    //             navigate(`/post/${dbPost.$id}`);
    //         }
    //     } else {
    //         const file = await uploadFile(data.image[0]);

    //         if (file) {
    //             const fileId = file.$id;
    //             data.featuredImage = fileId;
    //             const dbPost = await createPost({ ...data, userId: userData.$id, username: userData.name });

    //             if (dbPost) {
    //                 toast.success("Post created successfully!")
    //                 navigate(`/post/${dbPost.$id}`);
    //                 dispatch(addPostState(data))
    //             }
    //         }
    //     }
    //     setIsCreating(false)
    // };

    const submit = async (data) => {
        setIsCreating(true);
        toast("Started uploading. Please wait...");
    
        try {
            let file = null;
            if (data.image && data.image[0]) {
                file = await uploadFile(data.image[0]);
            }
    
            if (post) {
                if (file && post.featuredImage) {
                    await deleteFile(post.featuredImage);
                }
    
                const dbPost = await updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
    
                if (dbPost) {
                    toast.success("Post updated successfully!");
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!file) {
                    toast.error("Image is required for a new post.");
                    setIsCreating(false);
                    return;
                }
    
                const dbPost = await createPost({
                    ...data,
                    userId: userData.$id,
                    username: userData.name,
                    featuredImage: file.$id,
                });
    
                if (dbPost) {
                    toast.success("Post created successfully!");
                    navigate(`/post/${dbPost.$id}`);
                    dispatch(addPostState(dbPost));
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
            toast.error("An error occurred while submitting the post.");
        } finally {
            setIsCreating(false);
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

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {isCreating ? "Creating..." : post ? "Update" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}
