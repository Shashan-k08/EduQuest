import React, { useState } from "react";

const ConfirmationModal = ({ onStart }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="modal">
      <h1>Ready to Start the Exam?</h1>
      <ul style={{ fontSize: "12px", textAlign: "start", marginTop: "1rem" }}>
        <li>You are not allowed to leave the exam screen during the test.</li>
        <li>The exam must be completed in one sitting.</li>
        <li>
          The exam will be conducted in full-screen mode for the entire
          duration.
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          fontSize: "12px",
          alignItems: "center",
          gap: "11px",
          marginTop: "1rem",
        }}
      >
        <input
          type="checkbox"
          style={{ width: "max-content", marginBottom: "0" }}
          id="confirm"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="confirm">
          I have read and understood the instructions.
        </label>
      </div>
      <button
        className="start-btn"
        onClick={onStart}
        style={{ opacity: isChecked ? "1" : "0.6" }}
        disabled={!isChecked}
      >
        Start Exam
      </button>
    </div>
  );
};

export default ConfirmationModal;
