import React from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DueDate from "./DueDate";
import EditTaskStage from "./EditTaskStage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const Table2 = ({ filteredTasks, fromAssigned }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={500}>
                <Typography fontSize={18} fontWeight="bold" color="GrayText">
                  Task Name & Description
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize={18} fontWeight="bold" color="GrayText">
                  Assignee
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize={18} fontWeight="bold" color="GrayText">
                  Due Date
                </Typography>
              </TableCell>
              {filteredTasks?.filter(
                (task) => task?.leaderMessage || task?.guideMessage
              )?.length > 0 && !fromAssigned && (
                <>
                  <TableCell align="center">
                    <Typography
                      fontSize={18}
                      fontWeight="bold"
                      color="GrayText"
                    >
                      Verification Status
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      fontSize={18}
                      fontWeight="bold"
                      color="GrayText"
                    >
                      Attachment
                    </Typography>
                  </TableCell>
                </>
              )}
              {!fromAssigned && (
                <TableCell align="center">
                  <Typography fontSize={18} fontWeight="bold" color="GrayText">
                    Action
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length > 0 &&
              filteredTasks?.map((task) => {
                const {
                  name,
                  description,
                  _id,
                  stage,
                  assignedTo,
                  isVerifiedByTeamLeader,
                  isVerifiedByGuide,
                  leaderMessage,
                  guideMessage,
                  dueDate,
                  attachment,
                } = task;

                return (
                  <TableRow key={_id}>
                    <TableCell width={500}>
                      <Typography fontSize={20} fontWeight="bold">
                        {name}
                      </Typography>
                      <Typography fontSize={16}>{description}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title={assignedTo?.name}>
                        <Avatar
                          className="d-block mx-auto"
                          src={assignedTo?.profilePic}
                          alt={assignedTo?.name}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <DueDate
                        dueDate={dueDate}
                        stage={stage}
                        email={assignedTo?.email}
                        fromAssigned={fromAssigned}
                      />
                    </TableCell>
                    {isVerifiedByGuide && guideMessage && (
                      <TableCell>
                        <Typography fontSize={14}>
                          Verified from guide with below message:{" "}
                        </Typography>
                        <Typography fontWeight="bold">
                          {guideMessage}
                        </Typography>
                      </TableCell>
                    )}
                    {isVerifiedByTeamLeader &&
                      leaderMessage &&
                      !fromAssigned && (
                        <>
                          <TableCell>
                            <Typography fontSize={14}>
                              Verified from leader with below message:{" "}
                            </Typography>
                            <Typography fontWeight="bold">
                              {leaderMessage}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Link
                              to={attachment?.file}
                              target="_blank"
                              className="link me-2"
                              download={attachment?.fileName}
                            >
                              <VisibilityIcon className="fs-5" />
                            </Link>
                          </TableCell>
                        </>
                      )}
                    {!fromAssigned && (
                      <TableCell align="center">
                        <EditTaskStage taskId={_id} status={stage} />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Table2;
