import { account, id, query } from "./appwriteClient"

export const createAccount = async ({ name, email, password }) => {
    try {
        const userAccount = await account.create(id.unique(), email, password, name)
        if (userAccount) {
            return await loginUser({ email, password })
        }
        else {
            console.warn("Account creation failed without error")
            return null;
        }
    } catch (error) {
        console.error("Appwrite Service Error :: createAccount :: error", error)
        throw error;
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        return await account.createEmailPasswordSession(email, password)
    } catch (error) {
        console.error("Appwrite Service Error :: loginUser :: error", error)
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        return await account.get()
    } catch (error) {
        console.error("Appwrite Service Error :: getCurrentUser :: error", error)
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        return await account.deleteSessions()
    } catch (error) {
        console.error("Appwrite Service Error :: logoutUser :: error", error)
        throw error;
    }
}