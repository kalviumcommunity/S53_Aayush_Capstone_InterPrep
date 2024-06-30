import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";

function InterviewerBox({ data }) {
  const tags = data.mastery;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant="elevated"
      bg={"#FFFFFF15"}
      color={"#FFFFFF"}
      p={{ base: "1", sm: "2" }}
      borderRadius={"12px"}
      width={{ lg: "75vw" }}
    >
      <Flex justifyContent={"center"}>
        <Image
          w={{ base: "100%", sm: "250px", md: "300px" }}
          display={{ base: "block", sm: "none", xl: "block" }}
          h={"250px"}
          src={
            data.image
          }
          alt="Interviwer Picture"
          p={5}
          borderRadius={"30px"}
        />
      </Flex>
      <Stack w={'100%'}>
        <CardBody p={4} display={'flex'} flexDirection={'column'}  justifyContent={'space-around'}>
          <Flex
            size="md"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text
              fontFamily={"Didact Gothic"}
              fontWeight={"bold"}
              fontSize={{ base: "1.4rem", sm: "1.5rem" }}
            >
              {data.name}
            </Text>
            <Text
              fontFamily={"Didact Gothic"}
              fontWeight={"bold"}
              fontSize={{ base: "1.1rem", sm: "1.3rem" }}
            >
              40-45 mins
            </Text>
          </Flex>

          <Flex
            size="md"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text
              py="2"
              fontFamily={"Didact Gothic"}
              fontWeight={"bold"}
              fontSize={{ base: "1rem", sm: "1.3rem" }}
            >
              {data.info.working}
            </Text>
            <Text
              fontFamily={"Didact Gothic"}
              fontWeight={"bold"}
              fontSize={{ base: "1.1rem", sm: "1.3rem" }}
            >
              Front-End
            </Text>
          </Flex>
          <Flex mt={1} mb={2} gap={4} wrap={"wrap"}>
            {tags.map((tag, index) => (
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

          <Text
            fontFamily={"Didact Gothic"}
            fontSize={{ base: "1rem", md: "1.1rem" }}
          >
            {data.about}
          </Text>
          <CardFooter
            p={1}
            mt={1}
            flex={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text
              fontFamily={"Didact Gothic"}
              fontWeight={"bold"}
              fontSize={{ base: "1.1rem", sm: "1.3rem" }}
            >
              ₹500/Interview
            </Text>
            <Button
              fontSize={"16px"}
              width={{ base: "80px", md: "140px" }}
              height="40px"
              color={"white"}
              borderRadius={12}
              bg={"#FFFFFF20"}
              href={"#"}
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
              Book
              <Icon
                fontSize="1rem"
                as={FaArrowRightLong}
                cursor={"pointer"}
                ml={2}
              />
            </Button>
          </CardFooter>
        </CardBody>
      </Stack>
    </Card>
  );
}

export default InterviewerBox;
