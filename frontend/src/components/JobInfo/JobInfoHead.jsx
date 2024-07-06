import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function JobInfoHead() {
  return (
    <>
      <Box pb={{ base: "1", md: "3" }}>
        <Breadcrumb separator={<ChevronRightIcon color="gray.300" />}>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/"
              fontFamily="Didact Gothic"
              fontSize={{ base: "0.9rem", md: "1.1rem" }}
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

          <BreadcrumbItem>
            <BreadcrumbLink
              fontFamily="Didact Gothic"
              fontSize={{ base: "0.9rem", md: "1.1rem" }}
              as={Link}
              to="/jobs"
            >
              Jobs
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              fontFamily="Didact Gothic"
              fontSize={{ base: "0.95rem", md: "1.15rem" }}
              fontWeight={900}
            >
              Info
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
    </>
  );
}

export default JobInfoHead;
