import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import WarningModal from "./modals/WarningModal";
import QuestionScreen from "./QuestionScreen";

const ExamScreen = ({
  timerDuration,
  questions,
  onSubmit,
  onTerminate,
  enterFullScreen,
  score,
  setScore,
}) => {
  const [timer, setTimer] = useState(timerDuration);
  const [violationCount, setViolationCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(
        () => setTimer((prevTime) => prevTime - 1),
        1000
      );
    } else {
      onTerminate("Time Up");
    }

    document.addEventListener("fullscreenchange", handleFullScreenExit);
    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener("fullscreenchange", handleFullScreenExit);
    };
    // eslint-disable-next-line
  }, [timer]);

  const handleFullScreenExit = () => {
    if (!document.fullscreenElement) {
      if (violationCount === 0) {
        setIsModalOpen(true);
        setViolationCount(1);
      } else if (violationCount === 1) {
        onTerminate("Terminated due to multiple violations.");
      }
    }
  };

  const handleReEnterFullScreen = () => {
    enterFullScreen();
    setIsModalOpen(false);
  };

  return (
    <div className="exam-screen">
      <Timer time={timer} />
      <QuestionScreen
        questions={questions}
        onSubmit={onSubmit}
        score={score}
        setScore={setScore}
        onTerminate={onTerminate}
      />
      <WarningModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReEnterFullScreen={handleReEnterFullScreen}
      />
    </div>
  );
};

export default ExamScreen;
