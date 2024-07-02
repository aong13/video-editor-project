import React from "react";
import styles from "./MultiVideoPlayer.module.css";
import plus_icon from "../../assets/icons/plus.svg";

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
        <div>
          <div
            key={index}
            className={styles.videoItem}
            onClick={() => handleRemove(index)}
          >
            <video
              src={URL.createObjectURL(video)}
              controls
              className={styles.video}
            />
            <div className={styles.overlay}>삭제</div>
          </div>
          <p className={styles.videoTitle}>{truncateTitle(video.name)}</p>
        </div>
      ))}
      <button
        className={styles.addButton}
        onClick={() => uploadFile.current.click()}
      >
        <img src={plus_icon} alt="비디오 추가하기" />
        <p>비디오 추가</p>
      </button>
    </div>
  );
};

export default MultiVideoPlayer;
