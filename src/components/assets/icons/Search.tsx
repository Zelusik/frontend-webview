import React from "react";
import { Path, Svg } from "react-native-svg";

const Search = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.5 17C13.9183 17 17.5 13.4183 17.5 9C17.5 4.58172 13.9183 1 9.5 1C5.08172 1 1.5 4.58172 1.5 9C1.5 13.4183 5.08172 17 9.5 17Z"
        stroke="#202330"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 19L15 15"
        stroke="#202330"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Search;
