import React from "react";
import { Box, Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";

function JobCompany({ data }) {
  console.log(data);
  return (
    <Card
      direction={{ base: "column" }}
      variant="elevated"
      bg={"#FFFFFF15"}
      color={"#FFFFFF"}
      p={{ base: "1", sm: "2" }}
      width={{ md: "75vw" }}
      borderRadius={"12px"}
    >
      <CardBody>
        <Heading
          fontWeight={900}
          fontFamily={"Didact Gothic"}
          fontSize={{ base: "1.15rem", md: "1.4rem" }}
        >
          About the Company
        </Heading>
        <Flex direction={"column"} gap={5} pt={5} pl={5}>
          <Box>
            <Heading
              fontFamily={"Didact Gothic"}
              fontSize={{ base: "1.1rem", md: "1.3rem" }}
            >
              Culture
            </Heading>
            <Text
              py="2"
              fontFamily={"Didact Gothic"}
              fontSize={{ base: "1rem", md: "1.1rem" }}
            >
              {data.culture}
            </Text>
          </Box>
          <Box>
            <Heading
              fontFamily={"Didact Gothic"}
              fontSize={{ base: "1.1rem", md: "1.3rem" }}
            >
              Values
            </Heading>
            <Text
              py="2"
              fontFamily={"Didact Gothic"}
              fontSize={{ base: "1rem", md: "1.rem" }}
            >
              {data.values}
            </Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default JobCompany;
