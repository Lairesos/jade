import { RefObject, useEffect } from "react";

export function useAutoScroll(
  ref: RefObject<HTMLDivElement | null>,
  dependencies: unknown[]
) {
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, dependencies);
}