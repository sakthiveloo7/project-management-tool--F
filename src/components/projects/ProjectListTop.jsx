import { Grid, Typography } from "@mui/material";
import React from "react";
import AddProject from "./AddProject";

const ProjectListTop = ({
  isTeamProject,
  team,
  ind,
  personalPro,
  isGrpLeader,
}) => {
  return (
    <Grid container alignItems="center" mb={-2}>
      <Grid item md={10} xs={10}>
        <Typography color="primary" className="Typography heading">
          Project
        </Typography>
      </Grid>
      <Grid item md={2} xs={2}>
        {(personalPro || isGrpLeader) && (
          <AddProject isTeamProject={isTeamProject} team={team} ind={ind} />
        )}
      </Grid>
    </Grid>
  );
};

export default ProjectListTop;
