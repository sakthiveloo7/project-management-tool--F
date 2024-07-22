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
import UploadCodeFile from "../projects/UploadCodeFile";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DownloadIcon from "@mui/icons-material/Download";
import { useGlobalUserContext } from "../../contexts/UserContext";
import UploadToGithub from "../projects/UploadToGithub";
import VerifiedIcon from "@mui/icons-material/Verified";

const Table5 = ({ filteredTasks, fromAssigned }) => {
  const { singleProject } = useGlobalUserContext();

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
                  Verified By Both
                </Typography>
              </TableCell>
              {!fromAssigned ? (
                <TableCell align="center">
                  <Typography fontSize={18} fontWeight="bold" color="GrayText">
                    Upload Code File
                  </Typography>
                </TableCell>
              ) : (
                <>
                  <TableCell align="center">
                    <Typography
                      fontSize={18}
                      fontWeight="bold"
                      color="GrayText"
                    >
                      Code File
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      fontSize={18}
                      fontWeight="bold"
                      color="GrayText"
                    >
                      Upload to Github
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
                  _id,
                  stage,
                  assignedTo,
                  dueDate,
                  isVerifiedByTeamLeader,
                  isVerifiedByGuide,
                  codeFile,
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
                    {isVerifiedByTeamLeader && isVerifiedByGuide && (
                      <TableCell align="center">
                        <VerifiedIcon
                          color="success"
                          className="d-inline-block mx-auto"
                        />
                        <VerifiedIcon
                          color="success"
                          className="d-inline-block mx-auto"
                        />
                      </TableCell>
                    )}

                    {!fromAssigned ? (
                      <TableCell align="center">
                        {!codeFile ? (
                          <UploadCodeFile taskId={_id} />
                        ) : !codeFile?.uploadedToGit ? (
                          <div className="d-flex align-items-center justify-content-center">
                            <Tooltip title="View code file">
                              <Link
                                to={codeFile?.file}
                                target="_blank"
                                className="link me-2"
                                download={codeFile?.fileName}
                              >
                                <VisibilityIcon className="fs-5" />
                              </Link>
                            </Tooltip>
                            <Tooltip title="Edit code file">
                              <UploadCodeFile taskId={_id} edit={true} />
                            </Tooltip>
                          </div>
                        ) : (
                          <Typography fontWeight="bold">Uploaded</Typography>
                        )}
                      </TableCell>
                    ) : (
                      <>
                        <TableCell align="center">
                          {codeFile ? (
                            !codeFile?.uploadedToGit ? (
                              <Link
                                to={codeFile?.file}
                                download={codeFile?.fileName}
                                target="_blank"
                                className="link"
                              >
                                <Tooltip title="Download">
                                  <DownloadIcon className="icon fs-5 text-dark" />
                                </Tooltip>
                              </Link>
                            ) : (
                              <Typography fontWeight="bold">-</Typography>
                            )
                          ) : (
                            <Typography fontSize={12} color="GrayText">
                              Code file not uploaded
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {codeFile ? (
                            singleProject?.gitHubDetails ? (
                              !codeFile?.uploadedToGit ? (
                                <UploadToGithub
                                  taskId={_id}
                                  codeFile={codeFile}
                                  gitHubDetails={singleProject?.gitHubDetails}
                                />
                              ) : (
                                <Tooltip title="Uploaded to git">
                                  <DoneAllIcon
                                    color="success"
                                    className="fs-4"
                                  />
                                </Tooltip>
                              )
                            ) : (
                              <Typography fontSize={12} color="GrayText">
                                Please add github details
                              </Typography>
                            )
                          ) : (
                            <Typography fontWeight="bold">-</Typography>
                          )}
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

export default Table5;
