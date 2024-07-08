import React from 'react'
import {
  Button,
  Card,
  CardFooter,
  Flex,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import RoboImg from "../../assets/Robo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function TopComponent() {
    const navigate = useNavigate();
    const handleArrow = () => {
        navigate(`/interviewers`);
      };
  return (
    <Flex gap={"2rem"} direction={{ base: "column", lg: "row" }}>
          <Card
            display={"flex"}
            variant="elevated"
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "center", md: "normal" }}
            bg={"#FFFFFF15"}
            color={"#FFFFFF80"}
            p={{ base: "6", md: "10" }}
            borderRadius={"12px"}
            width={{ md: "100%", lg: "52%" }}
            boxShadow={"0px 0px 15px #FFFFFF50"}
          >
            <Flex
              width={"100%"}
              justifyContent={"space-around"}
              direction={"column"}
              gap={"1rem"}
            >
              <Text
                fontFamily={"FranklinGoth"}
                fontSize={{ base: "1.8rem", md: "2.5rem" }}
                fontWeight={100}
              >
                Practice with our AI Chat Bot
              </Text>
              <Button
                bg={"#D9D9D920"}
                border={"2px solid #A8A8A8"}
                color={"#A8A8A8"}
                fontFamily={"FranklinGoth"}
                fontWeight={100}
                transition={"all .3s ease"}
                borderRadius={"12px"}
                _hover={{
                  bg: "#D9D9D930",
                }}
              >
                Start Practicing
              </Button>
            </Flex>
            <Image
              src={RoboImg}
              width={{ base: "100px", xl: "150px" }}
              margin={"1rem"}
              display={{ base: "block", sm: "none", xl: "block" }}
            />
          </Card>
          <Card
            display={"flex"}
            variant="elevated"
            bg={"#FFFFFF15"}
            color={"#FFFFFF80"}
            p={{ base: "6", md: "10" }}
            borderRadius={"12px"}
            width={{ md: "100%", lg: "40%", xl: "33%" }}
            boxShadow={"0px 0px 15px #FFFFFF50"}
          >
            <Flex
            direction={"column"}
            justifyContent="space-evenly"
            align={'start'}
            height={'100%'}
            >

            <Text fontWeight={900} fontSize={"1.4rem"}>Book</Text>
            <Text
              fontFamily={"FranklinGoth"}
              fontSize={{base:"2.5rem", xl:"3.5vmax"}}
              lineHeight={1.1}
              mb={3}
              >
              Mock Interview
            </Text>
            <Text fontWeight={900}>with top HR Managers</Text>
              </Flex>
            <CardFooter p={1}>
              <Icon
                fontSize="1.8rem"
                as={FaArrowRightLong}
                cursor={"pointer"}
                transition={"all 0.3s"}
                position={"absolute"}
                bottom={6}
                right={8}
                onClick={handleArrow}
                _hover={{
                  transform: "translate(4px)",
                }}
              />
            </CardFooter>
          </Card>
        </Flex>
  )
}

export default TopComponent