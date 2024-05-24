import axiosRequest from "./apiRequest"



export const singlePageLoader = async ({ request, params }) => {
    const res = await axiosRequest("/posts" + params.id);
    return res.data;
};


export const listPageLoader = async ({ request, params }) => {
   const query = request.url.split("?")[1];
   const res = await axiosRequest("/posts?"+query);
   return res.data;
};