import { useEffect, useRef, type DependencyList } from "react";

export const useAutoScroll = <T extends HTMLElement = HTMLElement>(
  deps: DependencyList,
  behavior: ScrollBehavior = "smooth",
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
    // biome-ignore lint/correctness/useExhaustiveDependencies: client responsibility
  }, deps);

  return ref;
};
