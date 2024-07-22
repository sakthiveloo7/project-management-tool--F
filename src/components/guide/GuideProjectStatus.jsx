import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ArcElement, Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Grid } from "@mui/material";
import { colors } from "../../utils/Colors";

Chart.register(ArcElement);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1250,
  maxWidth: "95%",
  background: "#fff",
  borderRadius: 2,
  p: 4,

  "@media only screen and (max-width: 890px)": {
    height: "750px",
    overflowY: "scroll",
  },
};

const GuideProjectStatus = ({ project, tasks, fromAdmin }) => {
  const [open, setOpen] = React.useState(false);
  const grouped =
    Object.keys(project).length > 0 &&
    Object.groupBy(project?.team?.members, (item) => item?.name);

  const data = Object.values(grouped).map((item) => {
    const tasksCompleted = tasks?.filter(
      (e) => e?.assignedTo?._id === item[0]?._id && e?.stage === "completed"
    )?.length;

    return tasksCompleted;
  });

  const labels = [...Object.keys(grouped)];
  const completedData = Object.values(grouped).map((item, ind) => {
    return {
      member: labels[ind],
      contribution: (data[ind] / project?.noOfTasks) * 100,
    };
  });

  const totalTasksCompleted = data.reduce((prev, curr) => prev + curr, 0);
  const percentage = (totalTasksCompleted / project?.noOfTasks) * 100;

  const bgColor = Array(Object.keys(grouped).length);
  for (let i = 0; i < bgColor.length; i++) bgColor[i] = colors[i];

  const config = {
    data: {
      labels: labels,
      datasets: [
        {
          label: "Expense tracker",
          data: [...data.sort((a, b) => b - a)],
          backgroundColor: bgColor,
          hoverOffset: 4,
        },
      ],
    },

    options: {
      cutout: "80%",
      borderRadius: 50,
      spacing: 10,
      responsive: true,
      maintainAspectRatio: true,
    },
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        color={fromAdmin ? "primary" : "error"}
        sx={{ textTransform: "capitalize", fontWeight: "bold" }}
      >
        {fromAdmin ? "View" : "Project Status"}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={32} fontWeight="bold" mb={2}>
            Project Status
          </Typography>
          <Grid container alignItems="center">
            <Grid item md={6} xs={12}>
              <div className="chart">
                <div className="doughtnut-div">
                  <Doughnut {...config} />
                </div>
                <div className="text-center status">
                  <Typography fontSize={36} fontWeight="bold" color="primary">
                    Completed
                  </Typography>
                  <Typography fontSize={36} fontWeight="bold" color="primary">
                    {percentage.toFixed(2)}%
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              {completedData
                ?.sort((a, b) => b.contribution - a.contribution)
                .map((item, ind) => {
                  const { member, contribution } = item;
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
                        {member},
                      </Typography>
                      <Typography
                        fontSize={17}
                        display="inline-block"
                        className="ms-1"
                      >
                        Contribution: {contribution.toFixed(2)}%
                      </Typography>
                      <Button
                        sx={{
                          backgroundColor: bgColor[ind],
                        }}
                        className="Button color-btn"
                      />
                    </div>
                  );
                })}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default GuideProjectStatus;
