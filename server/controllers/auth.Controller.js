import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {

    const { username, password, email } = req.body;

    try {
        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        //CREATE NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: "User Created Successfully..." });

    } catch (error) {
        res.status(500).json({ message: "Failed to create user" })
    };

};


export const login = async (req, res) => {
    const { username, password } = req.body;

    try {

        //CHECK THE USER EXISTS
        const user = await prisma.user.findUnique({
            where: { username }
        });
        if (!user) return res.status(401).json({ message: "Invalid Credentials...!" })


        //CHECK THE PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials...!" });


        //GENERATE COOKIE TOKEN AND SEND TO THE USER
        const age = 1000 * 60 * 60 * 24 * 7

        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: true
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const { password: userPassword, ...userInfo } = user;

        res.cookie("token", token, { httpOnlt: true, maxAge: age })
            .status(200)
            .json(userInfo);

    } catch (error) {
        res.status(500).json({ message: "Failed to login...!" })
    }
};


export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successfull..." });
};