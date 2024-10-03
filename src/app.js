import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  VStack,
} from "@chakra-ui/react";
import { postData } from "./helpers/api";

function App() {
  const url = " http://localhost:8000/person/";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const postFormData = postData(url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      course,
      age: Number(age),
    };

    try {
      const result = await postFormData(formData);
      console.log("Form data submitted:", result);
      setFirstName("");
      setLastName("");
      setCourse("");
      setAge("");
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" py={10} px={6}>
        <Heading mb={6}>{"Enter Individual Details"}</Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} maxWidth="400px" margin="0 auto">
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                size="lg"
                focusBorderColor="teal.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                size="lg"
                focusBorderColor="teal.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>University Course</FormLabel>
              <Input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Enter university course"
                size="lg"
                focusBorderColor="teal.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                size="lg"
                focusBorderColor="teal.500"
              />
            </FormControl>

            <Button colorScheme="teal" size="lg" type="submit">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default App;
