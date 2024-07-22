import { Avatar, Box, Chip, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

const ProjectMembers = ({ members, teamLeader }) => {
  return (
    <Box>
      <Typography color="primary" className="Typography heading" mb={1}>
        Group members
      </Typography>
      <Box>
        {members?.length > 0 &&
          members?.map((item, index) => (
            <Grid
              container
              key={index}
              alignItems="center"
              mb={1}
              className="pe-1"
            >
              <Grid item md={2} xs={2}>
                <Avatar src={item?.profilePic} alt={item?.name} />
              </Grid>
              <Grid item md={9} xs={9}>
                <Tooltip title={item?._id === teamLeader?._id && "Team Leader"} placement="bottom-start">
                  <Typography
                    fontWeight={item?._id === teamLeader?._id && "bold"}
                  >
                    {item?.name}
                  </Typography>
                </Tooltip>
                {/* {item?._id === teamLeader?._id && (
                  <Chip
                    label="Team Leader"
                    color="success"
                    variant="outlined"
                  />
                )} */}
              </Grid>
              <Grid item md={1} xs={1}>
                <Link to={item?.linkedin} target="_blank" className="link">
                  <LinkedInIcon className="icon text-primary" />
                </Link>
              </Grid>
            </Grid>
          ))}
      </Box>
    </Box>
  );
};

export default ProjectMembers;
