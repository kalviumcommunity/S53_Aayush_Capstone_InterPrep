import React from "react";
import { Heading, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";
import { MdCloudUpload } from "react-icons/md";

const Form2 = ({ register, errors, setCV, cv }) => {
  return (
    <>
      <Heading
        w="100%"
        textAlign="center"
        fontWeight="bold"
        mb="2%"
        color="white"
      >
        Interviewer Details
      </Heading>
      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="qualification" fontWeight="bold" color="white">
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
          <FormLabel htmlFor="experience" fontWeight="bold" color="white">
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
          <FormLabel htmlFor="working" fontWeight="bold" color="white">
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
        <FormLabel htmlFor="mastery" fontWeight="bold" color="white">
          Mastery
        </FormLabel>
        <Input
          id="mastery"
          type="text"
          placeholder="frontend, react, django, ..."
          {...register("mastery", {
            required: "Mastery is required",
          })}
          color="white"
        />
        <p className="err">{errors.mastery && errors.mastery.message}</p>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="cv" fontWeight="bold" color="white">
          Upload your CV
        </FormLabel>
        <label className="custom-upload">
          <MdCloudUpload w={"2px"} h={"2px"} />
          &nbsp; &nbsp; Select a File {cv && `- ${cv.name}`}
          <input
            id="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("cv", { required: "CV upload is required" })}
            onChange={(e) => {
              setCV(e.target.files[0]);
            }}
          />
        </label>
        <p className="err">{errors.cv && errors.cv.message}</p>
      </FormControl>
    </>
  );
};

export default Form2;