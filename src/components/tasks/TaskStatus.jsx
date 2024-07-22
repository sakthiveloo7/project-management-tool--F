import React from "react";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { Button, Grid, Typography } from "@mui/material";
import PieChart from "../PieChart";

const TaskStatus = ({ noOfTasks }) => {
  const { tasks } = useGlobalUserContext();

  const completed = tasks?.filter(
    (item) => item?.stage === "completed"
  )?.length;

  const uncompleted = tasks?.filter(
    (item) => item?.stage !== "completed"
  )?.length;

  const remainingToAssign = noOfTasks - tasks?.length;

  return (
    <div>
      <Typography color="primary" fontSize={24} my={3}>
        Tasks Status
      </Typography>
      <Grid
        container
        spacing={4}
        alignItems="start"
        paddingLeft={0}
      >
        <Grid item md={4} xs={12}>
          <PieChart
            completed={completed}
            uncompleted={uncompleted}
            remainingToAssign={remainingToAssign}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography fontSize={28} fontWeight="bold" mb={2}>
            Total Tasks: {noOfTasks}
          </Typography>
          {[
            { label: "Completed", color: "#15F5BA", number: completed },
            {
              label: "Uncompleted",
              color: "#FFDC34",
              number: uncompleted,
            },
            {
              label: "Remaining to assign",
              color: "#243A73",
              number: remainingToAssign,
            },
          ].map((item, ind) => {
            const { label, color, number } = item;
            return (
              <div
                key={ind}
                className="shadow-sm position-relative overflow-hidden rounded-2 p-3 my-4 ps-4"
              >
                <Typography
                  fontSize={20}
                  fontWeight="bold"
                  display="inline-block"
                >
                  {`${label} tasks -`}
                </Typography>
                <Typography
                  fontSize={20}
                  fontWeight="bold"
                  display="inline-block"
                  className="ms-1"
                >
                  {number}
                </Typography>
                <Button
                  sx={{
                    backgroundColor: color,
                    "&:hover": {
                      backgroundColor: color,
                    },
                  }}
                  className="Button color-btn pie"
                />
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskStatus;
