import React from "react";
import { Button } from "antd";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { readFileAsBase64, sliderValueToVideoTime } from "../../utils/utils";
import out from "../../assets/icons/out.svg";
import dark_download from "../../assets/icons/dark_download.svg";
import audio from "../../assets/icons/audio.svg";
import styles from "./VideoConversionButton.module.css";

function VideoConversionButton({
  videoPlayerState,
  sliderValues,
  videoFile,
  ffmpeg,
  customFileName,
  onConversionStart = () => {},
  onConversionEnd = () => {},
  customFileName,
}) {
  const inputFileName = "input.mp4";

  const convertToGif = async () => {
    try {
      onConversionStart(true);
      const outputNameGif = `${customFileName || "output"}.gif`;

    const inputFileName = "input.mp4";
    const outputFileName = `${customFileName}.gif`;

    ffmpeg.FS("writeFile", inputFileName, await fetchFile(videoFile));

      const [min, max] = sliderValues;
      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      await ffmpeg.run(
        "-i",
        inputFileName,
        "-ss",
        `${minTime}`,
        "-to",
        `${maxTime}`,
        "-vf",
        "fps=10,scale=320:-1:flags=lanczos",
        "-f",
        "gif",
        outputNameGif
      );

      const data = ffmpeg.FS("readFile", outputNameGif);

      const gifUrl = URL.createObjectURL(
        new Blob([data.buffer], { type: "image/gif" })
      );

    const link = document.createElement("a");
    link.href = gifUrl;
    link.setAttribute("download", outputFileName);
    link.click();

      onConversionEnd(false);
    } catch (error) {
      console.error("Error during GIF conversion:", error);
      onConversionEnd(false);
    }
  };

  const onCutTheVideo = async () => {
    onConversionStart(true);

    const inputFileName = "input.mp4";
    const outputFileName = `${customFileName}.mp4`;

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const duration = max - min;

    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));
    await ffmpeg.run(
      "-ss",
      `${minTime}`,
      "-i",
      inputFileName,
      "-t",
      `${duration}`,
      "-c",
      "copy",
      outputFileName
    );

      const data = ffmpeg.FS("readFile", outputNameMP4);
      const dataURL = await readFileAsBase64(
        new Blob([data.buffer], { type: "video/mp4" })
      );

    const link = document.createElement("a");
    link.href = dataURL;
    link.setAttribute("download", outputFileName);
    link.click();

      onConversionEnd(false);
    } catch (error) {
      console.error("Error during video cutting:", error);
      onConversionEnd(false);
    }
  };

  const convertToAudio = async () => {
    try {
      onConversionStart(true);
      const outputNameMP3 = `${customFileName || "output"}.mp3`;

    const inputFileName = "input.mp4";
    const outputFileName = `${customFileName}.mp3`;

    ffmpeg.FS("writeFile", inputFileName, await fetchFile(videoFile));

      const [min, max] = sliderValues;
      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      await ffmpeg.run(
        "-ss",
        `${minTime}`,
        "-to",
        `${maxTime}`,
        "-i",
        inputFileName,
        "-q:a",
        "0",
        "-map",
        "a",
        outputNameMP3
      );

      const data = ffmpeg.FS("readFile", outputNameMP3);

      const audioUrl = URL.createObjectURL(
        new Blob([data.buffer], { type: "audio/mpeg" })
      );

    const link = document.createElement("a");
    link.href = audioUrl;
    link.setAttribute("download", outputFileName);
    link.click();

      onConversionEnd(false);
    } catch (error) {
      console.error("Error during audio conversion:", error);
      onConversionEnd(false);
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonItem}>
        <Button onClick={convertToGif} className="gif__out__btn">
          <img src={out} alt="GIF 내보내기" />
          <p style={{ color: "#383838", fontSize: 16, fontWeight: 700 }}>
            GIF 내보내기
          </p>
        </Button>
      </div>
      <div className={styles.buttonItem}>
        <Button onClick={onCutTheVideo} className="gif__out__btn">
          <img src={dark_download} alt="비디오 저장하기" />
          <p style={{ color: "#383838", fontSize: 16, fontWeight: 700 }}>
            비디오 저장하기
          </p>
        </Button>
      </div>
      <div className={styles.buttonItem}>
        <Button onClick={convertToAudio} className="gif__out__btn">
          <img src={audio} alt="오디오로 변환하기" />
          <p style={{ color: "#383838", fontSize: 16, fontWeight: 700 }}>
            오디오로 변환하기
          </p>
        </Button>
      </div>
    </div>
  );
}

export default VideoConversionButton;
