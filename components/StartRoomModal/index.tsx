import React from "react";
import { useRouter } from "next/router";
import { fetchCreateRoom } from "../../redux/slices/roomsSlice";
import { RoomType } from "../../api/RoomApi";
import { useAsyncAction } from "../../hooks/useAction";

import { Button } from "../Button";

import styles from "./StartRoomModal.module.scss";

interface StartRoomModalProps {
  onClose: () => void;
}

export const StartRoomModal: React.FC<StartRoomModalProps> = ({ onClose }) => {
  const router = useRouter();
  const createRoom = useAsyncAction(fetchCreateRoom);

  const [title, setTitle] = React.useState<string>("");
  const [type, setType] = React.useState<RoomType>("open");

  const onSubmit = async () => {
    if (!title) {
      return alert("title");
    }
    const data = await createRoom({ title, type });
    router.push(`/rooms/${data.id}`);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modal__close}>
          <button className={styles.close__mobile} />
          <button className={styles.close__desktop}>
            <img
              width="24px"
              height="24px"
              src="/static/close.svg"
              alt="Close"
              className={styles.closeBtn}
              onClick={onClose}
            />
          </button>
        </div>
        <div className={styles.addTopic}>
          <input
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a topic"
          />
        </div>
        <div className={styles.types}>
          <button
            onClick={() => setType("open")}
            className={type === "open" ? styles.selected : ""}
          >
            <img
              width="70px"
              height="70px"
              src="/static/room-type-1.png"
              alt="Room type"
            />
            <h5>Open</h5>
          </button>
          <button
            onClick={() => setType("social")}
            className={type === "social" ? styles.selected : ""}
          >
            <img
              width="70px"
              height="70px"
              src="/static/room-type-2.png"
              alt="Room type"
            />
            <h5>Social</h5>
          </button>
          <button
            onClick={() => setType("closed")}
            className={type === "closed" ? styles.selected : ""}
          >
            <img
              width="70px"
              height="70px"
              src="/static/room-type-3.png"
              alt="Room type"
            />
            <h5>Closed</h5>
          </button>
        </div>
        <div className={styles.delimiter}></div>
        <div className={styles.bottom}>
          <h3>Start a room open to everyone</h3>
          <Button onClick={onSubmit} color="green">
            <img
              width="18px"
              height="18px"
              src="/static/celebration.png"
              alt="Celebration"
            />
            Let's go
          </Button>
        </div>
      </div>
    </div>
  );
};
