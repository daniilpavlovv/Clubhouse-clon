import React from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const socketRef = React.useRef<typeof Socket>();

  if (!socketRef.current) {
    socketRef.current = typeof window !== 'undefined' && io('http://192.168.31.75:3001');
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
