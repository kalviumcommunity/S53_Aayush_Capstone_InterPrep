import React, { useEffect, useState } from 'react'
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import JobInfoBox from '../components/JobInfo/JobInfoBox';
import JobDescripion from '../components/JobInfo/JobDescripion';
import JobCompany from '../components/JobInfo/JobCompany';
import axios from 'axios';
import { toast } from 'sonner';
import { CircleLoader } from 'react-spinners';

function JobInfo() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    setTimeout(()=>{
    window.scrollTo(0, 0);
      axios.get(`${import.meta.env.VITE_server}jobs/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Some Error Occured, redirecting back!");
        setTimeout(() => {
          navigate('/jobs');
        }, 2000);
      });
    }, 1000)
    }, [id, navigate]);

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
        <Box
          pb={{ base: "1", md: "4" }}
          display="flex"
          flexDirection="column"
          gap={5}
        >
          {data === undefined ? (
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
            <>
              <JobInfoBox data={data} />
              <JobDescripion desc={data.description} />
              <JobCompany data={data.company.description} />
            </>
          )}
        </Box>
      </Flex>
    </HStack>
  );
}

export default JobInfo;
