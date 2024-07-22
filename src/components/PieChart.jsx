import React from "react";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

const PieChart = ({ completed, uncompleted, remainingToAssign }) => {
  const config = {
    type: "pie",
    data: {
      labels: ["Completed", "Uncompleted", "Remaining to assign"],
      datasets: [
        {
          label: "Tasks ",
          data: [completed, uncompleted, remainingToAssign],
          backgroundColor: ["#15F5BA", "#FFDC34", "#243A73"],
          hoverOffset: 4,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  return (
    <div className="pie-div">
      <Pie {...config} />
    </div>
  );
};

export default PieChart;
