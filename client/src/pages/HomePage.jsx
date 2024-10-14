import React from "react";
import { Box, Heading, Button, VStack } from "@chakra-ui/react";

const HomePage = ({ onSelectTest }) => {
  return (
    <Box
      textAlign="center"
      style={{ display: "flex", flexDirection: "column", marginTop: "10.5rem" }}
      p={10}
    >
      <Heading mb={6} fontSize={21} opacity={0.7}>
        Evaluate your knowledge and understanding about Front-end Stacks by
        selecting a Test.
      </Heading>
      <VStack
        marginTop="4rem"
        gap="5rem"
        justifyContent="center"
        flexDirection="row"
      >
        <Button size="lg" onClick={() => onSelectTest("html")}>
          HTML MCQs
        </Button>
        <Button size="lg" onClick={() => onSelectTest("reactjs")}>
          ReactJS MCQs
        </Button>
        <Button size="lg" onClick={() => onSelectTest("css")}>
          CSS MCQs
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;
