import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { BASE_URL } from "../utils/constants";
import type { CreatePostType } from "../utils/types";

export const getPosts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${apiRoutes.posts}`);
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        return error;
    }
}

export const createPost = async (post: CreatePostType) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.posts}`, post);
        return response.data;
    } catch (error) {
        console.error('Create post failed:', error);
        return error;
    }
}

export const deletePost = async (id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}${apiRoutes.posts}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Delete post failed:', error);
        return error;
    }
}