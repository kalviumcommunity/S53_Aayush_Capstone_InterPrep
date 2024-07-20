import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import MiniJobCard from "./MiniJobCard";
import { CircleLoader } from "react-spinners";
import axios from "axios";

function MidComponent() {
  const [miniJob, setMiniJob] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_server}jobs`)
      .then((res) => {
        setMiniJob(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const lastFourJobs = miniJob.slice(-4);
  console.log(lastFourJobs);

  return (
    <Flex
      gap={"5"}
      direction={{ base: "column" }}
      width={{ base: "100%", xl: "90%" }}
    >
      <Box
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "center" }}
        gap={{ base: "3", sm: "0" }}
      >
        <Text
          fontSize={{ base: "1.5rem", md: "1.6rem" }}
          fontFamily="Didact Gothic"
          fontWeight={900}
        >
          Latest Job Openings
        </Text>
        <Link to={"/jobs"}>
          <Text
            fontSize={{ base: "1.2rem" }}
            fontFamily="Didact Gothic"
            fontWeight={300}
            textDecoration={"underline"}
          >
            See All Openings
          </Text>
        </Link>
      </Box>
      <Box
        display={"flex"}
        gap={8}
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={"center"}
      >
        {lastFourJobs.length === 0 ? (
        <Center w="100%" alignItems="center"
              justifyContent="center">
          <CircleLoader color="white"/>
        </Center>
      ) : (
        lastFourJobs.map((e, i) => <MiniJobCard key={i} job={e} />)
      )}
      </Box>
    </Flex>
  );
}

export default MidComponent;
