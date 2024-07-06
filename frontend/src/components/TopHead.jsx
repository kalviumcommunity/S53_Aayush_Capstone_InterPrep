import { Box, keyframes } from "@chakra-ui/react";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const TopHead = () => {
  return (
    <Box
      p={1}
      color={"white"}
      w={"100%"}
      bg={"#1d1d1d"}
      textAlign={"center"}
      fontFamily={"Didact Gothic"}
      fontWeight={900}
      position={"relative"}
      overflow={"hidden"}
    >
      ⚠️ &nbsp; Project is under development &nbsp; ⚡️
      <Box
        position={"absolute"}
        bottom={0}
        left={0}
        w={"100%"}
        h={"1.5px"}
        bgGradient="linear-gradient(270deg, #000000, #2c2c2c, #4f4f4f, #7f7f7f, #b1b1b1, #d6d6d6)"
        backgroundSize="400% 400%"
        animation={`${gradientAnimation} 4s ease infinite`}
      />
    </Box>
  );
};

export default TopHead;
