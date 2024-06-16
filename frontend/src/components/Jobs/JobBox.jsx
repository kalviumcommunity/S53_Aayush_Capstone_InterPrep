import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Samsung from "../../assets/Samsung.svg";
import { AiOutlineDollar, AiOutlineUser } from "react-icons/ai";
import { MdOutlineWork, MdAccessTime } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { TbFileCertificate, TbCalendarTime } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function JobBox({ data }) {
  const navigate = useNavigate()
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
  console.log(data.company);
  const handleArrow = () => {
    navigate(`/jobs/${data._id}`)
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant="elevated"
      bg={"#FFFFFF15"}
      color={"#FFFFFF"}
      p={{ base: "1", sm: "2" }}
      borderRadius={"12px"}
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
          >
            {data.role}
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
          <CardFooter
            p={1}
          >
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
        </CardBody>
      </Stack>
    </Card>
  );
}

export default JobBox;
