import { Typography } from "@mui/material";
import React from "react";

const SectionHeading = ({ title }) => {
  return (
    <Typography
      textAlign="left"
      fontSize={54}
      fontWeight="bold"
      mb={4}
      color="primary"
      className="Typography section-heading"
    >
      {title}
    </Typography>
  );
};

export default SectionHeading;
