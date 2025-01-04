import { id, databases, query, storage } from "./appwriteClient"

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID

// Databases operations

export const createPost = async ({title, slug, content, featuredImage, status, userId, username}) => {
    try {
        return await databases.createDocument(
            databaseId,
            collectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
                username
            }
        )
    } catch (error) {
        console.error("Appwrite Service Error :: createPost :: error", error)
        throw error;
    }
}

export const getPosts = async () => {
    try {
        return await databases.listDocuments(
            databaseId,
            collectionId,
            [
                query.equal("status", "active")
            ]
        )
    } catch (error) {
        console.error("Appwrite Service Error :: getPosts :: error", error)
        throw error;
    }
}

export const getPost = async (slug) => {
    try {
        return await databases.getDocument(
            databaseId,
            collectionId,
            slug
        )
    } catch (error) {
        console.error("Appwrite Service Error :: getPost :: error", error)
        throw error;
    }
}

export const updatePost = async (slug, {title, content, featuredImage, status}) => {
    try {
        return await databases.updateDocument(
            databaseId,
            collectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
        )
    } catch (error) {
        console.error("Appwrite Service Error :: updatePost :: error", error)
        throw error;
    }
}

export const deletePost = async (slug) => {
    try {
        await databases.deleteDocument(
            databaseId,
            collectionId,
            slug
        )
    } catch (error) {
        console.error("Appwrite Service Error :: deletePost :: error", error)
        throw error;
    }
}

// File storage operations

export const uploadFile = async (file) => {
    try {
        return await storage.createFile(
            bucketId,
            id.unique(),
            file
        )
    } catch (error) {
        console.error("Appwrite Service Error :: uploadFile :: error", error)
        throw error;
    }
}

export const deleteFile = async (fileId) => {
    try {
        await storage.deleteFile(
            bucketId,
            fileId
        )
    } catch (error) {
        console.error("Appwrite Service Error :: deleteFile :: error", error)
        throw error;
    }
}

export function getFilePreview (fileId) {
    return storage.getFilePreview(
        bucketId,
        fileId
    )
}