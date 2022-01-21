import React, { useState, useEffect, useRef, useCallback } from "react";
import _ from "lodash";

export const useIsMount = () => {
  const isMountRef = useRef(false);
  useEffect(() => {
    isMountRef.current = true;
  }, []);
  return isMountRef.current;
};

export const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return { width, height };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};


export const useThrottle = (cb, delay, additionalDeps) => {
  const options = { leading: true, trailing: false }; // pass custom lodash options
  const cbRef = useRef(cb);
  const throttledCb = useCallback(
    _.throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  );
  useEffect(() => {
    cbRef.current = cb;
  });
  // set additionalDeps to execute effect, when other values change (not only on delay change)
  useEffect(throttledCb, [throttledCb, ...additionalDeps]);
}