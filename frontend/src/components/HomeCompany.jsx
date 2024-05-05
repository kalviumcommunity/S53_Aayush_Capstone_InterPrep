import React from "react";
import comp1 from "../assets/Company/Amazon.png";
import comp2 from "../assets/Company/Apple.png";
import comp3 from "../assets/Company/Google.png";
import comp4 from "../assets/Company/Meta.png";
import comp5 from "../assets/Company/Microsoft.png";
import comp6 from "../assets/Company/Samsung.png";
import { Grid, Image, Text } from "@chakra-ui/react";

function ImageGrid() {
  return (
    <>
      <Text
        style={{ fontFamily: "FranklinGoth", color: "white" }}
        fontSize={["1.3rem", "1.4rem", "2.2rem"]}
      >
        Book Mock Interviews with Industry Experts from
      </Text>
      <Grid
        templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={[1, 1, 8]}
        justifyItems="center"
        alignItems="center"
      >
        <Image
          src={comp1}
          alt=""
          boxSize="130px"
          height="45px"
          marginBottom={["10px", "10px", "0px"]}
        />
        <Image
          src={comp2}
          alt=""
          boxSize="130px"
          height="40px"
          marginBottom={["10px", "10px", "0px"]}
        />
        <Image
          src={comp3}
          alt=""
          boxSize="130px"
          height="45px"
          marginBottom={["10px", "10px", "0px"]}
        />
        <Image
          src={comp4}
          alt=""
          boxSize="110px"
          height="25px"
          marginBottom={["10px", "10px", "0px"]}
        />
        <Image
          src={comp5}
          alt=""
          boxSize="180px"
          height="40px"
          marginBottom={["10px", "10px", "0px"]}
        />
        <Image
          src={comp6}
          alt=""
          boxSize="160px"
          height="30px"
          marginBottom={["10px", "10px", "0px"]}
        />
      </Grid>
    </>
  );
}

export default ImageGrid;
