import { Text } from "@chakra-ui/react";
import React from "react";

const Report = ({ examStatus, score, totalQuestions, onRestart }) => {
  return (
    <div className="report">
      <h1>Exam {examStatus}</h1>
      <Text fontSize="2xl" mb={4}>
        Your Score: {score} / {totalQuestions}
      </Text>
      <button className="restart-btn" onClick={onRestart}>
        Restart Exam
      </button>
    </div>
  );
};

export default Report;
