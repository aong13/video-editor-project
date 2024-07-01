import { useLayoutEffect, useState } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("pc");

  let screenWidth = window.innerWidth;

  const updateDeviceType = () => {
    screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setDeviceType("mobile");
    }
    if (screenWidth > 768 && screenWidth <= 1024) {
      setDeviceType("tablet");
    }
    if (screenWidth > 1024) {
      setDeviceType("pc");
    }
  };

  useLayoutEffect(() => {
    updateDeviceType();
    window.addEventListenr("resize", updateDeviceType);
    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, [deviceType]);
};
export default useDeviceType;
