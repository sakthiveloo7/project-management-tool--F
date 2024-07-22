import { Box, Grid } from "@mui/material";
import React from "react";
import FeaturesData from "../../utils/FeaturesData";
import SectionHeading from "../SectionHeading";
import Cards from "../Cards";

const Features = () => {
  return (
    <Box>
      <div className="section-container">
        <SectionHeading title="Features" />
        <Grid container rowSpacing={6} columnSpacing={3}>
          {FeaturesData.map((item) => {
            const { id, title, desc, img } = item;
            return (
              <Grid item md={4} xs={12} key={id}>
                <Cards title={title} desc={desc} img={img} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Box>
  );
};

export default Features;
