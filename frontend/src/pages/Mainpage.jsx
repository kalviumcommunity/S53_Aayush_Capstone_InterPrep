import React, { memo } from "react";
import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import RoboImg from "../assets/Robo.png"
import {ArrowForwardIcon} from "@chakra-ui/icons"

function Mainpage() {
  return (
    <HStack
    justifyContent={"center"}
    alignContent={"center"}
    >

    <Flex
      flexDirection={"column"}
      gap={"1rem"}
      ml={{ base: 0, md: 60 }}
      p={{base:"3", md:"12"}}
      top="20"
      position="absolute"
      color={"white"}
    >
      <Box display={"flex"} gap={5} flexDirection={{base:"column", md:"row"}}>
        <Box bg="rgba(250,250,250, 10%)" display={"flex"} p={{base:"5", md:"10"}} style={{borderRadius:"10px"}}
        >
          <Box display={"flex"} flexDirection={"column"}
          style={{
            fontFamily:"FranklinGoth",
            justifyContent:"space-between"
          }}
          >
          <Text  style={{
        fontFamily:"FranklinGoth"
      }}
      fontSize={{base:"1.5rem",md:"2rem"}}>
            Upscale your tech <br /> journey today!
          </Text>
          <Text  style={{
        fontFamily:"FranklinGoth"
      }}
      fontSize={{base:"1rem",md:"1.2rem"}}>
            Practice and give mock interviews today! <ArrowForwardIcon />
          </Text>

          </Box>
        </Box>

        <Box bg="rgba(250,250,250, 10%)" display={"flex"} p={{base:"6", md:"10"}} style={{justifyContent:"center", alignContent:"center", borderRadius:"10px"}}
        >
          <Box display={"flex"} flexDirection={"column"}
          style={{
            fontFamily:"FranklinGoth",
            justifyContent:"space-around"
          }}
          pr={{base:"5", md:"10"}}
          fontSize={{base:"1.3rem",md:"2.5rem"}}
          >
          <Text  style={{
        fontFamily:"FranklinGoth"
      }}
      width={{base:"16vmax", md:"300px"}}
      >
            Practice with Our AI Chat Bot
          </Text>
          <Button colorScheme="whiteAlpha" bg="rgba(250,250,250,10%)" border="1px solid white" _hover={{bg:"rgba(250,250,250,20%)"}}
          mt={4}
          >
            Start Practicing
          </Button>
          </Box>
          <Image src={RoboImg} w={{base:"100px", md:"10vmax"}}/>
        </Box>

        

        
      </Box>
      <Box>
        hey
      </Box>
    </Flex>
    </HStack>
  );
}

export default memo(Mainpage);
