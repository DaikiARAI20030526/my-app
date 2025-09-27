// app/hooks/useSubtitleObserver.js
import { useState, useEffect } from "react";

export default function useSubtitleObserver(subtitleIds, pageTitles) {
  const [currentTitle, setCurrentTitle] = useState(pageTitles[0] || "");

  useEffect(() => {
    if (!subtitleIds || subtitleIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = subtitleIds.indexOf(entry.target.id);
            if (idx !== -1) {
              setCurrentTitle(pageTitles[idx]);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-200px 0px 0px 0px", // 上から200px下が基準
        threshold: 0,
      }
    );

    subtitleIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [subtitleIds, pageTitles]);

  return currentTitle;
}
