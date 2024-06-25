import React, { useState } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { MdCloudUpload } from "react-icons/md";
import useFileUpload from "../../../hooks/useFileUpload";

const Form3 = ({ register, errors, setImage, setImageURL, image }) => {
  const { uploadFile, isLoading, setIsLoading, isFileUploaded } =
    useFileUpload();

  const handleUpload = () => {
    if (image) {
      setIsLoading(true);
      uploadFile(image, "images").then((url) => {
        setImageURL(url);
      });
    }
  };

  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" color="white">
        Interviewer
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl isRequired mt="3%">
          <FormLabel htmlFor="about" fontWeight="normal" color="white">
            Can you tell a little about yourself?
          </FormLabel>
          <Textarea
            id="about"
            mt="2%"
            {...register("about", { required: "Reason required" })}
            color="white"
          />
          <p className="err">{errors.about && errors.about.message}</p>
        </FormControl>
        <FormControl mt="3%" isRequired>
          <FormLabel htmlFor="image" fontWeight="normal" color="white">
            Please Upload your Profile Image
          </FormLabel>
          <label className="custom-upload">
            <MdCloudUpload w={"2px"} h={"2px"} />
            &nbsp; &nbsp; Select a File {image && `- ${image.name}`}
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              disabled={isFileUploaded}
            />
          </label>
          {isFileUploaded ? (
            <p style={{ color: "green" }}>File uploaded successfully!</p>
          ) : (
            <Button
              onClick={handleUpload}
              isLoading={isLoading}
              loadingText="Uploading ..."
              disabled={isFileUploaded}
            >
              Upload Image
            </Button>
          )}
          {!isFileUploaded && (
            <p className="err">{errors.image && errors.image.message}</p>
          )}
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default Form3;
