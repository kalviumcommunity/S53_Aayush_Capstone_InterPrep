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
import React, { useEffect, useState } from "react";
import JobBox from "../JobBox";
import axios from "axios";

function Jobs() {

  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:8080/jobs")
        .then((data) => {
          setJobData(data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, []);

  return (
    <HStack
    display={'flex'}
    justifyContent={{base:'center', md:'flex-start'}}
    backgroundColor={'#000'}
    >
      <Flex
        flexDirection={"column"}
        gap={"1rem"}
        p={{ base: "3", md: "8" }}
        color={"white"}
      >
        <Box pb={{base:"1", md:"3"}}>
          <Breadcrumb separator={<ChevronRightIcon color="gray.300" />}>
            <BreadcrumbItem>
              <BreadcrumbLink
                fontFamily="Didact Gothic"
                fontSize={{ base: "0.9rem", md: "1.1rem" }}
                href="#"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink
                fontFamily="Didact Gothic"
                fontSize={{ base: "0.9rem", md: "1.1rem" }}
                href="/browse"
              >
                Browse
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink
                href="#"
                fontFamily="Didact Gothic"
                fontSize={{ base: "0.95rem", md: "1.15rem" }}
                fontWeight={900}
              >
                Jobs
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box pb={{base:"1", md:"3"}}>
            <Text fontSize={{base:"1.2rem", md:"2rem"}}>All Jobs</Text>
        </Box>
        <Box pb={{base:"1", md:"4"}}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input type="text" fontFamily="Didact Gothic" placeholder="Search for Opportunities" borderRadius="10px" w={{base:"18rem", md:"28rem"}}/>
          </InputGroup>
        </Box>
        <Box pb={{ base: "1", md: "4" }} display="flex" flexDirection="column" gap={10}>
  {jobData.length === 0 ? (
    <span>hey</span>
  ) : (
    jobData.map((e, i) => {
      return <JobBox data={jobData[i]} key={i} />;
    })
  )}
</Box>

      </Flex>
    </HStack>
  );
}

export default Jobs;
