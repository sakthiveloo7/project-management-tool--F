import React from "react";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { Button, Grid, Typography } from "@mui/material";
import { colors } from "../../utils/Colors";

Chart.register(ArcElement, Tooltip);

const ProjectStatus = () => {
  const { singleProject, tasks } = useGlobalUserContext();

  const grouped = Object.groupBy(
    singleProject?.team?.members,
    (item) => item?.name
  );

  const data = Object.values(grouped).map((item) => {
    const taskCompleted = tasks?.filter(
      (e) => e?.assignedTo?._id === item[0]?._id && e?.stage === "completed"
    );

    return taskCompleted.length;
  });

  const bgColor = Array(Object.keys(grouped).length);
  for (let i = 0; i < bgColor.length; i++) bgColor[i] = colors[i];

  const labels = [...Object.keys(grouped)];
  const completedData = Object.values(grouped).map((item, ind) => {
    return {
      member: labels[ind],
      contribution: (data[ind] / singleProject?.noOfTasks) * 100,
    };
  });

  const totalTaskCompleted = data.reduce((prev, curr) => prev + curr, 0);

  const config = {
    data: {
      labels: labels,
      datasets: [
        {
          label: "Tasks Completed",
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

      plugins: {
        tooltip: {
          enabled: true,
          position: "nearest",
        },
      },
    },
  };

  return (
    <div className="my-4">
      <Typography fontSize={24} color="primary" mb={4}>
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
                {(
                  (totalTaskCompleted / singleProject?.noOfTasks) *
                  100
                ).toFixed(2)}
                %
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
                  <Typography className="Typography member-name">
                    {member},
                  </Typography>
                  <Typography className="Typography member-contro">
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
    </div>
  );
};

export default ProjectStatus;
