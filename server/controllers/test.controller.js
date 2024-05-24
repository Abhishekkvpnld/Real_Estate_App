import jwt from "jsonwebtoken";


export const shouldBeLoggedIn = async (req, res) => {

    const token = req.cookie.token;

    if (!token) return res.status(401).json({ message: "Not Authenticated...!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) return res.status(403).json({ message: "Token is not valid...!" })
    });

    res.status(200).jaon({ message: "You are authenticated..." });
}; 


export const shouldBeAdmin = async (req, res) => {

    const token = req.cookie.token;

    if (!token) return res.status(401).json({ message: "Not Authenticated...!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) return res.status(403).json({ message: "Token is not valid...!" });

        if (!payload.isAdmin) {
            return res.status(403).json({ messsage: "Not Authorized" })
        }
    });

    res.status(200).jaon({ message: "You are authenticated..." });
};