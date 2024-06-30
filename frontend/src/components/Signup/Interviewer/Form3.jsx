import React from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdCloudUpload } from "react-icons/md";

const Form3 = ({ register, errors, setImage, image }) => {
  const handleFileChange = (e) => {
    console.log("Selected file:", e.target.files[0]);
    setImage(e.target.files[0]);
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
              onChange={handleFileChange}
            />
          </label>
          <p className="err">{errors.image && errors.image.message}</p>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default Form3;