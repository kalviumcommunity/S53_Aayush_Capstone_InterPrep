import React, { memo } from "react";
import { Box, Card, CardBody, Divider, Flex, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import TopComponent from "../components/Mainpage/TopComponent";
import MidComponent from "../components/Mainpage/MidComponent";

function Mainpage() {
  return (
    <HStack
      display={"flex"}
      justifyContent={{ base: "center", md: "flex-start" }}
      position="relative"
    >
      <Flex
        flexDirection={"column"}
        p={{ base: "3", md: "8" }}
        color={"white"}
        width={"100%"}
        gap={8}
      >
        <TopComponent />
        <Divider borderRadius={"30px"} display={{base:"block", md:"none"}} opacity={'30%'}/>
        <MidComponent />
      </Flex>
    </HStack>
  );
}

export default memo(Mainpage);
