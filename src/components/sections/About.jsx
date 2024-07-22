import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import AboutImg1 from "../../assets/about-1.jpeg";
import AboutImg2 from "../../assets/about-2.jpeg";
import SectionHeading from "../SectionHeading";

const About = () => {
  const para1 =
    "A project management tool is a specialized software designed to help individuals and teams efficiently plan, organize, and execute projects from start to finish. It serves as a central hub for all project-related activities, providing features that facilitate collaboration, communication, and task management. These tools typically include functionalities such as task assignment, progress tracking, timeline visualization, file sharing, and communication tools to streamline project workflows.";

  const para2 =
    "By offering a structured framework, project management tools enable users to break down complex projects into manageable tasks, set deadlines, allocate resources effectively, and monitor the overall progress. They enhance coordination among team members, ensuring everyone is on the same page and contributing to the project's success. Ultimately, project management tools contribute to increased productivity, better communication, and the successful completion of projects within specified timeframes and budgets.";

  return (
    <Box>
      <div className="section-container">
        <SectionHeading title="About" />
        <Grid container spacing={3} alignItems="center">
          <Grid item md={4}>
            <img src={AboutImg1} alt="about" />
          </Grid>
          <Grid item md={8}>
            <Typography fontSize={35} fontWeight="bold" color="InfoText" className="Typography about-heading">
              What is project management tool?
            </Typography>
            <Typography color="GrayText" fontSize={18} textAlign="justify">
              {para1}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item md={8}>
            <Typography
              color="GrayText"
              fontSize={18}
              py={3}
              textAlign="justify"
            >
              {para2}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <img src={AboutImg2} alt="about" />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default About;
