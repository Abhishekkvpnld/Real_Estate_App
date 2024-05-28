import axiosRequest from "./apiRequest";
import { defer } from "react-router-dom";



export const singlePageLoader = async ({ request, params }) => {
    const res = await axiosRequest("/posts/" + params.id);
    return res.data;
};


export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    const postPromise = await axiosRequest("/posts?" + query);
    return defer({
        postResponse: postPromise
    });
};


export const profilePageLoader = async () => {
    const postPromise = await axiosRequest("/users/profilePosts");
    const chatPromise = await axiosRequest("/chats");
    return defer({
        chatResponse: chatPromise,
        postResponse: postPromise
    });
};