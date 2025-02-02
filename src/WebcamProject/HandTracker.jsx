import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/hand-pose-detection";
import Webcam from "react-webcam";

const HandTracker = ({ setGesture }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const model = await handpose.createDetector(
        handpose.SupportedModels.MediaPipeHands,
        {
          runtime: "mediapipe",
          modelType: "full",
          solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
        }
      );

      const detect = async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;
          const predictions = await model.estimateHands(video);

          if (predictions.length > 0) {
            const keypoints = predictions[0].keypoints;

            // Function to check if a finger is raised
            const isFingerRaised = (tipIndex, dipIndex) =>
              keypoints[tipIndex].y < keypoints[dipIndex].y;

            // Check for individual fingers
            const isIndexFingerRaised = isFingerRaised(8, 6);
            const isMiddleFingerRaised = isFingerRaised(12, 10);

            if (!isIndexFingerRaised && !isMiddleFingerRaised) {
              setGesture("fist");
            } else if (isIndexFingerRaised && !isMiddleFingerRaised) {
              setGesture("one_finger");
            } else if (isIndexFingerRaised && isMiddleFingerRaised) {
              setGesture("two_fingers");
            } else {
              setGesture("open_palm");
            }
          }
        }
      };

      const interval = setInterval(detect, 100);
      return () => clearInterval(interval);
    };

    loadModel();
  }, [setGesture]);

  return <Webcam ref={webcamRef} style={{ width: "50%", height: "auto" }} />;
};

export default HandTracker;
