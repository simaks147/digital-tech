import { useState } from "react";

export default function useDelay(delay: number): boolean {
  const [passed, setPassed] = useState(false);
  const time = Date.now();

  setTimeout(() => {
    if (Date.now() - time >= delay) {
      setPassed(true)
    }
  }, delay);

  return passed;
}