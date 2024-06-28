import React from "react";
import styles from "./MultiVideoPlayer.module.css";

const MAX_TITLE_LENGTH = 30; // max 이상 생략

const MultiVideoPlayer = ({ videos }) => {
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
        </div>
      ))}
    </div>
  );
};

export default MultiVideoPlayer;
