import React from "react";
import {
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import VerifiedIcon from "@mui/icons-material/Verified";
import DueDate from "../tasks/DueDate";

const GuideTable5 = ({ filteredTasks }) => {
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
              <TableCell align="center">
                <Typography fontSize={18} fontWeight="bold" color="GrayText">
                  Verified By Leader
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize={18} fontWeight="bold" color="GrayText">
                  Verified By Me
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize={18} fontWeight="bold" color="GrayText">
                  Uploaded to Github Repo
                </Typography>
              </TableCell>
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
                  codeFile,
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
                    {isVerifiedByTeamLeader && (
                      <TableCell align="center">
                        <VerifiedIcon
                          color="success"
                          className="d-block mx-auto"
                        />
                      </TableCell>
                    )}
                    {isVerifiedByGuide && (
                      <TableCell align="center">
                        <VerifiedIcon
                          color="success"
                          className="d-block mx-auto"
                        />
                      </TableCell>
                    )}
                    <TableCell align="center">
                      {codeFile?.uploadedToGit ? (
                        <Tooltip title="Uploaded to git">
                          <DoneAllIcon color="success" className="fs-4" />
                        </Tooltip>
                      ) : (
                        <Chip
                          label="Not uploaded"
                          className="fw-bold"
                          color="error"
                          variant="outlined"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GuideTable5;
