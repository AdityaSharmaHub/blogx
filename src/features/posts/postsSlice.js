import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    loading: false,
    error: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPostsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure: (state, action) => {
            state.loading = false;      
            state.error = action.payload;
        },
        addPost: (state, action) => {
            state.loading = false;
            state.posts.push(action.payload.post);
        },
        updatePost: (state, action) => {
            state.loading = false;
            state.posts = state.posts.map((post) =>
				post.$id === action.payload.post.$id ? action.payload.post : post
			);
        },
        deletePost: (state, action) => {
            state.loading = false
            state.posts = state.posts.filter((post) => post.$id !== action.payload.postId);
        }
    }
});

export const {
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsFailure,
    addPost,
    updatePost,
    deletePost
} = postsSlice.actions;

export default postsSlice.reducer;