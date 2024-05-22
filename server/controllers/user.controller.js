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

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update user...!" })
    };
};


export const deleteUser = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete user...!" })
    };
};