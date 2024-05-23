import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();

        res.status(200).json(posts);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get posts...!" });
    };
};



export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include:{
                postDetail:true,
                user:{
                    select:{
                        username,
                        avatar
                    }
                }
            }
        });

        res.status(200).json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get post...!" });
    };
};



export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await prisma.post.create({
            data: {
                ...body,
                userId: tokenUserId,
                postDetail :{
                    create:body.postDetail
                }
            }
        });
        res.status(200).json(newPost);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update post...!" });
    };
};



export const updatePost = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete post...!" });
    };
};



export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {

        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (tokenUserId !== post.userId) {
            return res.status(403).json({ message: "Not Authorized...!" })
        };

        await prisma.post.delete({
            where: { id }
        });

        res.status(200).json({ message: "Post deleted successfully..." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update post...!" });
    };
};