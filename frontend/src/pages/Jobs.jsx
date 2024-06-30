import React, { useEffect, useState } from "react";
import { ChevronRightIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import JobBox from "../components/Jobs/JobBox";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import { Link } from "react-router-dom";
import JobsHead from "../components/Jobs/JobsHead";

function Jobs() {
  const [jobData, setJobData] = useState([]);
  const [find, setFind] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);

  useEffect(() => {
    let timeoutId;
  
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  
    timeoutId = setTimeout(() => {
      fetchData();
    }, 500);
  
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [find, typingTimeout]);

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_server}jobs?filter=${find}`)
      .then((response) => {
        setJobData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFind = (e) => {
    setFind(e.target.value);
  };

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
        <JobsHead />
        <Box pb={{ base: "1", md: "4" }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              fontFamily="Didact Gothic"
              placeholder="Search for Opportunities"
              borderRadius="10px"
              onChange={handleFind}
              w={{ base: "18rem", md: "28rem" }}
            />
          </InputGroup>
        </Box>
        <Box
          pb={{ base: "1", md: "4" }}
          display="flex"
          flexDirection="column"
          gap={10}
        >
          {jobData.length === 0 ? (
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
            jobData.map((e, i) => {
              return <JobBox data={e} key={i} />;
            })
          )}
        </Box>
      </Flex>
    </HStack>
  );
}

export default Jobs;
