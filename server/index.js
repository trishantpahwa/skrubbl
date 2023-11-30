const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {

    // Join a room.
    socket.on("joinRoom", async (room) => {
        try {
            await socket.join(room);
        } catch (error) {
            console.error(`Error joining room: ${error}`);
        }
    });

    // Broadcast the received message.
    socket.on("message", async ({ room, message }) => {
        try {
            await socket.to(room).emit("message", message);
        } catch (error) {
            console.error(`Error broadcasting message: ${error}`);
        }
    });

    socket.on("drawing-update", async ({ room, drawing }) => {
        try {
            await socket.to(room).emit("drawing-update", drawing);
        } catch (error) {
            console.error(`Error broadcasting drawing: ${error}`);
        }
    });

    socket.on("disconnect", () => {
        // console.log("user disconnected");
    });
});

process.env.NODE_ENV !== "TEST"
    ? server.listen(process.env.PORT, () => {
          console.log(`Listening on ${process.env.PORT}`);
      })
    : null;

module.exports = { server };

