const { Server } = require("socket.io");

const rooms = {};

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join-room", ({ roomId, name }) => {

      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      rooms[roomId].push({
        socketId: socket.id,
        name
      });

      socket.roomId = roomId;

      const participants = rooms[roomId];

      socket.emit("existing-users", participants);

      socket.to(roomId).emit("user-joined", {
        socketId: socket.id,
        name
      });

      io.to(roomId).emit(
        "participants",
        participants
      );

      console.log(rooms);
    });

    socket.on(
      "offer",
      ({ target, offer }) => {

        io.to(target).emit(
          "offer",
          {
            offer,
            sender: socket.id
          }
        );
      }
    );

    socket.on(
      "answer",
      ({ target, answer }) => {

        io.to(target).emit(
          "answer",
          {
            answer,
            sender: socket.id
          }
        );
      }
    );

    socket.on(
      "ice-candidate",
      ({ target, candidate }) => {

        io.to(target).emit(
          "ice-candidate",
          {
            candidate,
            sender: socket.id
          }
        );
      }
    );

    socket.on("disconnect", () => {

      const roomId = socket.roomId;

      if (!roomId || !rooms[roomId]) {
        return;
      }

      rooms[roomId] = rooms[roomId].filter(
        (user) => user.socketId !== socket.id
      );

      io.to(roomId).emit(
        "participants",
        rooms[roomId]
      );

      io.to(roomId).emit(
        "user-left",
        socket.id
      );

      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }

      console.log(
        "Disconnected:",
        socket.id
      );
    });
  });
};