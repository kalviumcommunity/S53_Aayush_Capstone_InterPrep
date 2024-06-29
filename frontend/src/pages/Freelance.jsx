import { Box, Flex, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FreelanceHead from "../components/Freelance/FreelanceHead";
import axios from "axios";
import FreelanceBox from "../components/Freelance/FreelanceBox";
import { CircleLoader } from "react-spinners";

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
    >
      <Flex
        flexDirection={"column"}
        gap={"1rem"}
        p={{ base: "3", md: "8" }}
        color={"white"}
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
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              alignItems="center"
              justifyContent="center"
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
    </HStack>
  );
}

export default Freelance;
