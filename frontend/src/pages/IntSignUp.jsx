import React from "react";
import Footer from "../components/Footer/Footer";
import { Flex, Image } from "@chakra-ui/react";
import Logo2 from "../assets/Logo2.png";
import InterviewSignup from "../components/Signup/Interviewer/InterviewSignup";

function IntSignUp() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Flex justifyContent={"center"} m={5}>
        <Image src={Logo2} width="70px" m={5} />
      </Flex>
      <div style={{ flex: 1 }}>
        <InterviewSignup />
      </div>
      <Footer />
    </div>
  );
}

export default IntSignUp;
