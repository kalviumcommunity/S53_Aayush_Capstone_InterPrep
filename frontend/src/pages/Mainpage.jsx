import React, { memo } from "react";
import { Flex, HStack } from "@chakra-ui/react";
import TopComponent from "../components/Mainpage/TopComponent";

function Mainpage() {
  return (
    <HStack
      display={"flex"}
      justifyContent={{ base: "center", md: "flex-start" }}
      position="relative"
    >
      <Flex
        flexDirection={"column"}
        p={{ base: "3", md: "10" }}
        color={"white"}
        width={"100%"}
      >
        <TopComponent />
      </Flex>
    </HStack>
  );
}

export default memo(Mainpage);
