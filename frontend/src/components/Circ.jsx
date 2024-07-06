import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

function Circ({ color, width, blur, right, left, top, bottom, zind, sec }) {
  return (
    <Box
      width={{ base: 0, lg: width }}
      height={width}
      background={color}
      borderRadius={"100%"}
      filter={blur}
      position={"absolute"}
      zIndex={zind ? zind : "0"}
      top={top}
      bottom={bottom}
      right={right}
      left={left}
      animation={`${pulse} ${sec ? sec : 3}s infinite ease-in`}
    >
      &nbsp;
    </Box>
  );
}

export default Circ;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
