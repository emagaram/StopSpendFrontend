import { useCallback, useEffect, useState } from "react";

export default function useScrollInfo() {
  const [y, setY] = useState(window.scrollY);
  const [direction, setDirection] = useState<"Up" | "Down" | undefined>(
    undefined
  );

  const handleNavigation = useCallback(
    (e: any) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        //   console.log("scrolling up"+ y);
        setDirection("Up");
      } else if (y < window.scrollY) {
        //   console.log("scrolling down" + y);
        setDirection("Down");
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);
  return {
    direction: direction,
    yPosition: y,
  };
}
