import {
  useEffect,
  useState,
  useRef,
  type RefObject,
  type ReactNode,
  type CSSProperties,
} from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True when viewport is coarse/touch — skip custom cursor / spotlight */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => setFine(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}

export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function useReveal(
  reducedMotion: boolean,
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      el.classList.add("is-in");
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      el.classList.add("is-in");
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const isInView = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      return rect.top < vh * 0.94 && rect.bottom > vh * 0.04;
    };

    const onScroll = () => {
      if (isInView()) reveal();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) reveal();
      },
      { threshold: [0, 0.05, 0.1], rootMargin: "0px 0px -2% 0px" },
    );

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return ref;
}

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  reducedMotion,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "header" | "li" | "article" | "blockquote" | "ul" | "ol";
  delay?: number;
  reducedMotion: boolean;
}) {
  const ref = useReveal(reducedMotion);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`.trim()}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

export type MetricSpec = {
  /** Final display string, e.g. "11+" or "40" */
  display: string;
  /** Numeric value to animate toward */
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function MetricValue({
  spec,
  reducedMotion,
  active,
}: {
  spec: MetricSpec;
  reducedMotion: boolean;
  active: boolean;
}) {
  const [text, setText] = useState(spec.display);

  useEffect(() => {
    if (reducedMotion) {
      setText(spec.display);
      return;
    }
    if (!active) return;

    let frame = 0;
    const duration = 1100;
    const start = performance.now();
    setText(formatMetric(0, spec));

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = spec.value * eased;
      setText(formatMetric(current, spec));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setText(spec.display);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reducedMotion, spec.display, spec.value, spec.prefix, spec.suffix, spec.decimals]);

  return <span className="metric-value">{text}</span>;
}

function formatMetric(n: number, spec: MetricSpec): string {
  const decimals = spec.decimals ?? 0;
  const rounded =
    decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
  return `${spec.prefix ?? ""}${rounded}${spec.suffix ?? ""}`;
}