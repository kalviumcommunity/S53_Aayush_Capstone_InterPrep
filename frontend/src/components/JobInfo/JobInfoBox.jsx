import React from 'react'
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineDollar, AiOutlineUser } from "react-icons/ai";
import { MdOutlineWork, MdAccessTime } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { TbFileCertificate, TbCalendarTime } from "react-icons/tb";

function JobInfoBox({ data }) {
  const JobInfo = [
    { name: `${data.salary}`, icon: AiOutlineDollar, flex: "" },
    {
      name: `${data.experience} experience`,
      icon: TbFileCertificate,
      flex: "",
    },
    { name: `${data.notice} Notice period`, icon: TbCalendarTime, flex: "" },
    { name: `${data.applied.length} Applied`, icon: AiOutlineUser, flex: "" },
    { name: `${data.place}`, icon: IoLocationOutline, flex: "" },
    { name: `${data.type}`, icon: MdOutlineWork, flex: "" },
    { name: `${data.timing}`, icon: MdAccessTime, flex: "" },
  ];
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant="elevated"
      bg={"#FFFFFF15"}
      color={"#FFFFFF"}
      p={{ base: "1", sm: "2" }}
      borderRadius={"12px"}
      width={{md:'75vw'}}
    >
      <Flex
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          w={{ base: "80%", sm: "250px" }}
          h={"100%"}
          src={data.company.image}
          alt="Company Logo"
          p={5}
          borderRadius={'30px'}
        />
      </Flex>
      <Stack>
        <CardBody>
          <Heading
            size="md"
            fontFamily={"Didact Gothic"}
            fontSize={{ base: "1rem", md: "1.4rem" }}
            style={{display:'flex', justifyContent:'space-between', alignItems:"center"}}
          >
            {data.role}
            <Button
            as={"a"}
            fontSize={"16px"}
            width={{base:"80px", md:"140px"}}
            height="40px"
            color={"white"}
            bg={"#FFFFFF10"}
            href={"#"}
            borderRadius="38"
            borderBottom={"2px solid white"}
            _hover={{
              boxShadow: "0 6px 12px 0 #ffffff60",
            }}
            _active={{
              bg:"#FFFFFF20"
            }}
            fontFamily="Didact Gothic">
              Apply
            </Button>
          </Heading>

          <Text
            py="2"
            fontFamily={"Didact Gothic"}
            fontWeight={"bold"}
            fontSize={{ base: "1rem", md: "1.2rem" }}
          >
          {data.name}
          </Text>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
            }}
            gap={5}
            mt={5}
          >
            {JobInfo.map((data, i) => (
              <GridItem
                key={i}
                display={"flex"}
                gap={"0.5rem"}
                alignItems={"center"}
                justifyContent={{ md: `${data.flex}` }}
              >
                <Icon fontSize="22" as={data.icon} />
                <Text
                  fontFamily={"Didact Gothic"}
                  fontSize={{ base: "0.9rem", md: "1rem" }}
                >
                  {data.name}
                </Text>
              </GridItem>
            ))}

            <GridItem
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            ></GridItem>
          </Grid>
        </CardBody>
      </Stack>
    </Card>
  )
}

export default JobInfoBox