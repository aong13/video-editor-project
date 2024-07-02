import styles from "./MultiVideoPlayer.module.css";
import plus_icon from "../../assets/icons/plus.svg";

// 아이콘 찾아서 추가하기
// import arrow_forward_icon from "../../assets/icons/arrow-forward.svg";
// import arrow_backward_icon from "../../assets/icons/arrow-backward.svg";

const MAX_TITLE_LENGTH = 30; // 최대 제목 길이

const MultiVideoPlayer = ({ videos, handleRemove, moveVideo, uploadFile }) => {
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
          <div className={styles.move_btn__container}>
            <button
              className={styles.move_btn}
              style={{ opacity: index === 0 ? 0 : "" }} // 첫 영상일 때 비활성화
              onClick={() => moveVideo(index, "backward")}
            >
              {"<"}
              {/* <img src={arrow_backward_icon} alt="뒤로 이동" /> */}
            </button>

            <button
              className={styles.move_btn}
              onClick={() => moveVideo(index, "forward")}
              style={{ opacity: index === videos.length - 1 ? 0 : "" }} // 마지막 영상일 때 비활성화
            >
              {">"}
            </button>
          </div>
          <div className={styles.delete__overlay}>
            <video
              src={URL.createObjectURL(video)}
              controls
              className={styles.video}
            />
            <div
              onClick={() => handleRemove(index)}
              className={styles.delete__btn}
            >
              삭제
            </div>
          </div>
          <p className={styles.videoTitle}>{truncateTitle(video.name)}</p>
        </div>
      ))}
      <button
        className={styles.add__btn}
        onClick={() => uploadFile.current.click()}
      >
        <img src={plus_icon} alt="비디오 추가하기" />
        <p>비디오 추가</p>
      </button>
    </div>
  );
};

export default MultiVideoPlayer;
