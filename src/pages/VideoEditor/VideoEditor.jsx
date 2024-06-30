import React, { useState, useRef, useEffect } from "react";
import styles from "../VideoEditor.module.css";
import { Button, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

import video_placeholder from "../../assets/images/video_placeholder.svg";
import VideoPlayer from "./VideoPlayer";
import MultiRangeSlider from "../../components/VideoEditor/MultiRangeSlider";
import VideoConversionButton from "../../components/VideoEditor/VideoConversionButton";
import { sliderValueToVideoTime } from "../../utils/utils";
import ProcessingModal from "../../components/VideoEditor/ProcessingModal";

const ffmpeg = createFFmpeg({ log: true });

const VideoEditor = () => {
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [processing, setProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const uploadFile = useRef("");

  useEffect(() => {
    // 컴포넌트 마운트 시 FFmpeg 로드
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });
  }, []);

  useEffect(() => {
    const min = sliderValues[0];
    if (min !== undefined && videoPlayerState && videoPlayer) {
      // 선택된 슬라이더 값으로 비디오 시간 업데이트
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }
  }, [sliderValues]);

  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      const [min, max] = sliderValues;

      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      if (videoPlayerState.currentTime < minTime) {
        videoPlayer.seek(minTime);
      }
      if (videoPlayerState.currentTime > maxTime) {
        videoPlayer.seek(minTime);
      }
    }
  }, [videoPlayerState]);

  useEffect(() => {
    // 선택된 비디오 파일이 없을 경우 초기화
    if (!videoFile) {
      setVideoPlayerState(undefined);
      setVideoPlayer(undefined);
    }
    setSliderValues([0, 100]);
  }, [videoFile]);

  return (
    <article className="layout" style={{ padding: "56px 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1 className={styles.title}>Video Edit</h1>

        {/* 비디오 파일 O => 파일 재선택 버튼 */}
        {videoFile && (
          <div>
            <input
              onChange={(e) => setVideoFile(e.target.files[0])}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              ref={uploadFile}
            />
            <Button
              className={styles.re__upload__btn}
              onClick={() => uploadFile.current.click()}
              style={{ width: "fit-content" }}
            >
              비디오 재선택
            </Button>
          </div>
        )}
      </div>

      <section>
        {/* 비디오 파일 O => video player 표시 */}
        {videoFile ? (
          <VideoPlayer
            src={videoFile}
            onPlayerChange={(videoPlayer) => {
              setVideoPlayer(videoPlayer); // 비디오 플레이어 인스턴스 설정
            }}
            onChange={(videoPlayerState) => {
              setVideoPlayerState(videoPlayerState); // 비디오 플레이어 상태 설정
            }}
          />
        ) : (
          <>
            {/* 비디오 파일 X => video placeholder 표시 */}
            <div className={styles.video__placeholder}>
              <img src={video_placeholder} alt="비디오를 업로드해주세요." />
            </div>
            {/* 비디오 업로드 버튼 */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <input
                onChange={(e) => setVideoFile(e.target.files[0])}
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                ref={uploadFile}
              />
              <Button
                className={styles.upload__btn}
                onClick={() => uploadFile.current.click()}
              >
                비디오 업로드하기
              </Button>
            </div>
          </>
        )}
      </section>

      {/*편집 영역  */}
      {videoFile && (
        <>
          <section
            style={{
              width: "100%",
              marginTop: 30,
              marginBottom: 62,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MultiRangeSlider
              min={0}
              max={100}
              onChange={({ min, max }) => {
                setSliderValues([min, max]);
              }}
              duration={videoPlayerState ? videoPlayerState.duration : 0}
            />
          </section>

          <section>
            <VideoConversionButton
              onConversionStart={() => {
                setProcessing(true); // 변환 시작 시 처리 중 상태 설정
              }}
              onConversionEnd={() => {
                setProcessing(false); // 변환 완료 시 처리 중 상태 해제
                setShowToast(true);
              }}
              ffmpeg={ffmpeg}
              videoPlayerState={videoPlayerState}
              sliderValues={sliderValues}
              videoFile={videoFile}
            />
          </section>
        </>
      )}

      {/* 토스트 메시지 */}
      <ToastContainer
        className="p-3"
        position={"top-center"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          bg="dark"
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Video Editor</strong>
          </Toast.Header>
          <Toast.Body>내보내기가 완료되었습니다.</Toast.Body>
        </Toast>
      </ToastContainer>

      <ProcessingModal processing={processing} setProcessing={setProcessing} />
    </article>
  );
};

export default VideoEditor;
