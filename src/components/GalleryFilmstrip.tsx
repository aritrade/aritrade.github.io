import { useCallback, useEffect, useId, useRef, useState } from "react";
import { gallery, type GalleryItem } from "../data/content";

type Props = {
  reducedMotion: boolean;
};

export function GalleryFilmstrip({ reducedMotion }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<GalleryItem | null>(null);
  const titleId = useId();

  const open = useCallback((item: GalleryItem) => {
    setActive(item);
  }, []);

  const close = useCallback(() => {
    setActive(null);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active) {
      if (!dialog.open) dialog.showModal();
      queueMicrotask(() => closeBtnRef.current?.focus());
    } else if (dialog.open) {
      dialog.close();
    }
  }, [active]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setActive(null);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const track = reducedMotion ? gallery : [...gallery, ...gallery];

  return (
    <>
      <div
        className={`filmstrip ${reducedMotion ? "is-static" : "is-moving"}`}
        aria-label="Photo filmstrip"
      >
        <div className="filmstrip-track">
          {track.map((item, i) => {
            const offset = i % 3;
            const duplicate = !reducedMotion && i >= gallery.length;
            return (
              <button
                key={`${item.src}-${i}`}
                type="button"
                className={`film-frame aspect-${item.aspect} offset-${offset}`}
                onClick={() => open(item)}
                aria-label={duplicate ? undefined : `Open photo: ${item.alt}`}
                aria-hidden={duplicate || undefined}
                tabIndex={duplicate ? -1 : 0}
              >
                <img
                  src={item.src}
                  alt={duplicate ? "" : item.alt}
                  loading={duplicate ? "lazy" : "eager"}
                  decoding="async"
                />
                <span className="film-label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-labelledby={titleId}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {active ? (
          <div className="lightbox-inner">
            <div className="lightbox-bar">
              <p id={titleId} className="lightbox-title">
                {active.label}
              </p>
              <button
                ref={closeBtnRef}
                type="button"
                className="lightbox-close"
                onClick={close}
              >
                Close
              </button>
            </div>
            <img src={active.src} alt={active.alt} />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
