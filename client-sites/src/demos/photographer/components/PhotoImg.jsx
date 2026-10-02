import { sizes } from "../data";

// Helper for responsive photo loading
export default function PhotoImg({ p, eager, large, className = "", style = {} }) {
  const ratio = p.w && p.h ? { aspectRatio: `${p.w} / ${p.h}` } : {};
  const src = (w) => `/photos/${p.id}-${w}.webp`;
  const fallbackSrc = p.remote || src(large ? 1600 : 960);

  return (
    <img
      className={className}
      src={fallbackSrc}
      srcSet={
        p.remote ? undefined : sizes.map((w) => `${src(w)} ${w}w`).join(", ")
      }
      sizes={
        p.remote
          ? undefined
          : large
            ? "100vw"
            : "(min-width: 1280px) 380px, (min-width: 768px) 45vw, 95vw"
      }
      width={p.w}
      height={p.h}
      alt={p.title}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{
        ...ratio,
        ...(p.lqip
          ? { backgroundImage: `url(${p.lqip})`, backgroundSize: "cover" }
          : {}),
        ...style,
      }}
    />
  );
}
