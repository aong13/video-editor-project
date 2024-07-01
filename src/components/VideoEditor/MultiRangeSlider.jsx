import { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import "./multiRangeSlider.css";
import { formatTimeMMSS, formatTimeKor } from "../../utils/utils";
export default function MultiRangeSlider({
  min,
  max,
  onChange,
  duration,
  videoFile,
}) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // 퍼센트 계산 함수
  const getPercent = useCallback(
    (value) => Math.round((value / duration) * 100),
    [duration]
  );

  // 슬라이더 초기화
  useEffect(() => {
    setMinVal(min);
    setMaxVal(duration);
  }, [videoFile, min, duration]);

  // 최소 값이 변경될 때 범위 너비 설정
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // 최대 값이 변경될 때 범위 너비 설정
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // 최소 및 최대 값이 변경될 때 onChange 콜백 호출
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div className="slider">
        <div className="slider__total-duration">
          재생시간 {formatTimeKor(maxVal - minVal)}
        </div>
        <input
          type="range"
          min={min}
          max={duration}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > duration - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={duration} ////max 값을 비디오의 총 길이인 duration으로 설정
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />

        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div
          className="slider__left-value"
          style={{ left: `${getPercent(minVal)}%` }}
        >
          {formatTimeMMSS(minVal)}
        </div>
        <div
          className="slider__right-value"
          style={{ left: `${getPercent(maxVal)}%` }}
        >
          {formatTimeMMSS(maxVal)}
        </div>
      </div>
    </div>
  );
}
