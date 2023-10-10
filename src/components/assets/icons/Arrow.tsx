import React from "react";
import { Defs, G, Path, Svg, Rect, ClipPath } from "react-native-svg";

const Arrow = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_2931_7966)">
        <Path
          d="M19 12L5 12"
          stroke="#202330"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11 18L5 12"
          stroke="#202330"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11 6L5 12"
          stroke="#202330"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2931_7966">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Arrow;
