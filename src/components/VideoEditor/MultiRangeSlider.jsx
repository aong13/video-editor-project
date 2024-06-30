import { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import "./multiRangeSlider.css";

export default function MultiRangeSlider({ min, max, onChange, disabled }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [duration, setDuration] = useState(max - min);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // 비율을 백분율로 변환
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // 왼쪽에서 감소하도록 범위의 너비 설정
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // 오른쪽에서 감소하도록 범위의 너비 설정
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // 상태가 변경될 때 최소 및 최대 값 가져오기
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
    setDuration(maxVal - minVal); // 슬라이더 값이 변경될 때 총 길이 업데이트
  }, [minVal, maxVal]);

  const formatTimeMMSS = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const formatTimeKor = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}분 ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}초`;
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div className="slider">
        <div className="slider__total-duration">
          재생시간 {formatTimeKor(duration)}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > max - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
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
