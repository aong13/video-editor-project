import React from "react";
import { Button } from "react-bootstrap";
import styles from "./MultiVideoPlayer.module.css";

const MAX_TITLE_LENGTH = 30; // max 이상 생략

const MultiVideoPlayer = ({ videos, handleRemove, uploadFile }) => {
  const truncateTitle = (title) => {
    if (title.length > MAX_TITLE_LENGTH) {
      return title.substring(0, MAX_TITLE_LENGTH) + "...";
    }
    return title;
  };

  return (
    <div className={styles.videoContainer}>
      {videos.map((video, index) => (
        <div key={index} className={styles.videoItem}>
          <video
            src={URL.createObjectURL(video)}
            controls
            className={styles.video}
          />
          <p className={styles.videoTitle}>{truncateTitle(video.name)}</p>
          <Button
            onClick={() => handleRemove(index)}
            className={styles.deleteBtn}
          >
            삭제
          </Button>
        </div>
      ))}
      <Button
        className={styles.uploadBtn}
        onClick={() => uploadFile.current.click()}
      >
        비디오 추가하기
      </Button>
    </div>
  );
};

export default MultiVideoPlayer;
