import React, { useEffect, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Tooltip,
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
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { MdCloudUpload } from "react-icons/md";

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
        Interviewer Registration &nbsp;
        <Tooltip
          hasArrow
          label="Please provide with accurate information!"
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
          <p className="err">{errors.name && errors.name.message}</p>
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
        <p className="err">{errors.email && errors.email.message}</p>
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
        <p className="err">{errors.phone && errors.phone.message}</p>
      </FormControl>

      <FormControl isRequired>
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
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/,
                message: "Password Invalid!",
              },
            })}
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

const Form2 = ({
  register,
  errors,
  cvURL,
  setCVURL,
  selectedFile,
  setIsLoading,
  isLoading,
  setIsFileUploaded,
  isFileUploaded,
  setCV,
  cv,
}) => {
  // const [isFileUploaded, setIsFileUploaded] = useState(false);
  // const [isLoading, setIsLoading] = useState(false); // loading for upload button

  const handleUpload = () => {
    if (cv) {
      setIsLoading(true);
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
        console.log("Upload is " + progress + "% done");
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
        switch (error.code) {
          case "storage/unauthorized":
            console.log("You are not authorized to upload!");
            break;
          case "storage/canceled":
            console.log("You have cancelled the upload!");
            break;
          case "storage/unknown":
            console.log("Unknown error occured!");
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            setCVURL((prev) => {
              return {
                ...prev,
                [fileType]: downloadURL,
              };
            });
            setIsFileUploaded(true);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
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
      <Flex mt="3%">
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

      <FormControl mt="3%" isRequired>
        <FormLabel htmlFor="cv" fontWeight="normal" color="white">
          Please Upload your CV
        </FormLabel>
        <label className="custom-upload">
          <MdCloudUpload w={"2px"} h={"2px"} />
          &nbsp; &nbsp; Select a File {cv && `- ${cv.name}`}
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
              console.log(e.target.files[0].name);
            }}
            disabled={isFileUploaded} // Disable input when file is uploaded
          />
        </label>
        {isFileUploaded ? (
          <p style={{ color: "green" }}>File uploaded successfully!</p>
        ) : (
          <Button
            onClick={handleUpload}
            isLoading={isLoading}
            loadingText="Uploading ..."
            disabled={isFileUploaded} // Disable button when file is uploaded
          >
            Upload CV
          </Button>
        )}
        {!isFileUploaded && ( // Only render error if file is not uploaded
          <p className="err">{errors.cv && errors.cv.message}</p>
        )}
      </FormControl>
    </>
  );
};

const Form3 = ({ register, errors }) => {
  return (
    <>
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cvURL, setCVURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [cv, setCV] = useState();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [sendData, setsendData] = useState({
    username: "",
    name: "",
    password: "",
    image: "",
    info: { qualification: "", experience: "", working: "" },
    phone: "",
    email: "",
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
        phone: data.phone,
        email: data.email,
        certificate: cvURL.cvUrl,
        reason: data.reason,
      };

      await new Promise((resolve) => {
        setsendData(updatedSendData);
        resolve();
        console.log(sendData);
      });

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
        console.log("Signup successful!");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        title: "Submission failed",
        description: error.response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onNext = async () => {
    console.log("Next button clicked");
    console.log("Current step:", step);
    const isValid = await trigger();

    if (step === 1 && isFileUploaded) {
      console.log("File is uploaded and step is 1. Trigger will not work.");
      setStep((prevStep) => prevStep + 1);
      return;
    }

    if (isValid) {
      if (step < 2) {
        setStep((prevStep) => prevStep + 1);
        console.log("New step:", step); // Log the new step value
      }
      if (step == 2) {
        console.log("yes");
        setStep((prevStep) => prevStep + 1);
      }
    }

    console.log(step);
  };

  const onBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleCVURLChange = (url) => {
    setCVURL(url);
    setSelectedFile(url);
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
            transition="width 0.3s ease-in-out"
          ></Progress>
          {step === 0 ? (
            <Form1 register={register} errors={errors} />
          ) : step === 1 ? (
            <Form2
              register={register}
              errors={errors}
              cv={cv}
              setCV={setCV}
              isFileUploaded={isFileUploaded}
              setIsFileUploaded={setIsFileUploaded}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCVURL={handleCVURLChange}
              selectedFile={selectedFile}
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
                onClick={onNext}
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
