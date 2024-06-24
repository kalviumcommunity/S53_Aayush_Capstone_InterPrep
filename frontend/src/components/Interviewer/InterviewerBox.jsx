import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

function InterviewerBox() {
  return (
    <Card
      maxW="xsm"
      bg={"#FFFFFF15"}
      borderRadius={"12px"}
      color={"#FFFFFF"}
      width={{ base: "280px", md: "330px", lg: "340px"}}
    >
      <CardBody>
        <Image
          w={{ base: "100%"}}
          h={{ base: "250px", sm: "280px" }}
          src="https://st2.depositphotos.com/1017986/6911/i/450/depositphotos_69113329-stock-photo-businessman-taking-employment-inteview.jpg"
          alt="Interviewer"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3" >
          <Flex gap={5} wrap={"wrap"}>
            <Tag size={"sm"} colorScheme="whiteAlpha" bg={"#FFFFFF20"} fontFamily={"Didact Gothic"} fontWeight={"bold"}>
              Frontend
            </Tag>
            <Tag size={"sm"} colorScheme="whiteAlpha" bg={"#FFFFFF20"} fontFamily={"Didact Gothic"} fontWeight={"bold"}>
              Backend
            </Tag>
            <Tag size={"sm"} colorScheme="whiteAlpha" bg={"#FFFFFF20"} fontFamily={"Didact Gothic"} fontWeight={"bold"}>
              DSA
            </Tag>
            <Tag size={"sm"} colorScheme="whiteAlpha" bg={"#FFFFFF20"} fontFamily={"Didact Gothic"} fontWeight={"bold"}>
              React
            </Tag>
          </Flex>
          <Heading 
          size="md"
          fontFamily={"Didact Gothic"}
          fontSize={{ base: "1rem", md: "1.4rem" }}
          >John Doe</Heading>
          <Text
          fontFamily={"Didact Gothic"}
          fontSize={{ base: "1rem", md: "1.1rem" }}
          >
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color={"#FFFFFF"} fontSize="2xl" fontFamily={"Didact Gothic"}>
            <b>₹450</b> ~ 45 min Video Meet
          </Text>
        </Stack>
      </CardBody>
      <CardFooter
      display={'flex'}
      justifyContent={'center'}
      >
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
    </Card>
  );
}

export default InterviewerBox;
