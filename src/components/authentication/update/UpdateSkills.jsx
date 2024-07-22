import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const UpdateSkills = ({ update, setUpdate, role }) => {
  const [add, setAdd] = useState(false);
  const [skill, setSkill] = useState("");

  const handleDelete = (skill) =>
    setUpdate({
      ...update,
      expertise: update?.expertise?.filter((s) => s !== skill),
    });

  const handleAdd = () => {
    setUpdate({
      ...update,
      expertise: [...update?.expertise, skill],
    });
    setAdd(false);
    setSkill("");
  };

  return (
    <Box className="mb-5">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item md={6}>
          <Typography fontSize={18}>
            {role === "user" ? "Skills" : "Expertise"}
          </Typography>
        </Grid>
        <Grid item md={6} textAlign="end">
          {!add && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => setAdd(true)}
            >
              Add More
            </Button>
          )}
        </Grid>
      </Grid>
      {add && (
        <Grid container spacing={2} my={1} alignItems="center">
          <Grid item md={10}>
            <TextField
              type="text"
              label="Skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item md={2}>
            <CheckIcon
              color="success"
              sx={{ cursor: "pointer" }}
              onClick={handleAdd}
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} mt={1} alignItems="center">
        {update?.expertise?.map((skill, index) => {
          return (
            <Grid item md={3}>
              <Chip
                label={skill}
                variant="outlined"
                key={index}
                onDelete={() => handleDelete(skill)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default UpdateSkills;
