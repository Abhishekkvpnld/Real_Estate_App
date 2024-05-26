import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";


export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get users...!" });
    };
};


export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        req.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ messgae: "Failed to get user...!" });
    };
};


export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;

    if (tokenUserId !== id) {
        return res.status(403).json({ message: "Not Authorized...!" });
    };

    const updatedPassword = null;
    try {

        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar })
            }
        })
        const { password: userPassword, ...rest } = updatedUser;
        res.status(200).json(rest);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update user...!" })
    };
};


export const deleteUser = async (req, res) => {

    const id = req.params.id;
    const tokenUserId = req.userId;

    if (tokenUserId !== id) {
        return res.status(403).json({ message: "Not Authorized...!" });
    };

    try {

        await prisma.user.delete({
            where: { id }
        });
        res.status(200).json({ message: "User deleted successfully..." })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete user...!" })
    };
};


export const savePost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        const savedPost = await prisma.savedpost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId
                }
            }
        });

        if (savePost) {
            await prisma.savedpost.delete({
                where: {
                    id: savedPost.id
                }
            });
            res.status(200).json({ message: "Post removed from saved list..." });
        } else {

            await prisma.savedpost.create({
                data: {
                    userId: tokenUserId,
                    postId
                }
            });
            res.status(200).json({ message: "Post saved successfully..." })
        };

    } catch (error) {
        console.log(error);
        res.status(500).json({ messagea: "Failed to save post...!" })
    }
};


export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId;

    try {

        const userPosts = await prisma.post.findMany({
            where: { userId: tokenUserId }
        });

        const saved = await prisma.savedpost.findMany({
            where: { userId: tokenUserId },
            include: {
                post: true
            }
        });

        const savedPost = saved.map((item) => item.post);

        res.status(200).json({ userPosts, savedPost });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get profile posts...!" })
    }
};


export const getNotificationNumber = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const number = await prisma.chat.count({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                },
                NOT: {
                    seenBy: {
                        hasSome: [tokenUserId]
                    }
                }
            }
        });

    } catch (error) {
        console.log(error);
    };
};