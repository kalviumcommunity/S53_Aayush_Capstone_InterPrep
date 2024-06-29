import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function FreelanceHead() {
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
              Gigs
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box pb={{ base: "1", md: "3" }}>
        <Text fontSize={{ base: "1.2rem", md: "2rem" }} 
        fontFamily="Didact Gothic" fontWeight={900}>
          All Freelance Gigs
        </Text>
      </Box>
    </>
  );
}

export default FreelanceHead;
