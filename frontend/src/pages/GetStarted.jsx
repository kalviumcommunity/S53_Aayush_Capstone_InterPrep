import React from "react";
import HomeNavbar from "../components/Home/HomeNavbar";
import StartedHead from "../components/GetStarted/StartedHead";
import StartedCard from "../components/GetStarted/StartedCard";
import { Flex, Text } from "@chakra-ui/react";
import StartedCards from "../components/GetStarted/StartedCards";
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <>
      <HomeNavbar />
      <StartedHead />
      <Flex
      m={10}
      alignItems={"center"}
      gap={"2rem"}
      color={"white"}
      flexDirection={"column"}
    >
      <StartedCards />
      <Text
        fontSize={{ base: "1.1rem", md: "1.2rem" }}
        fontFamily="Didact Gothic"
        color={"#999999"}
        textAlign={"center"}
        fontWeight={900}
      >
        Already have an account? <Link to={'/'}><u>Login</u></Link>
      </Text>
    </Flex>
    </>
  );
}

export default GetStarted;
