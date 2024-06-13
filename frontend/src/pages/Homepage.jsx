import React from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import HomeNavbar from "../components/Home/HomeNavbar";
import HomeFAQ from "../components/Home/HomeFaq";
import Footer from "../components/Footer/Footer";
import HomeCompany from "../components/Home/HomeCompany";

function Homepage() {
  return (
    <>
      <HomeNavbar />
      <Stack
        padding={{xsm:'2rem 0rem',sm:'3rem 0rem', md:'3rem 0rem'}}
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        spacing={14}
      >
        <Box
          fontWeight="700"
          fontSize={['5vmax', '5.5vmax', '4vmax']}
          bgGradient="linear(to-r, #FFFFFF 20%, #999999)"
          bgClip="text"
          color="transparent"
          width={['80%', '80%', '60%']}
          mx="auto"
          fontFamily='Didact Gothic'
        >
          Master tech interviews and <br /> discover job openings <br />effortlessly!
        </Box>
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={['column', 'column', 'row']} 
          spacing={4}
          
        >
          <Button
            bgGradient="linear(to-r, #3E005B, #5B004D)"
            color="white"
            _hover={{
              bgGradient: 'linear(to-r, #5B004D, #3E005B)',
            }}
          fontFamily='Didact Gothic'

            size={['md', 'md', 'lg']}
          >
            Apply for Jobs
          </Button>
          <Button
            bg="rgba(153, 153, 153, 0.22)"
            color="white"
          fontFamily='Didact Gothic'
            _hover={{
              bg: 'rgba(153, 153, 153, 0.35)',
            }}
            size={['md', 'md', 'lg']}
          >
            Hire from Us
          </Button>
        </Stack>
        <div className="hero-img">
          </div>
          <HomeCompany />
          <HomeFAQ />
      </Stack>
          <Footer />
    </>
  );
}

export default Homepage;
