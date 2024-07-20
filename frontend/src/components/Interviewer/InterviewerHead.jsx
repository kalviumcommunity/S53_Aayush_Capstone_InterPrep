import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon, Search2Icon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function InterviewerHead() {
  return (
    <>
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
              to="/dashboard"
            >
              Dashboard
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
    </>
  );
}

export default InterviewerHead;
