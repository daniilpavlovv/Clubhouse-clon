import React from "react";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/selectors";
import { useRouter } from "next/router";
import { UserData } from "../../pages";
import { useSocket } from "../../hooks/useSocket";

import { Speaker } from "../Speaker";

import styles from "./Room.module.scss";

interface RoomProps {
  title: string;
}

let peers = [];

export const Room: React.FC<RoomProps> = ({ title }) => {
  const [users, setUsers] = React.useState<UserData[]>([]);
  const socket = useSocket();
  const router = useRouter();
  const roomId = +router.query.id;
  const user = useSelector(selectUserData);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // SimplePeer

      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          socket.emit("FRONT@ROOM/USER_JOIN", {
            user,
            roomId,
          });

          socket.on("BECK#ROOM/USER_JOIN", (allUsers: UserData[]) => {
            setUsers(allUsers);
            allUsers.forEach((speaker) => {
              if (
                user.id !== speaker.id &&
                !peers.find((obj) => obj.id === speaker.id)
              ) {
                const peerIncome = new Peer({
                  initiator: true,
                  trickle: false,
                  stream: stream,
                });

                peerIncome.on("signal", (signal) => {
                  socket.emit("FRONT@ROOM/USER_CALL", {
                    targetUserId: speaker.id,
                    callerUserId: user.id,
                    roomId,
                    signal,
                  });

                  peers.push({
                    peer: peerIncome,
                    id: speaker.id,
                  });
                });
              }
            });
          });

          socket.on(
            "BECK#ROOM/USER_CALL",
            ({ targetUserId, callerUserId, signal: callerSignal }) => {
              const peerOutcome = new Peer({
                initiator: false,
                trickle: false,
                stream: stream,
              });

              peerOutcome.signal(callerSignal);

              peerOutcome
                .on("signal", (outSignal) => {
                  socket.emit("FRONT@ROOM/USER_ANSWER", {
                    targetUserId: Number(callerUserId),
                    callerUserId: Number(targetUserId),
                    roomId,
                    signal: outSignal,
                  });
                })

                .on("stream", (stream) => {
                  document.querySelector("audio").srcObject = stream;
                  document.querySelector("audio").play();
                });
            }
          );

          socket.on("BECK#ROOM/USER_ANSWER", ({ callerUserId, signal }) => {
            const obj = peers.find(
              (obj) => Number(obj.id) === Number(callerUserId)
            );
            if (obj) {
              obj.peer.signal(signal);
            }
          });

          socket.on("BECK#ROOM/USER_LEAVE", (leaveUser: UserData) => {
            setUsers((prev) =>
              prev.filter((prevUser) => {
                const peerUser = peers.find(
                  (obj) => Number(obj.id) === Number(leaveUser.id)
                );
                if (peerUser) {
                  peerUser.peer.destroy();
                }
                return prevUser.id !== leaveUser.id;
              })
            );
          });
        })
        .catch(() => {
          console.error("No access!");
        });

      // SocketIO

      socket.emit("FRONT@ROOM/USER_JOIN", {
        roomId,
        user,
      });

      socket.on("BECK#ROOM/USER_LEAVE", (user: UserData) => {
        setUsers((prev) => prev.filter((obj) => obj.id !== user.id));
      });

      socket.on("BECK#ROOM/USER_JOIN", (allUsers) => {
        setUsers(allUsers);
      });
    }
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <audio className={styles.audio} controls />
        <div className="styles.container">
          <div className="d-flex align-items-center justify-content-between">
            <h2>{title}</h2>
          </div>

          <div className={styles.users}>
            {users.map((obj) => (
              <Speaker key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
