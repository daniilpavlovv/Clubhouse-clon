import axios from "axios";
import Cookies from "nookies";
import { UserApi } from "./UserApi";
import { RoomApi } from "./RoomApi";

type ApiRturnType = ReturnType<typeof UserApi> & ReturnType<typeof RoomApi>;

export const Api = (ctx: any): ApiRturnType => {
  const cookies = Cookies.get(ctx);
  const token = cookies.token;

  const instance = axios.create({
    baseURL: `http://localhost:5000`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return [UserApi, RoomApi].reduce(
    (perv, f) => ({ ...perv, ...f(instance) }),
    {} as ApiRturnType
  );
};
