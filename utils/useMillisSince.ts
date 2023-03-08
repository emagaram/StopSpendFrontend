import { useEffect, useState } from "react";

export default function useMillisSince(startTime: number, stopAfter?: number) {
  const [result, setResult] = useState<number>(0);
  useEffect(() => {
    const timerID = setInterval(() => {
      setResult(new Date().getTime() - startTime);
      if (stopAfter && new Date().getTime() - startTime > stopAfter) {
        clearInterval(timerID);
      }
    }, 10);

    return () => {
      clearInterval(timerID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return result;
}
