import React, { useRef } from "react";

const MediaMap = ({ media, caption }) => {
  // media can be an array of objects: { type: "gif" | "video", src: "..." }
  const mediaArray = Array.isArray(media) ? media : [media];

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 space-y-4">
      {mediaArray.map((item, idx) => {
        const mediaRef = useRef(null);

        const handleHover = () => {
          const el = mediaRef.current;
          if (!el) return;

          if (item.type === "gif") {
            // Restart GIF on hover
            const currentSrc = el.src;
            el.src = "";
            el.src = currentSrc;
          } else if (item.type === "video") {
            // Play video from start on hover
            el.currentTime = 0;
            el.play().catch(() => {});
          }
        };

        return (
          <div
            key={idx}
            className="w-full flex flex-col items-center"
            onMouseEnter={handleHover}
          >
            {item.type === "gif" ? (
              <>
                <link rel="preload" as="image" href={item.src} />
                <img
                  ref={mediaRef}
                  src={item.src}
                  alt={`Media ${idx}`}
                  className="w-full h-auto max-h-[300px] object-contain rounded-lg mb-2 transition-transform duration-300 hover:scale-105"
                />
              </>
            ) : (
              <video
                ref={mediaRef}
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[300px] object-contain rounded-lg mb-2 transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        );
      })}

      {caption && (
        <p className="text-gray-300 text-sm font-medium text-center mt-2">
          {caption}
        </p>
      )}
    </div>
  );
};

export default MediaMap;
