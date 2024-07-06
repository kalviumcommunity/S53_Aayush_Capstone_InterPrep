import React, { useEffect, useState } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import JobInfoBox from "../components/JobInfo/JobInfoBox";
import JobDescripion from "../components/JobInfo/JobDescripion";
import JobCompany from "../components/JobInfo/JobCompany";
import axios from "axios";
import JobInfoHead from "../components/JobInfo/JobInfoHead";
import { toast } from "sonner";
import { CircleLoader } from "react-spinners";
import Circ from "../components/Circ";

function JobInfo() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      axios
        .get(`${import.meta.env.VITE_server}jobs/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Some Error Occured, redirecting back!");
          setTimeout(() => {
            navigate("/jobs");
          }, 2000);
        });
    }, 1000);
  }, [id, navigate]);

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
        width="100%"
      >
        <JobInfoHead />
        <Box
          pb={{ base: "1", md: "4" }}
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          gap={5}
        >
          {data === undefined ? (
            <Flex
              position={"absolute"}
              left={{ base: "45%", md: "40%" }}
              top={"40vh"}
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

export default JobInfo;
