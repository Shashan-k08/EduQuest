import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";

const QuestionScreen = ({ questions, onSubmit, onTerminate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  //Detect if user switches the tab or leaves the window and wait for 5 seconds
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Start a timeout for 5 seconds
        const id = setTimeout(() => {
          onTerminate("Terminated due to switching of tab or window.");
        }, 5000); // 5 seconds in milliseconds
        setTimeoutId(id);
      } else {
        // If the user returns within 5 seconds, clear the timeout
        clearTimeout(timeoutId);
      }
    };

    const handleWindowBlur = () => {
      // Start a timeout for 5 seconds if user leaves the window
      const id = setTimeout(() => {
        onTerminate("Terminated due to switching of tab or window.");
      }, 5000);
      setTimeoutId(id);
    };

    const handleWindowFocus = () => {
      // Clear timeout if user comes back to window within 5 seconds
      clearTimeout(timeoutId);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    // Cleanup event listeners and timeout on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      clearTimeout(timeoutId);
    };
  }, [onTerminate, timeoutId]);
  const nextQuestion = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(updatedAnswers[currentQuestionIndex + 1] || "");
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(userAnswers[currentQuestionIndex - 1] || "");
    }
  };

  const clearSelection = () => {
    setSelectedOption(""); // Clear the selected option
  };

  const handleSubmit = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(updatedAnswers);

    let finalScore = 0;
    updatedAnswers.forEach((answer, index) => {
      if (parseInt(answer) === questions[index].correct) {
        finalScore += 1;
      }
    });

    onSubmit("Submitted", finalScore);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={6} color="teal.500">{`Question ${
        currentQuestionIndex + 1
      }`}</Heading>
      <Text fontSize="xl" mb={4}>
        {currentQuestion.question}
      </Text>

      <RadioGroup onChange={setSelectedOption} value={selectedOption}>
        <VStack align="start" spacing={4}>
          {currentQuestion.options.map((option, index) => (
            <Radio key={index} value={index.toString()} size="lg">
              {option}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
      <Button
        colorScheme="blackAlpha"
        variant="outline"
        mt={2}
        onClick={clearSelection}
        style={{marginLeft:"-83%", marginTop:"1.5rem"}}
      >
        Clear Selection
      </Button>
      <Stack direction="row" style={{marginTop:"10rem"}} justify="space-between" mt={8}>
        <Button
          colorScheme="teal"
          onClick={prevQuestion}
          isDisabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          colorScheme="teal"
          onClick={nextQuestion}
          isDisabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </Button>
      </Stack>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Exam
      </button>
    </Box>
  );
};

export default QuestionScreen;
