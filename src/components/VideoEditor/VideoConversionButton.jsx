import React from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { readFileAsBase64, sliderValueToVideoTime } from "../../utils/utils";
import out from "../../assets/icons/out.svg";
import dark_download from "../../assets/icons/dark_download.svg";
import audio from "../../assets/icons/audio.svg";
import { ExportButton, ButtonContainer } from "../StyledButton";

function VideoConversionButton({
  videoPlayerState,
  sliderValues,
  videoFile,
  ffmpeg,
  customFileName,
  onConversionStart = () => {},
  onConversionEnd = () => {},
}) {
  const convertToGif = async () => {
    onConversionStart(true);

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
      "-t",
      `${maxTime}`,
      "-f",
      "gif",
      outputFileName
    );

    const data = ffmpeg.FS("readFile", outputFileName);

    const gifUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );

    const link = document.createElement("a");
    link.href = gifUrl;
    link.setAttribute("download", outputFileName);
    link.click();

    onConversionEnd(false);
  };

  const onCutTheVideo = async () => {
    onConversionStart(true);
    const inputFileName = "input.mp4";
    const outputFileName = `${customFileName}.mp4`;

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    //const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);
    const duration = max - min;
    ffmpeg.FS("writeFile", inputFileName, await fetchFile(videoFile));
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

    const data = ffmpeg.FS("readFile", outputFileName);
    const dataURL = await readFileAsBase64(
      new Blob([data.buffer], { type: "video/mp4" })
    );

    const link = document.createElement("a");
    link.href = dataURL;
    link.setAttribute("download", outputFileName);
    link.click();

    onConversionEnd(false);
  };

  const convertToAudio = async () => {
    onConversionStart(true);

    const inputFileName = "input.mp4";
    const outputFileName = `${customFileName}.mp3`;

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
      "-q:a",
      "0",
      "-map",
      "a",
      outputFileName
    );

    const data = ffmpeg.FS("readFile", outputFileName);

    const audioUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "audio/mpeg" })
    );

    const link = document.createElement("a");
    link.href = audioUrl;
    link.setAttribute("download", outputFileName);
    link.click();

    onConversionEnd(false);
  };

  return (
    <ButtonContainer>
      <ExportButton
        onClick={convertToGif}
        imgSrc={out}
        imgAlt="GIF 내보내기"
        buttonText="GIF 내보내기"
      />

      <ExportButton
        onClick={onCutTheVideo}
        imgSrc={dark_download}
        imgAlt="비디오 저장하기"
        buttonText="비디오 저장하기"
      />

      <ExportButton
        onClick={convertToAudio}
        imgSrc={audio}
        imgAlt="오디오로 변환하기"
        buttonText="오디오로 변환하기"
      />
    </ButtonContainer>
  );
}
export default VideoConversionButton;
