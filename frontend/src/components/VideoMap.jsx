import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

const VideoMap = ({ src, caption, sectionRef }) => {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, {
    root: sectionRef,
    margin: "-30% 0px -30% 0px",
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(err => console.log("Video play failed:", err));
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isInView]);

  return (
    <div className="w-full h-full flex flex-col">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover rounded-2xl"
        muted
        loop
        playsInline
      />
      {caption && <p className="text-white text-center mt-2">{caption}</p>}
    </div>
  );
};

export default VideoMap;
