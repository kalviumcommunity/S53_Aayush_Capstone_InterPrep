import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function StartedHead() {
  return (
    <Flex
      alignItems={"center"}
      gap={"1rem"}
      color={"white"}
      flexDirection={"column"}
    >
      <Text
        fontSize={{ base: "1.6rem", md: "1.8rem" }}
        fontFamily="Didact Gothic"
        fontWeight={900}
      >
        Signup Today
      </Text>
      <Text
        fontSize={{ base: "1.1rem", md: "1.4rem" }}
        fontFamily="Didact Gothic"
        fontWeight={900}
      >
        Choose the role which best suits you!
      </Text>
    </Flex>
  );
}

export default StartedHead;
