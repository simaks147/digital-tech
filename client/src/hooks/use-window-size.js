import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.document.documentElement.clientWidth,
          height: window.document.documentElement.clientHeight
        });
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
