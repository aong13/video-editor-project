import React, { useState, useRef, useEffect } from "react";
import styles from "../VideoEditor.module.css";
import { Button } from "react-bootstrap";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

import video_placeholder from "../../assets/images/video_placeholder.svg";
import VideoPlayer from "../../utils/VideoPlayer";
import MultiRangeSlider from "../../components/VideoEditor/MultiRangeSlider";
import VideoConversionButton from "../../components/VideoEditor/VideoConversionButton";
import { sliderValueToVideoTime } from "../../utils/utils";
import ProcessingModal from "../../components/VideoEditor/ProcessingModal";
import ToastMsg from "../../components/VideoEditor/ToastMsg";
import useDeviceType from "../../hooks/usdDeviceType";

const ffmpeg = createFFmpeg({ log: true });

const VideoEditor = () => {
  const deice = useDeviceType();
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [processing, setProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const uploadFile = useRef("");

  useEffect(() => {
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      const [min, max] = sliderValues;
      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      if (videoPlayerState.currentTime < minTime) {
        videoPlayer.seek(minTime);
      }
      if (videoPlayerState.currentTime > maxTime) {
        videoPlayer.seek(maxTime);
      }
    }
  }, [sliderValues, videoPlayerState]);

  useEffect(() => {
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
            <div className={styles.video__placeholder}>
              <img src={video_placeholder} alt="비디오를 업로드해주세요." />
            </div>
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
              max={videoPlayerState ? videoPlayerState.duration : 100}
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
      <ToastMsg showToast={showToast} setShowToast={setShowToast} />
      <ProcessingModal
        processing={processing}
        setProcessing={setProcessing}
        msg="내보내기가 완료되었습니다."
      />
    </article>
  );
};

export default VideoEditor;
