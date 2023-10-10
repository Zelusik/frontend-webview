import React from "react";
import { Defs, G, Path, Svg, ClipPath, Rect } from "react-native-svg";

const Chevron = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_949_10493)">
        <Path
          d="M9 18L15 12L9 6"
          stroke="#4C5061"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_949_10493">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Chevron;
