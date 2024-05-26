
import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    console.log(socket);
});

io.listen("4000", () => {
    console.log("Socket connected to port 4000");
});