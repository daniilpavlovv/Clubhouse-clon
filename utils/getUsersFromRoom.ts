import { UserData } from '../pages';

export type SocketRoom = Record<string, { roomId: number; user: UserData }>;

export const getUsersFromRoom = (rooms: SocketRoom, roomId: number) =>
  Object.values(rooms)
    .filter((obj) => obj.roomId === roomId)
    .map((obj) => ({ ...obj.user, roomId }));
