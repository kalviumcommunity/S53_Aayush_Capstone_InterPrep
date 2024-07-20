import React from "react";
import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";

function MiniJobCard({job}) {
    
  return (
    <Card
      maxW="sm"
      variant="elevated"
      bg={"#FFFFFF15"}
      color={"#FFFFFF"}
      boxShadow={"0px 0px 15px #FFFFFF50"}
    >
      <CardBody>
        <Image
          src={job.company.image ? job.company.image : "https://img.gs/shcfmqtrbf/fit/https://www.health-shop.com/content/images/thumbs/def/default-image_415.png"}
          alt="Company Logo"
          borderRadius="lg"
          width={'240px'}
          height={'200px'}
        />
        <Stack mt="6" spacing="2">
          <Heading
            size="md"
            fontFamily={"Didact Gothic"}
            fontWeight={"bold"}
            fontSize={{ base: "1.3rem", md: "1.4rem" }}
          >
            {job.role}
          </Heading>
          <Text
          
          fontFamily={"Didact Gothic"}
            fontSize={{ base: "1.1rem", md: "1.2rem" }}>{job.name}</Text>
          <Text
          fontFamily={"Didact Gothic"}
          fontSize={{ base: "1rem", md: "1.1rem" }}
          >{job.place}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default MiniJobCard;
