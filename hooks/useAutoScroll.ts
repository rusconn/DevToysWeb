import { DependencyList, useEffect, useRef } from "react";

export const useAutoScroll = <T extends HTMLElement = HTMLElement>(
  deps: DependencyList,
  behavior: ScrollBehavior = "smooth"
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const { current } = ref;

    if (current) {
      current.scrollTo({
        left: current.scrollWidth,
        top: current.scrollHeight,
        behavior,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
};
