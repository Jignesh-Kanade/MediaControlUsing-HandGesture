import React, { useRef, useEffect } from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ gesture }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) return;

    // Perform actions based on gestures
    if (gesture === "fist") {
      const player = playerRef.current.getInternalPlayer();
      player.getPlayerState().then((state) => {
        if (state === 1) {
          player.pauseVideo(); // Pause video if playing
        } else {
          player.playVideo(); // Play video if paused
        }
      });
    } else if (gesture === "one_finger") {
      const player = playerRef.current.getInternalPlayer();
      player.getCurrentTime().then((currentTime) => {
        player.seekTo(currentTime + 10, true); // Fast-forward 10 seconds
      });
    } else if (gesture === "two_fingers") {
      const player = playerRef.current.getInternalPlayer();
      player.getCurrentTime().then((currentTime) => {
        player.seekTo(currentTime - 10, true); // Rewind 10 seconds
      });
    }
  }, [gesture]);

  return (
    <YouTube
      ref={playerRef}
      videoId="VeWdk4D_xYs" // Replace with the YouTube video ID
      opts={{
        height: "390",
        width: "640",
        playerVars: {
          autoplay: 1, // Autoplay the video
          controls: 1, // Show player controls
        },
      }}
    />
  );
};

export default YouTubePlayer;
