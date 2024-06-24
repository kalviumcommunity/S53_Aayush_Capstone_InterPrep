import React from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

function JobDescripion({ desc }) {
  console.log(desc);
  const JobDesc = [
    {name: 'Requirements', exp: desc.requirements},
    {name: 'Responsibilities', exp: desc.responsibilties},
    {name: 'Process', exp: desc.process},
  ]
  return (
    <Card
      direction={{ base: "column" }}
      variant="elevated"
      bg={"#FFFFFF15"}
      color={"#FFFFFF"}
      p={{ base: "1", sm: "2" }}
      width={{'lg':'75vw'}}
      borderRadius={"12px"}
    >
      <CardBody>
        <Heading
        fontWeight={900}
          fontFamily={"Didact Gothic"}
          fontSize={{ base: "1.15rem", md: "1.4rem" }}
        >
          Job Description
        </Heading>
        <Flex direction={"column"} gap={5} pt={5} pl={5}>
          {JobDesc.map((data, i)=>(
            <Box key={i}>
            <Heading
              fontFamily={"Didact Gothic"}
              fontSize={{ base: "1.1rem", md: "1.3rem" }}
            >
              {data.name}
            </Heading>
            <Text
              py="2"
              fontFamily={"Didact Gothic"}
              fontSize={{ base: "1rem", md: "1.1rem" }}
            >
              {data.exp == undefined || null ? "Yet to announced!" : data.exp}
            </Text>
          </Box>
          ))}
        </Flex>
      </CardBody>
    </Card>
  );
}

export default JobDescripion;
