import { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import "./multiRangeSlider.css";
import { formatTimeMMSS, formatTimeKor } from "../../utils/utils";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [duration, setDuration] = useState(max - min);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  //초기화
  useEffect(() => {
    setMinVal(Math.floor(min));
    setMaxVal(Math.ceil(max));
    setDuration(Math.ceil(max) - Math.floor(min));
  }, [min, max]);

  // 최소 값이 변경될 때 범위 너비 설정
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // 최대 값이 변경될 때 범위 너비 설정
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // 최소 및 최대 값이 변경될 때 onChange 콜백 호출
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
    setDuration(maxVal - minVal); // 슬라이더 값이 변경될 때 총 길이 업데이트
  }, [minVal, maxVal]);

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
            const value = Math.min(Math.floor(+event.target.value), maxVal - 1);
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
            const value = Math.max(Math.ceil(+event.target.value), minVal + 1);
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
};
export default MultiRangeSlider;
