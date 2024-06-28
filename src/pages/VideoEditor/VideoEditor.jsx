import React, { useState, useRef, useEffect } from "react";
import styles from "./VideoEditor.module.css";
import { Button, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

import video_placeholder from "../../assets/images/editor/video_placeholder.png";
import VideoPlayer from "./VideoPlayer";
import MultiRangeSlider from "../../components/VideoEditor/MultiRangeSlider";
import VideoConversionButton from "./VideoConversionButton";
import { sliderValueToVideoTime } from "../../utils/utils";

const ffmpeg = createFFmpeg({ log: true });

function VideoEditor() {
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [processing, setProcessing] = useState(false);
  const [show, setShow] = useState(false);
  const uploadFile = useRef("");

  useEffect(() => {
    // loading ffmpeg on startup
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });
  }, []);

  useEffect(() => {
    const min = sliderValues[0];
    // when the slider values are updated, updating the
    // video time
    if (min !== undefined && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }
  }, [sliderValues]);

  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      // allowing users to watch only the portion of
      // the video selected by the slider
      const [min, max] = sliderValues;

      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      if (videoPlayerState.currentTime < minTime) {
        videoPlayer.seek(minTime);
      }
      if (videoPlayerState.currentTime > maxTime) {
        // looping logic
        videoPlayer.seek(minTime);
      }
    }
  }, [videoPlayerState]);

  useEffect(() => {
    // when the current videoFile is removed,
    // restoring the default state
    if (!videoFile) {
      setVideoPlayerState(undefined);
      setVideoPlayerState(undefined);
    }
    setSliderValues([0, 100]);
  }, [videoFile]);

  if (!ffmpegLoaded) return <div>load</div>;

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
        {videoFile ? (
          <VideoPlayer
            src={videoFile}
            onPlayerChange={(videoPlayer) => {
              setVideoPlayer(videoPlayer);
            }}
            onChange={(videoPlayerState) => {
              setVideoPlayerState(videoPlayerState);
            }}
          />
        ) : (
          <>
            <img
              src={video_placeholder}
              alt="비디오를 업로드해주세요."
              style={{ marginBottom: 32 }}
            />
            <div>
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
            />
          </section>

          <section>
            <VideoConversionButton
              onConversionStart={() => {
                setProcessing(true);
              }}
              onConversionEnd={() => {
                setProcessing(false);
                setShow(true);
              }}
              ffmpeg={ffmpeg}
              videoPlayerState={videoPlayerState}
              sliderValues={sliderValues}
              videoFile={videoFile}
            />
          </section>
        </>
      )}

      <ToastContainer
        className="p-3"
        position={"top-center"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
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

      <Modal
        show={processing}
        onHide={() => setProcessing(false)}
        backdrop={false}
        keyboard={false}
        centered
        size="sm"
      >
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>

          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              fontWeight: 600,
              color: "#c8c8c8",
            }}
          >
            내보내기가 진행중입니다.
          </p>
        </div>
      </Modal>
    </article>
  );
}

export default VideoEditor;
