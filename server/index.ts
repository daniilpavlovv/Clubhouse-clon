import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import sharp from "sharp";
import fs from "fs";
import { passport } from "./core/passport";
import { uploader } from "./core/uploader";
import { Room } from "../models";

import AuthController from "./controller/AuthController";
import RoomController from "./controller/RoomController";
import { UserData } from "../pages";
import { getUsersFromRoom, SocketRoom } from "../utils/getUsersFromRoom";

dotenv.config({
  path: "server/.env",
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get(
  "/auth/me",
  passport.authenticate("jwt", { session: false }),
  AuthController.getMe
);

app.post(
  "/auth/sms/activate",
  passport.authenticate("jwt", { session: false }),
  AuthController.activate
);

app.get(
  "/auth/sms",
  passport.authenticate("jwt", { session: false }),
  AuthController.sendSms
);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  AuthController.authCallback
);

app.post("/upload", uploader.single("photo"), (req, res) => {
  const filePath = req.file.path;
  sharp(filePath)
    .rotate()
    .resize(500, 500)
    .toFile(filePath.replace(/\.(jpeg|jpg|png)$/, `.webp`), (err) => {
      if (err) {
        throw err;
      }

      fs.unlinkSync(filePath);

      res.json({
        url: `/users_data/avatars/${req.file.filename.replace(
          /\.(jpeg|jpg|png)$/,
          `.webp`
        )}`,
      });
    });
});
app.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  AuthController.getUserInfo
);

app.get(
  "/rooms",
  passport.authenticate("jwt", { session: false }),
  RoomController.index
);
app.post(
  "/rooms",
  passport.authenticate("jwt", { session: false }),
  RoomController.create
);
app.get(
  "/rooms/:id",
  passport.authenticate("jwt", { session: false }),
  RoomController.show
);
app.delete(
  "/rooms/:id",
  passport.authenticate("jwt", { session: false }),
  RoomController.delete
);

const rooms: SocketRoom = {};

io.on("connection", (socket) => {
  console.log("A User Connected", socket.id);

  socket.on("FRONT@ROOM/USER_JOIN", ({ user, roomId }) => {
    socket.join(`room/${roomId}`);
    rooms[socket.id] = { roomId, user };
    const speakers = getUsersFromRoom(rooms, roomId);
    io.emit("BECK#ROOM/UPDATE", { roomId: Number(roomId), speakers });
    io.in(`room/${roomId}`).emit("BECK#ROOM/USER_JOIN", speakers);
    Room.update({ speakers }, { where: { id: Number(roomId) } });
  });

  socket.on(
    "FRONT@ROOM/USER_CALL",
    ({ targetUserId, callerUserId, roomId, signal }) => {
      socket.broadcast.to(`room/${roomId}`).emit("BECK#ROOM/USER_CALL", {
        targetUserId: Number(targetUserId),
        callerUserId: Number(callerUserId),
        signal,
      });
    }
  );

  socket.on(
    "FRONT@ROOM/USER_ANSWER",
    ({ targetUserId, callerUserId, roomId, signal }) => {
      socket.broadcast.to(`room/${roomId}`).emit("BECK#ROOM/USER_ANSWER", {
        targetUserId: Number(targetUserId),
        callerUserId: Number(callerUserId),
        signal,
      });
    }
  );

  socket.on("disconnecting", () => {
    if (rooms[socket.id]) {
      const { roomId, user } = rooms[socket.id];
      socket.broadcast.to(`room/${roomId}`).emit("BECK#ROOM/USER_LEAVE", user);
      delete rooms[socket.id];
      const speakers = getUsersFromRoom(rooms, roomId);
      io.emit("BECK#ROOM/UPDATE", { roomId, speakers });
      Room.update({ speakers }, { where: { id: roomId } });
    }
  });
});

server.listen(5000, () => {
  console.log("Ready");
});
