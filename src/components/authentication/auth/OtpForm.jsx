import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const OtpForm = ({ length, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (ind, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[ind] = value.substring(value.length - 1); // only one digit is allowed and that is last digit
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");

    if (value && ind + 1 < length && inputs.current[ind + 1]) {
      inputs.current[ind + 1].focus();
    }

    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }
  };

  const handleClick = (ind) => {
    // when user click at some field curson moves to the last position
    inputs.current[ind].setSelectionRange(1, 1); // The HTMLInputElement.setSelectionRange() method sets the start and end positions of the current text selection in an <input> or <textarea> element.

    // if some field is empty before current field so focus there
    if (ind > 0 && !otp[ind - 1]) {
      inputs.current[otp.indexOf("")].focus();
    }

    // if some field is filled after current field so focus the last empty field
    if (ind < length - 1 && otp[ind + 1]) {
      inputs.current[otp.lastIndexOf("")].focus();
    }
  };

  const handleKeyDown = (ind, e) => {
    // backspace
    const key = e.key;
    if (
      key === "Backspace" &&
      !otp[ind] &&
      ind - 1 >= 0 &&
      inputs.current[ind - 1]
    ) {
      // move to previous field if ind>0 and no input at current index and we have reference to prev field
      inputs.current[ind - 1].focus();
    }
  };

  useEffect(() => {
    if (inputs.current[0]) inputs.current[0].focus();
  }, []);

  return (
    <div className="mx-auto">
      <Typography fontSize={18} mb={1}>Enter OTP</Typography>
      <div className="otp-container">
        {otp.map((item, ind) => {
          return (
            <input
              key={ind}
              type="text"
              ref={(input) => (inputs.current[ind] = input)}
              value={item}
              className="form-control shadow-sm border border-1 p-3 me-3 text-center"
              onChange={(e) => handleChange(ind, e.target.value)}
              onClick={(e) => handleClick(ind)}
              onKeyDown={(e) => handleKeyDown(ind, e)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OtpForm;
