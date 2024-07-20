import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

const Testimonial = (props) => {
  const { children } = props;

  return <Box>{children}</Box>;
};

const TestimonialContent = (props) => {
  const { children } = props;

  return (
    <Stack
      bg={"#ffffff15"}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: "#ffffff15",
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialText = (props) => {
  const { children } = props;

  return (
    <Text textAlign={"center"} color={"white"} fontSize={{base:"0.8rem", lg:"1rem"}} fontStyle={'italic'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
      </Stack>
    </Flex>
  );
};

export default function LastComponent() {
  return (
    <Flex
      gap={"5"}
      direction={{ base: "column" }}
      width={{ base: "100%", xl: "90%" }}
    >
      <Text
        fontSize={{ base: "1.5rem", md: "1.6rem" }}
        fontFamily="Didact Gothic"
        fontWeight={900}
      >
        Testimonials
      </Text>
      <Stack
        overflowY={{ base: "scroll", md: "hidden" }}
        direction={{ md: "row" }}
        m={2}
        spacing={{ base: 10, md: 4, lg: 10 }}
      >
        <Testimonial>
          <TestimonialContent>
            <TestimonialText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              neque sed imperdiet nibh lectus feugiat nunc sem.
            </TestimonialText>
          </TestimonialContent>
          <TestimonialAvatar
            src={
              "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
            }
            name={"Jane Cooper"}
          />
        </Testimonial>
        <Testimonial>
          <TestimonialContent>
            <TestimonialText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              neque sed imperdiet nibh lectus feugiat nunc sem.
            </TestimonialText>
          </TestimonialContent>
          <TestimonialAvatar
            src={
              "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
            }
            name={"Jane Cooper"}
          />
        </Testimonial>
        <Testimonial>
          <TestimonialContent>
            <TestimonialText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              neque sed imperdiet nibh lectus feugiat nunc sem.
            </TestimonialText>
          </TestimonialContent>
          <TestimonialAvatar
            src={
              "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
            }
            name={"Jane Cooper"}
          />
        </Testimonial>
      </Stack>
    </Flex>
  );
}
