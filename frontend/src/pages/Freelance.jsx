import { Box, Flex, HStack } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import FreelanceHead from "../components/Freelance/FreelanceHead";
import axios from "axios";
import FreelanceBox from "../components/Freelance/FreelanceBox";
import { CircleLoader } from "react-spinners";
import Circ from "../components/Circ";

function Freelance() {
  const [gigData, setGigData] = useState([]);

  useEffect(() => {
    axios
      .get("https://skill-forge-backend.rikhiltaneja.com/tasks/all")
      .then((res) => {
        setGigData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <HStack
      display={"flex"}
      justifyContent={{ base: "center", md: "flex-start" }}
      backgroundColor={"#000"}
      position="relative"
    >
      <Flex
        flexDirection={"column"}
        gap={"1rem"}
        p={{ base: "3", md: "8" }}
        color={"white"}
        width={"100%"}
      >
        <FreelanceHead />
        <Box
          pb={{ base: "1", md: "4" }}
          display="flex"
          gap={10}
          flexWrap={"wrap"}
        >
          {gigData.length === 0 ? (
            <Flex
              position={"absolute"}
              left={{ base: "45%", md: "40%" }}
              top={"40vh"}
            >
              <CircleLoader color="white" />
            </Flex>
          ) : (
            gigData.map((e, i) => {
              return <FreelanceBox data={e} key={i} />;
            })
          )}
        </Box>
      </Flex>
      <Circ
        color={"#984382"}
        right={-20}
        top={"70vh"}
        width={"11rem"}
        blur={"blur(95px)"}
      />
    </HStack>
  );
}

export default memo(Freelance);
