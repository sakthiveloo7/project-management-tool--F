import { Chip, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Data from "./Data";
import GuideProjectStatus from "../guide/GuideProjectStatus";
import TasksStats from "./TasksStats";
import { useGlobalUserContext } from "../../contexts/UserContext";

const ProjectRow = ({ e, ind }) => {
  const { allTasks } = useGlobalUserContext();
  const { title, description, start, end, team, noOfTasks, guide, _id } = e;
  const filteredTasks = allTasks?.filter((item) => item?.project?._id === _id);

  return (
    <TableRow key={_id}>
      <Data align="center" text={`${ind + 1}.`} fromData={true} />
      <Data align="center" text={title} fromData={true} />
      <Data
        align="center"
        text={description}
        fromData={true}
        description={true}
      />
      <Data align="center" text={guide?.name} fromData={true} />
      <Data align="center" text={team?.name} fromData={true} />
      <TableCell align="center">
        <Chip
          label={new Date(start).toDateString()}
          variant="outlined"
          className="fw-bold"
        />
      </TableCell>
      <TableCell align="center">
        <Chip
          label={new Date(end).toDateString()}
          variant="outlined"
          className="fw-bold"
        />
      </TableCell>
      <TableCell align="center">
        <GuideProjectStatus
          project={e}
          tasks={filteredTasks}
          fromAdmin={true}
        />
      </TableCell>
      <Data align="center" text={noOfTasks} fromData={true} />
      <TableCell align="center">
        <TasksStats
          tasks={filteredTasks}
          teamLeader={team?.teamLeader}
          noOfTasks={noOfTasks}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
