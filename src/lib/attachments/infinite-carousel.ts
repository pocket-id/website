import type { Attachment } from "svelte/attachments";

type InfiniteCarouselOptions = {
  durationMs: number | ((viewport: HTMLDivElement) => number);
};

export function infiniteCarousel({
  durationMs,
}: InfiniteCarouselOptions): Attachment<HTMLDivElement> {
  return (viewport) => {
    const page = viewport.querySelector<HTMLElement>("[data-carousel-page]");

    if (!page) return;

    const controller = new AbortController();
    const { signal } = controller;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let animationFrame = 0;
    let resetFrame = 0;
    let previousFrameTime = 0;
    let pointerDown = false;

    const pageWidth = () => page.offsetWidth;
    const currentDuration = () =>
      typeof durationMs === "function" ? durationMs(viewport) : durationMs;

    const normalizePosition = () => {
      if (reducedMotion.matches) return;

      const width = pageWidth();

      if (viewport.scrollLeft >= page.offsetLeft + width) {
        viewport.scrollLeft -= width;
      } else if (viewport.scrollLeft <= page.offsetLeft - width) {
        viewport.scrollLeft += width;
      }
    };

    const resetPosition = () => {
      viewport.scrollLeft = reducedMotion.matches ? 0 : page.offsetLeft;
    };

    const scheduleReset = () => {
      cancelAnimationFrame(resetFrame);
      resetFrame = requestAnimationFrame(resetPosition);
    };

    const releaseFocus = () => {
      const activeElement = document.activeElement;

      if (
        activeElement instanceof HTMLElement &&
        viewport.contains(activeElement)
      ) {
        activeElement.blur();
      }
    };

    const animate = (frameTime: number) => {
      if (
        previousFrameTime &&
        !reducedMotion.matches &&
        !pointerDown &&
        !viewport.matches(":hover") &&
        !viewport.contains(document.activeElement)
      ) {
        const elapsed = Math.min(frameTime - previousFrameTime, 100);

        viewport.scrollLeft += (pageWidth() / currentDuration()) * elapsed;
        normalizePosition();
      }

      previousFrameTime = frameTime;
      animationFrame = requestAnimationFrame(animate);
    };

    viewport.addEventListener("scroll", normalizePosition, {
      passive: true,
      signal,
    });
    viewport.addEventListener("pointerdown", () => (pointerDown = true), {
      passive: true,
      signal,
    });
    window.addEventListener("pageshow", releaseFocus, { signal });
    window.addEventListener("pointerup", () => (pointerDown = false), {
      signal,
    });
    window.addEventListener("pointercancel", () => (pointerDown = false), {
      signal,
    });
    reducedMotion.addEventListener("change", scheduleReset, { signal });

    scheduleReset();
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resetFrame);
      controller.abort();
    };
  };
}
