import React, { useEffect, useState } from "react";
import { ChevronRightIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import InterviewerBox from "../components/Interviewer/InterviewerBox";
import { Link } from "react-router-dom";

function Interviewers() {
  const [ interviewers, setInterviewers] = useState([])
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`http://localhost:8080/interviewer/home`)
        .then((response) => {
          setInterviewers(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000);
  }, []);
  console.log(interviewers);
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
        <Box pb={{ base: "1", md: "3" }}>
          <Breadcrumb separator={<ChevronRightIcon color="gray.300" />}>
            <BreadcrumbItem>
              <BreadcrumbLink
                fontFamily="Didact Gothic"
                fontSize={{ base: "0.9rem", md: "1.1rem" }}
                as={Link}
                to="/"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink
                fontFamily="Didact Gothic"
                fontSize={{ base: "0.9rem", md: "1.1rem" }}
                as={Link}
                to="/browse"
              >
                Browse
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink
                fontFamily="Didact Gothic"
                fontSize={{ base: "0.95rem", md: "1.15rem" }}
                fontWeight={900}
              >
                Interviewers
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box pb={{ base: "1", md: "3" }}>
          <Text fontSize={{ base: "1.2rem", md: "2rem" }}>All Interviewers</Text>
        </Box>
        <Box pb={{ base: "1", md: "4" }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              fontFamily="Didact Gothic"
              placeholder="Search for Interviewer"
              borderRadius="10px"
              w={{ base: "18rem", md: "28rem" }}
            />
          </InputGroup>
        </Box>
          <Flex wrap={'wrap'} gap={10} justifyContent={{base:'center', md:'flex-start'}}>
            <InterviewerBox />
            <InterviewerBox />
            <InterviewerBox />
            <InterviewerBox />
            <InterviewerBox />
            <InterviewerBox />
            <InterviewerBox />
            <InterviewerBox />
          </Flex>
      </Flex>
    </HStack>
  )
}

export default Interviewers