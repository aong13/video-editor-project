import { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import MultiVideoPlayer from "./MultiVideoPlayer";
import styles from "../VideoEditor.module.css";

const ffmpeg = createFFmpeg({ log: true });

function VideoMerger() {
  const [videos, setVideos] = useState([]);
  const [processing, setProcessing] = useState(false);
  const uploadFile = useRef(null);

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files);
    setVideos((prevVideos) => [...prevVideos, ...files]);
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

  // 파일을 Uint8Array로 변환
  const fetchFile = async (file) => {
    const data = await file.arrayBuffer();
    return new Uint8Array(data);
  };

  const handleVideoRemove = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <article className="layout" style={{ padding: "56px 16px" }}>
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
            <Button
              className={styles.uploadBtn}
              onClick={() => uploadFile.current.click()}
            >
              파일 선택
            </Button>
          )}
        </div>
      </div>

      {videos.length > 0 && (
        <>
          <MultiVideoPlayer
            videos={videos}
            handleRemove={handleVideoRemove}
            uploadFile={uploadFile}
          />
          <div style={{ marginTop: 20 }}>
            <Button
              variant="primary"
              disabled={processing}
              onClick={mergeVideos}
              className={styles.upload__btn}
            >
              {processing ? "병합 중..." : "비디오 병합 및 다운로드"}
            </Button>
          </div>
        </>
      )}
    </article>
  );
}

export default VideoMerger;
