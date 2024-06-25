import React, { useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import {toast} from "sonner";

export default function InterviewSignup() {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cvURL, setCVURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [cv, setCV] = useState();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [sendData, setsendData] = useState({
    username: "",
    name: "",
    password: "",
    image: "",
    info: { qualification: "", experience: "", working: "" },
    phone: "",
    email: "",
    certificate: "",
    about: "",
    mastery: "",
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
      const masteryArray = data.mastery.split(",").map((skill) => skill.trim());

      data.phone = parseInt(data.phone, 10);
      const updatedSendData = {
        username: data.username,
        name: data.name,
        password: data.password,
        image: imageURL,
        info: {
          qualification: data.qualification,
          experience: data.experience,
          working: data.working,
        },
        phone: data.phone,
        email: data.email,
        certificate: cvURL,
        about: data.about,
        mastery: masteryArray,
      };

      setsendData(updatedSendData);

      const response = await axios.post(
        `${import.meta.env.VITE_server}interviewer/signup`,
        updatedSendData
      );

      if (response.data) {
        setIsSubmitted(true);
        toast.success("Account has been created.",{
          description: "Redirecting to home!"
        });
      }

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Submission Failed.",{
        description: error.response.data
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onNext = async () => {
    const isValid = await trigger();

    if (isValid) {
      if ((step === 1 && isFileUploaded) || step === 0) {
        setStep((prevStep) => prevStep + 1);
      }
      if (step === 2 && isImageUploaded) {
        setStep((prevStep) => prevStep + 1);
      }
    }
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

  const handleImageURLChange = (url) => {
    setImageURL(url);
    setIsImageUploaded(true);
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
            <Form3
              register={register}
              errors={errors}
              image={image}
              setImage={setImage}
              isFileUploaded={isImageUploaded}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setImageURL={handleImageURLChange}
            />
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
              {step === 0 && (
                <Button
                  onClick={onNext}
                  colorScheme="teal"
                  variant="outline"
                  w="7rem"
                >
                  Next
                </Button>
              )}
              {step === 1 && (
                <Button
                  onClick={onNext}
                  colorScheme="teal"
                  variant="outline"
                  w="7rem"
                  disabled={isFileUploaded}
                >
                  Next
                </Button>
              )}
              {step === 2 && (
                <Button
                  onClick={onNext}
                  colorScheme="teal"
                  variant="outline"
                  w="7rem"
                  disabled={!isImageUploaded}
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
