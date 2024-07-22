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
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";

const Table4 = ({ filteredTasks, fromAssigned }) => {
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
                  Attachment
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize={18} fontWeight="bold" color="GrayText">
                  Verified By Leader
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
                  attachment,
                  isVerifiedByTeamLeader,
                  _id,
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
                    {isVerifiedByTeamLeader && (
                      <TableCell align="center">
                        <VerifiedIcon
                          color="success"
                          className="d-block mx-auto"
                        />
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

export default Table4;
