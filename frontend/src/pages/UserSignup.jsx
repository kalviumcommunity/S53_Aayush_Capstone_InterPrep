import React from "react";
import Footer from "../components/Footer/Footer";
import { Box, Flex, Image } from "@chakra-ui/react";
import Logo2 from "../assets/Logo2.png";
import UsSignup from "../components/Signup/User/UsSignup";

function UserSignup() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Flex justifyContent={"center"} m={5}>
        <Image src={Logo2} width="70px" m={5} />
      </Flex>
      <Box flex={1} mb={10}>
        <UsSignup />
      </Box>
      <Footer />
    </div>
  );
}

export default UserSignup;
