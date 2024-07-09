import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173"
    ]
  }
});

let onlineUsers = [];

const addUsers = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
    console.log(`User added: ${userId}`);
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log(`User removed: ${socketId}`);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("newUser", (userId) => {
    addUsers(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Message sent to ${receiverId}`);
    } else {
      console.error(`User not found: ${receiverId}`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });
});

io.listen(4000, () => {
  console.log('Socket.IO server is listening on port 4000');
}); 
