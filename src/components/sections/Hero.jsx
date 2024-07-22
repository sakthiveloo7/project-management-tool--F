import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import HeroImage from "../../assets/hero-img.png";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <Grid container spacing={2} alignItems="center" className="hero-grid">
        <Grid item md={6} xs={12}>
          <Typography className="Typography title">
            <TypeAnimation
              sequence={[
                "Your Ultimate Project Companion: Free and Online!",
                1000,
                "Effortless Project Excellence: Your Free and Online Command Center!",
                1000,
                "Seamless Project Harmony: Unlock Your Free Online Toolkit!",
                1000,
                "Elevate Your Projects: Experience the Free and Online Project Mastery!",
                1000,
                "Empower Your Work: Unleash the Free Online Magic of Project Efficiency!",
                100,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </Typography>
          <Typography className="Typography text">
            Say goodbye to project chaos! With our free online project
            management tool, you can effortlessly organize and manage both your
            individual projects and collaborative team efforts—all in one
            convenient place.
          </Typography>
          <Button variant="contained" onClick={() => navigate("../auth")}>
            Get Started
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <img src={HeroImage} alt="frontimg" className="hero-img" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Hero;
