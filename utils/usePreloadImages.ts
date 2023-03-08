import { useEffect } from "react";
import { CustomWindow } from "../types";

export const usePreloadImages = (
  imageSrcs: string[],
  onAllLoaded?: () => void
) => {
  useEffect(() => {
    let customWindow = window as CustomWindow;
    const randomStr = Math.random().toString(32).slice(2) + Date.now();
    customWindow.usePreloadImagesData = customWindow.usePreloadImagesData ?? {};
    customWindow.usePreloadImagesData[randomStr] = [];
    (async () => {
      const promises = imageSrcs.map((src) => {
        return new Promise((res, rej) => {
          const img = new Image();
          img.src = src;
          img.onload = res;
          img.onerror = rej;
          customWindow.usePreloadImagesData[randomStr].push(img);
        });
      });
      await Promise.all(promises);
      if (onAllLoaded) onAllLoaded();
    })();

    return () => {
      delete customWindow.usePreloadImagesData?.[randomStr];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePreloadImages;
