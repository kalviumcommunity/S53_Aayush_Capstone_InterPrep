import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function StartedCard({ data }) {
  const navigate = useNavigate();
  return (
    <Link to={data.to}>
      <Card
        direction={{ base: "column", lg: "row" }}
        variant="elevated"
        bg={"#FFFFFF15"}
        color={"#FFFFFF"}
        p={{ base: "1", sm: "2" }}
        borderRadius={"12px"}
        width={{ base: "80vw", md: "50vw" }}
        transition={"all 0.6s"}
        _hover={{
          boxShadow: "0px 0px 8px 0 #ffffff50",
          bg: "#FFFFFF12"
        }}
      >
        <Flex justifyContent={"center"}>
          <Icon fontSize="8rem" as={data.icon} m={{ base: "2", md: "5" }} />
        </Flex>
        <Stack>
          <CardBody p={5}>
            <Heading
              size="md"
              fontFamily={"Didact Gothic"}
              fontSize={{ base: "1.25rem", md: "1.45rem" }}
            >
              {data.name}
            </Heading>
            <Text
              mt={2}
              fontFamily={"Didact Gothic"}
              fontSize={{ base: "1rem", md: "1.05rem" }}
            >
              {data.desc}
            </Text>

            <CardFooter p={2}>
              <Icon
                fontSize={{ base: "1.4rem", md: "1.6rem" }}
                as={FaArrowRightLong}
                cursor={"pointer"}
                position={"absolute"}
                bottom={5}
                right={7}
                transition={"all 0.3s"}
                _hover={{
                  transform: "translate(4px)",
                }}
              />
            </CardFooter>
          </CardBody>
        </Stack>
      </Card>
    </Link>
  );
}

export default StartedCard;
