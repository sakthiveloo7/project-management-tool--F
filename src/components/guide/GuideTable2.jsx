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
import React from "react";
import DueDate from "../tasks/DueDate";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const GuideTable2 = ({ filteredTasks }) => {
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
              )?.length > 0 && (
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length > 0 &&
              filteredTasks?.map((task) => {
                const {
                  name,
                  description,
                  stage,
                  assignedTo,
                  dueDate,
                  isVerifiedByTeamLeader,
                  isVerifiedByGuide,
                  leaderMessage,
                  guideMessage,
                  attachment,
                } = task;

                return (
                  <TableRow>
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
                      <DueDate dueDate={dueDate} stage={stage} />
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
                    {isVerifiedByTeamLeader && leaderMessage && (
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
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GuideTable2;
