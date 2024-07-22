import { Box, Typography } from "@mui/material";
import React from "react";
import SectionHeading from "../SectionHeading";
import TestimonialSwiper from "../TestimonialSwiper";

const Reviews = () => {
  return (
    <Box>
      <div className="section-container">
        <SectionHeading title="Users Insights" />
        <TestimonialSwiper />
      </div>
    </Box>
  );
};

export default Reviews;
