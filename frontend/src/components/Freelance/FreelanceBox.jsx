import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { CiBag1 } from "react-icons/ci";
import { MdCorporateFare } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

function FreelanceBox({ data }) {
  function openTo(id) {
    window.open(`https://skillforge.rikhiltaneja.com/task/details/${id}`);
  }

  return (
    <Card
      variant="elevated"
      bg={"#FFFFFF15"}
      color={"#FFFFFF"}
      p={{ base: "1", sm: "2" }}
      borderRadius={"12px"}
      width={{ md: "27vw", lg: "30vw", xl: "33vw" }}
    >
      <CardBody height={"100%"}>
        <Stack
          mt="6"
          spacing="3"
          justifyContent={"space-between"}
          alignContent={"space-between"}
        >
          <Heading
            size="md"
            fontFamily={"Didact Gothic"}
            fontWeight={"bold"}
            fontSize={{ base: "1.2rem", md: "1.5rem" }}
          >
            {data.title.length > 30
              ? data.title.substr(0, 30) + "..."
              : data.title}
          </Heading>

          <Text
            fontFamily={"Didact Gothic"}
            fontWeight={"bold"}
            fontSize={{ base: "0.9rem", md: "1rem" }}
          >
            {data.description.length > 200
              ? data.description.substr(0, 200) + "..."
              : data.description}
          </Text>
          <Flex mt={1} mb={2} gap={4} wrap={"wrap"}>
            {data.skills.map((tag, index) => (
              <Tag
                key={index}
                size={"sm"}
                colorScheme="whiteAlpha"
                bg={"#FFFFFF20"}
                fontFamily={"Didact Gothic"}
                fontWeight={"bold"}
              >
                {tag}
              </Tag>
            ))}
          </Flex>
          <StatGroup width={"95%"}>
            <Stat display={"flex"} gap={1} justifyContent={"center"}>
              <StatLabel
                fontFamily={"Didact Gothic"}
                color={"gray"}
                display={"flex"}
                gap={"0.2vmin"}
                fontSize={{ base: "0.9rem", sm: "1.2rem" }}
                fontWeight={"900"}
                alignItems={"center"}
              >
                <CiBag1 />
                Bounty
              </StatLabel>
              <StatNumber
                fontFamily={"Didact Gothic"}
                fontSize={{ base: "0.8rem", sm: "1.2rem" }}
              >
                {data.bounty} INR
              </StatNumber>
            </Stat>
            <Stat display={"flex"} justifyContent={"center"}>
              <StatLabel
                fontFamily={"Didact Gothic"}
                color={"gray"}
                display={"flex"}
                fontWeight={"900"}
                gap={"0.2vmin"}
                fontSize={{ base: "0.9rem", sm: "1.2rem" }}
                alignItems={"center"}
              >
                <MdCorporateFare />
                Firm
              </StatLabel>
              <StatNumber
                fontFamily={"Didact Gothic"}
                fontSize={{ base: "0.8rem", sm: "1.2rem" }}
              >
                {data.company.name}
              </StatNumber>
            </Stat>
            <Stat display={"flex"} justifyContent={"center"}>
              <StatLabel
                fontFamily={"Didact Gothic"}
                color={"gray"}
                display={"flex"}
                gap={"0.2vmin"}
                fontWeight={"900"}
                fontSize={{ base: "0.9rem", sm: "1.2rem" }}
                alignItems={"center"}
              >
                <FaRegCalendarCheck />
                Deadline
              </StatLabel>
              <StatNumber
                fontFamily={"Didact Gothic"}
                fontSize={{ base: "0.8rem", sm: "1.2rem" }}
              >
                {new Date(data.deadline).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  timeZone: "Asia/Kolkata",
                })}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Stack>
      </CardBody>
      <CardFooter display={'flex'} justifyContent={'center'} p={5}>
      <Button
            fontSize={"16px"}
            width={"140px"}
            height="40px"
            color={"white"}
            borderRadius={12}
            bg={"#FFFFFF20"}
            onClick={() => openTo(data._id)}
            href={`https://skillforge.rikhiltaneja.com/task/details/${data._id}`}
            borderBottom={"2px solid white"}
            transition={"all 0.3s"}
            _hover={{
              boxShadow: "0 6px 10px 0 #ffffff60",
            }}
            _active={{
              bg: "#FFFFFF10",
            }}
            fontFamily="Didact Gothic"
          >
            Know more!
            <Icon
              fontSize="1rem"
              as={FaArrowRightLong}
              cursor={"pointer"}
              ml={2}
            />
          </Button>
      </CardFooter>
    </Card>
  );
}

export default FreelanceBox;
