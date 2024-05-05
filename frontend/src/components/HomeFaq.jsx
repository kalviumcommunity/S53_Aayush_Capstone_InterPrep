import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";

function HomeFAQ() {
  return (
    <Box
      width={["80vw", "80vw", "70vw"]}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <Text
        style={{ fontFamily: "FranklinGoth", color: "white" }}
        fontSize={["1.5rem", "1.6rem", "2.4rem"]}
      >
        FAQs
      </Text>
      <Text
        style={{ fontFamily: "FranklinGoth", color: "#FFFFFF73" }}
        fontSize={["1rem", "1rem", "1.2rem"]}
      >
        List of frequently asked questions
      </Text>
      <Accordion
        allowToggle
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <AccordionItem
          style={{
            backgroundColor: "#1D1D1D",
            color: "white",
            borderRadius: "12px",
            border: "0px",
          }}
        >
          <AccordionButton borderRadius="12px" padding={"1rem"}>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontFamily="FranklinGoth"
              fontSize={["1rem", "1rem", "1.2rem"]}
            >
              Section 1 title
            </Box>
            <AccordionIcon w={6} h={6} />
          </AccordionButton>

          <AccordionPanel
            pb={4}
            fontFamily="FranklinGoth"
            fontSize={["0.8rem", "0.8rem", "1rem"]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem
          style={{
            backgroundColor: "#1D1D1D",
            color: "white",
            borderRadius: "12px",
            border: "0px",
          }}
        >
          <AccordionButton borderRadius="12px" padding={"1rem"}>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontFamily="FranklinGoth"
              fontSize={["1rem", "1rem", "1.2rem"]}
            >
              Section 1 title
            </Box>
            <AccordionIcon w={6} h={6} />
          </AccordionButton>

          <AccordionPanel
            pb={4}
            fontFamily="FranklinGoth"
            fontSize={["0.8rem", "0.8rem", "1rem"]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem
          style={{
            backgroundColor: "#1D1D1D",
            color: "white",
            borderRadius: "12px",
            border: "0px",
          }}
        >
          <AccordionButton borderRadius="12px" padding={"1rem"}>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontFamily="FranklinGoth"
              fontSize={["1rem", "1rem", "1.2rem"]}
            >
              Section 1 title
            </Box>
            <AccordionIcon w={6} h={6} />
          </AccordionButton>

          <AccordionPanel
            pb={4}
            fontFamily="FranklinGoth"
            fontSize={["0.8rem", "0.8rem", "1rem"]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem
          style={{
            backgroundColor: "#1D1D1D",
            color: "white",
            borderRadius: "12px",
            border: "0px",
          }}
        >
          <AccordionButton borderRadius="12px" padding={"1rem"}>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontFamily="FranklinGoth"
              fontSize={["1rem", "1rem", "1.2rem"]}
            >
              Section 1 title
            </Box>
            <AccordionIcon w={6} h={6} />
          </AccordionButton>

          <AccordionPanel
            pb={4}
            fontFamily="FranklinGoth"
            fontSize={["0.8rem", "0.8rem", "1rem"]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default HomeFAQ;
