import React from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = () => {
  const socketRef = React.useRef<typeof Socket>();

  if (!socketRef.current) {
    socketRef.current =
      typeof window !== "undefined" && io("http://localhost:5000");
  } else {
    socketRef.current.connect;
  }

  React.useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return socketRef.current;
};
