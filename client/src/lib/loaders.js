import axiosRequest from "./apiRequest";
import { defer } from "react-router-dom";



export const singlePageLoader = async ({ request, params }) => {
    const res = await axiosRequest("/posts/" + params.id);
    return res.data;
};


export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    const postPromise = axiosRequest("/posts?" + query);
    return defer({
        postResponse: postPromise
    });
};



export const profilePageLoader = async () => {
    const postPromise = axiosRequest("/users/profilePosts");
    const chatPromise = axiosRequest("/chats");
    console.log("chatresponse",chatPromise);
    return defer({
        chatResponse: chatPromise,
        postResponse: postPromise
    });
};