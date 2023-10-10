import React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

const Warn = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_2931_4202)">
        <Path
          d="M12 9V12M12 15V15.01"
          stroke="#E14646"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5.00001 18.9995H19C19.3263 18.9972 19.6471 18.9151 19.9344 18.7604C20.2217 18.6057 20.4668 18.383 20.6482 18.1118C20.8297 17.8406 20.942 17.5291 20.9755 17.2045C21.0089 16.8799 20.9624 16.552 20.84 16.2495L13.74 3.99953C13.567 3.68693 13.3135 3.42636 13.0058 3.24491C12.698 3.06347 12.3473 2.96777 11.99 2.96777C11.6327 2.96777 11.282 3.06347 10.9743 3.24491C10.6665 3.42636 10.413 3.68693 10.24 3.99953L3.14001 16.2495C3.01995 16.5451 2.97234 16.8651 3.00116 17.1828C3.02997 17.5006 3.13438 17.8068 3.30566 18.0759C3.47694 18.3451 3.71012 18.5694 3.98573 18.73C4.26135 18.8907 4.5714 18.9831 4.89001 18.9995"
          stroke="#E14646"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2931_4202">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Warn;
