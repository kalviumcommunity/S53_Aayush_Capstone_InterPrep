import React, { useState } from "react";
import { Progress, Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { toast } from "sonner";
import useFileUpload from "../../../hooks/useFileUpload";

export default function InterviewSignup() {
  const [step, setStep] = useState(0);
  const [cv, setCV] = useState(null);
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [both, setBoth] = useState(false);
  const navigate = useNavigate();

  const {
    uploadFile,
    isLoading,
    setIsLoading,
    isFileUploaded,
    setIsFileUploaded,
  } = useFileUpload();

  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
  } = useForm();

  const handleUpload = async (upload, type) => {
    if (upload) {
      const url = await uploadFile(upload, type);
      return url;
    }
    return null;
  };

  const onSubmit = async (data) => {
    setBoth(true);

    const masteryArray = data.mastery.split(",").map((skill) => skill.trim());
    data.phone = parseInt(data.phone, 10);

    const updatedSendData = {
      username: data.username,
      name: data.name,
      password: data.password,
      phone: data.phone,
      email: data.email,
      about: data.about,
      mastery: masteryArray,
      info: {
        qualification: data.qualification,
        experience: data.experience,
        working: data.working,
      },
    };

    const uploadAndSubmit = async () => {
      const cvLink = await handleUpload(cv, "cv");
      const imageLink = await handleUpload(image, "images");

      if (!cvLink || !imageLink) {
        throw new Error("File upload failed");
      }

      updatedSendData.certificate = cvLink;
      updatedSendData.image = imageLink;

      const response = await axios.post(
        `${import.meta.env.VITE_server}interviewer/signup`,
        updatedSendData
      );

      return response.data;
    };

    toast.promise(uploadAndSubmit(), {
      loading: "Submitting your data... do not reload",
      success: () => {
        setBoth(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        return "Account has been created. Redirecting to home!";
      },
      error: (error) => {
        setBoth(false);
        return `Submission failed: ${error.response?.data || error.message}`;
      },
    });
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

  const handleCVChange = (file) => {
    setCV(file);
    setIsFileUploaded(true);
  };

  const handleImageChange = (file) => {
    setImage(file);
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
              setCV={handleCVChange}
            />
          ) : (
            <Form3
              register={register}
              errors={errors}
              image={image}
              setImage={handleImageChange}
              isFileUploaded={isImageUploaded}
              setIsLoading={setIsLoading}
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
                  disabled={!isFileUploaded}
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
                isLoading={both}
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