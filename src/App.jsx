import React, { useState } from "react";
import HandTracker from "./WebcamProject/HandTracker";
import YouTubePlayer from "./WebcamProject/YouTubePlayer";
const App = () => {
  const [gesture, setGesture] = useState("");

  return (
    <div>
      <HandTracker setGesture={setGesture} />
      <YouTubePlayer gesture={gesture} />
    </div>
  );
};

export default App;
