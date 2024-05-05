import React, { useEffect, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";

const Form1 = ({ register, errors }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <Heading
        w="100%"
        textAlign="center"
        fontWeight={700}
        mb="2%"
        letterSpacing="1px"
        color="white"
      >
        Interviewer Registration
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
          <p className="err">{errors.name && errors.name.message}</p>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="username" fontWeight="normal" color="white">
            Username
          </FormLabel>
          <Input
            id="username"
            placeholder="Doe"
            {...register("username", { required: "Username is required" })}
            color="white"
          />
          <p className="err">{errors.username && errors.username.message}</p>
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
          {...register("email", { required: "Email is required" })}
          color="white"
        />
        <FormHelperText color="white">
          We'll never share your email.
        </FormHelperText>
        <p className="err">{errors.email && errors.email.message}</p>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="password" fontWeight="normal" mt="2%" color="white">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
            color="white"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {" "}
              {show ? "Hide" : "Show"}{" "}
            </Button>
          </InputRightElement>
        </InputGroup>
        <p className="err">{errors.password && errors.password.message}</p>
      </FormControl>
    </>
  );
};

const Form2 = ({ register, errors, cvURL, setCVURL }) => {
  const [cv, setCV] = useState();
  const [cvPerc, setCVPerc] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false); // Define isLoading state

  const handleUpload = () => {
    if (cv) {
      setIsLoading(true); // Set loading state to true when upload begins
      uploadFile(cv, "cvUrl");
    }
  };

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "cv";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCVPerc(progress);
        console.log("Upload is " + cvPerc + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle upload errors
        console.error("Upload failed:", error);
        setIsLoading(false);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setCVURL((prev) => {
            return {
              ...prev,
              [fileType]: downloadURL,
            };
          });
          console.log(cvURL);
          setIsFileUploaded(true);
          setIsLoading(false);
        });
      }
    );
  };

  return (
    <>
      <Heading
        w="100%"
        textAlign="center"
        fontWeight="normal"
        mb="2%"
        color="white"
      >
        Interviewer Details
      </Heading>
      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="qualification" fontWeight="normal" color="white">
          Qualification
        </FormLabel>
        <Input
          id="qualification"
          type="text"
          placeholder="Bachelors of Technology in CSE"
          {...register("qualification", {
            required: "Qualification is required",
          })}
          color="white"
        />
        <p className="err">
          {errors.qualification && errors.qualification.message}
        </p>
      </FormControl>
      <Flex mt="2%">
        <FormControl mr="5%" isRequired>
          <FormLabel htmlFor="experience" fontWeight="normal" color="white">
            Experience
          </FormLabel>
          <Input
            id="experience"
            placeholder="5 Years"
            {...register("experience", { required: "Experience is required" })}
            color="white"
          />
          <p className="err">
            {errors.experience && errors.experience.message}
          </p>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="working" fontWeight="normal" color="white">
            Currently Working at
          </FormLabel>
          <Input
            id="working"
            placeholder="Company, Freelancing etc."
            {...register("working", { required: "Current status is required" })}
            color="white"
          />
          <p className="err">{errors.working && errors.working.message}</p>
        </FormControl>
      </Flex>

      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="cv" fontWeight="normal" color="white">
          Please Upload your CV
        </FormLabel>
        <input
          id="cv"
          placeholder="Company, Freelancing etc."
          {...register("cv", { required: "Uploading CV is required" })}
          color="white"
          style={{ color: "white" }}
          type="file"
          accept="application/pdf, .docx"
          onChange={(e) => {
            setCV((prev) => e.target.files[0]);
          }}
        />
        <Button
          onClick={handleUpload}
          isLoading={isLoading}
          loadingText="Uploading ..."
        >
          Upload CV
        </Button>
        <p className="err">{errors.cv && errors.cv.message}</p>
      </FormControl>

      {/* Other form fields */}
    </>
  );
};

const Form3 = ({ register, errors }) => {
  return (
    <>x
      <Heading w="100%" textAlign="center" fontWeight="normal" color="white">
        Interviewer
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl isRequired mt="3%">
          <FormLabel htmlFor="reason" fontWeight="normal" color="white">
            Why do you want to be an interviewer?
          </FormLabel>
          <Textarea
            id="reason"
            mt="2%"
            {...register("reason", { required: "Reason required" })}
            color="white"
          />
          <p className="err">{errors.reason && errors.reason.message}</p>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function InterviewSignup() {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cvURL, setCVURL] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [sendData, setsendData] = useState({
    username: "",
    name: "",
    password: "",
    image: "",
    info: { qualification: "", experience: "", working: "" },
    contact: { phone: "", email: "" },
    certificate: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const updatedSendData = {
        username: data.username,
        name: data.name,
        password: data.password,
        image: "test.png",
        info: {
          qualification: data.qualification,
          experience: data.experience,
          working: data.working,
        },
        contact: {
          phone: "9839392381",
          email: data.email,
        },
        certificate: cvURL.cvUrl,
        reason: data.reason,
      };
  
      await new Promise((resolve) => {
        setsendData(updatedSendData);
        resolve();
      });
  
      console.log(sendData);
  
      const response = await axios.post(
        "http://localhost:8080/interviewer/signup",
        updatedSendData
      );
  
      if (response.data) {
        setIsSubmitted(true);
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log('Signup successful:', response.data);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        title: "Submission failed",
        description: error.response ? error.response.data.message : "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setStep(step + 1);
    }
  };
  

  const onNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (step == 1 && isFileUploaded) {
        setStep(step + 1);
      } else if (step < 2) {
        setStep(step + 1);
      }
    }
  };

  const onBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleCVURLChange = (url) => {
    setCVURL(url);
    setIsFileUploaded(true);
  };

  return (
    <div style={{ padding: "10px" }}>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div style={{ position: "relative" }}>
          <Progress
            value={33.33 * step}
            mb="5%"
            mx="5%"
            transition="width 0.3s ease-in-out" // Add transition property for smooth animation
          ></Progress>
          {step === 0 ? (
            <Form1 register={register} errors={errors} />
          ) : step === 1 ? (
            <Form2
              register={register}
              errors={errors}
              cvURL={cvURL}
              setCVURL={handleCVURLChange}
            />
          ) : (
            <Form3 register={register} errors={errors} />
          )}
        </div>
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              {step > 0 && (
                <Button
                  onClick={onBack}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Back
                </Button>
              )}
              {step < 2 && (
                <Button
                  onClick={onNext}
                  colorScheme="teal"
                  variant="outline"
                  w="7rem"
                >
                  Next
                </Button>
              )}
            </Flex>
            {step >= 2 && (
              <Button
                w="7rem"
                type="submit"
                colorScheme="red"
                variant="solid"
                isLoading={isLoading}
              >
                Submit
              </Button>
            )}
          </Flex>
        </ButtonGroup>
      </Box>
    </div>
  );
}
