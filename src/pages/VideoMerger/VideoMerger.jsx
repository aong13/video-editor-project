import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import MultiVideoPlayer from "./MultiVideoPlayer";
import styles from "../VideoEditor.module.css";
import ProcessingModal from "../../components/VideoEditor/ProcessingModal";
import ExportButton from "../../components/StyledButton";

const ffmpeg = createFFmpeg({ log: true });

function VideoMerger() {
  const [videos, setVideos] = useState([]);
  const [processing, setProcessing] = useState(false);
  const uploadFile = useRef(null);

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files);
    setVideos((prevVideos) => [...prevVideos, ...files]);
  };

  const moveVideo = (index, direction) => {
    const newVideos = [...videos];
    if (direction === "backward" && index > 0) {
      const temp = newVideos[index - 1];
      newVideos[index - 1] = newVideos[index];
      newVideos[index] = temp;
    } else if (direction === "forward" && index < newVideos.length - 1) {
      const temp = newVideos[index + 1];
      newVideos[index + 1] = newVideos[index];
      newVideos[index] = temp;
    }
    setVideos(newVideos);
  };

  const mergeVideos = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    setProcessing(true);

    const promises = videos.map(async (video) => {
      await ffmpeg.FS("writeFile", video.name, await fetchFile(video));
    });

    await Promise.all(promises);

    const concatFileContent = videos
      .map((video) => `file '${video.name}'`)
      .join("\n");
    ffmpeg.FS("writeFile", "concat.txt", concatFileContent);

    await ffmpeg.run(
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      "concat.txt",
      "-c",
      "copy",
      "output.mp4"
    );

    const data = ffmpeg.FS("readFile", "output.mp4");

    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "merged-video.mp4";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    setProcessing(false);
  };

  const handleVideoRemove = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <article className="layout" style={{ padding: "56px 16px" }}>
      <h1 className={styles.title} style={{ marginBottom: 16 }}>
        Merge Video
      </h1>
      <div style={{ marginBottom: 32 }}>
        <div className={styles.uploadSection}>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoUpload}
            style={{ display: "none" }}
            ref={uploadFile}
          />
          {videos.length === 0 && (
            <>
              <Button
                className={styles.uploadBtn}
                onClick={() => uploadFile.current.click()}
              >
                파일 선택
              </Button>
              <p>비디오를 여러 개 선택해주세요.</p>
            </>
          )}
        </div>
      </div>

      {videos.length > 0 && (
        <>
          <p>
            비디오를 삭제하거나 순서를 변경할 수 있습니다.
            <br /> 병합하고자 하는 영상을 선택하고 순서를 조정한 후 다운로드
            하세요.
          </p>
          <MultiVideoPlayer
            videos={videos}
            handleRemove={handleVideoRemove}
            moveVideo={moveVideo} // moveVideo 전달
            uploadFile={uploadFile}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <ExportButton
              onClick={mergeVideos}
              buttonText="비디오 병합 및 다운로드"
            />
          </div>
        </>
      )}
      <ProcessingModal processing={processing} setProcessing={setProcessing} />
    </article>
  );
}

export default VideoMerger;
