import { useLayoutEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement = HTMLElement>(
  trigger: unknown,
  behavior: ScrollBehavior = "smooth",
) {
  const ref = useRef<T>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger is needed for re-rendering
  useLayoutEffect(() => {
    const { current } = ref;

    if (current) {
      current.scrollTo({
        left: current.scrollWidth - current.clientWidth,
        top: current.scrollHeight - current.clientHeight,
        behavior,
      });
    }
  }, [trigger, behavior]);

  return ref;
}
