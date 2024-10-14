import React from "react";
import { Text, Box } from "@chakra-ui/react";

const Timer = ({ time }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Box
      position="fixed"
      top="7rem"
      right="10px"
      bg="#7b7e83"
      color="white"
      p={3}
      borderRadius="md"
    >
      <Text fontSize="lg">Time Remaining: {formatTime(time)}</Text>
    </Box>
  );
};

export default Timer;
