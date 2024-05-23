import axiosRequest from "./apiRequest"



export const singlePageLoader = async ({ request, params }) => {
    const res = await axiosRequest("/posts" + params.id);
    return res.data;
};