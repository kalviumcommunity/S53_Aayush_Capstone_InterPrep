import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  Box,
} from "@chakra-ui/react";

function UsSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
    <div style={{ padding: "10px" }}>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
      >
      <Heading
        w="100%"
        textAlign="center"
        fontWeight={700}
        mb="2%"
        letterSpacing="1px"
        color="white"
      >
        User Registration &nbsp;
        <Tooltip
          hasArrow
          label="Please provide accurate information!"
          bg="white"
          placement="right"
          color="black"
          fontWeight="100"
        >
          <InfoOutlineIcon w={4} style={{ cursor: "pointer" }} />
        </Tooltip>
      </Heading>
      <Flex>
        <FormControl mr="5%" isRequired>
          <FormLabel htmlFor="name" fontWeight="normal" color="white">
            Name
          </FormLabel>
          <Input
            id="name"
            placeholder="John"
            {...register("name", { required: "Name is required" })}
            color="white"
          />
          <Box color="red.500">{errors.name && errors.name.message}</Box>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="username" fontWeight="normal" color="white">
            Username
          </FormLabel>
          <Input
            id="username"
            placeholder="Doe"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Minimum of 3 chars required" },
              maxLength: { value: 10, message: "Max of 10 chars required" },
            })}
            color="white"
          />
          <Box color="red.500">
            {errors.username && errors.username.message}
          </Box>
        </FormControl>
      </Flex>
      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="email" fontWeight="normal" color="white">
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="abc123@gmail.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          color="white"
        />
        <FormHelperText color="white">
          We'll never share your email.
        </FormHelperText>
        <Box color="red.500">{errors.email && errors.email.message}</Box>
      </FormControl>

      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="phone" fontWeight="normal" color="white">
          Contact No.
        </FormLabel>
        <Input
          id="phone"
          type="number"
          placeholder="90XXXXXXXX"
          {...register("phone", {
            required: "Phone No. is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Invalid Number",
            },
          })}
          color="white"
        />
        <Box color="red.500">{errors.phone && errors.phone.message}</Box>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel htmlFor="password" fontWeight="normal" mt="2%" color="white">
          Password &nbsp;
          <Tooltip
            hasArrow
            backgroundColor="white"
            label={
              <ul style={{ listStyleType: "disc", paddingLeft: "12px" }}>
                <li>6-20 characters Long</li>
                <li>At least one uppercase letter.</li>
                <li>At least one lowercase letter.</li>
                <li>At least one special character.</li>
                <li>At least one number.</li>
              </ul>
            }
            placement="right"
            color="black"
            fontSize="0.8rem"
            fontWeight="100"
          >
            <InfoOutlineIcon
              w="4"
              pos="absolute"
              top="2px"
              right="1px"
              cursor="pointer"
            />
          </Tooltip>
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/,
                message: "Password Invalid!",
              },
            })}
            color="white"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box color="red.500">{errors.password && errors.password.message}</Box>
      </FormControl>
      </Box>
      </div>
    </>
  );
}

export default UsSignup;
