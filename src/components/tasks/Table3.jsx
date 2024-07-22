import React, { useState } from "react";
import {
  Avatar,
  Button,
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
import DueDate from "./DueDate";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditTaskStage from "./EditTaskStage";
import { api } from "../../utils/Api";
import { toast } from "react-toastify";
import { useGlobalUserContext } from "../../contexts/UserContext";
import TextFieldInput from "../authentication/auth/TextField";

const Table3 = ({ filteredTasks, fromAssigned }) => {
  const [openBox, setOpenBox] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useGlobalUserContext();

  const verifyTask = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/task/teamLeaderVerifyTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Work verified and send to guide for verification 👍", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "UPDATE_TASK",
          payload: { taskId: id, task: data.task },
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const unVerifyTask = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/task/teamLeaderUnVerifyTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ message: messageValue }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Work verified and send back to assigned user", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "UPDATE_TASK",
          payload: { taskId: id, task: data.task },
        });

        setOpenBox(false);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const requestToChange = async (id) => {
    try {
      const res = await fetch(`${api}/api/task/requestTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Requested", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "REQUEST_TO_CHANGE", payload: id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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
                  Action
                </Typography>
              </TableCell>
              {!fromAssigned && (
                <TableCell align="center">
                  <Typography fontSize={18} fontWeight="bold" color="GrayText">
                    Verification Status
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
                  assignedUserRequestedToChangeStage,
                  dueDate,
                  attachment,
                  isVerifiedByTeamLeader,
                } = task;

                return (
                  <TableRow key={_id}>
                    <TableCell width={500}>
                      <Typography fontSize={20} fontWeight="bold">
                        {name}
                      </Typography>
                      <Typography fontSize={16}>{description}</Typography>
                      {fromAssigned && assignedUserRequestedToChangeStage && (
                        <Typography mt={1} fontSize={12} color="GrayText">
                          This user requested you to change the status because
                          of wrong attachment. Please click on share icon to
                          change stage to "InProgress"
                        </Typography>
                      )}
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
                    <TableCell align="center">
                      {!fromAssigned ? (
                        !assignedUserRequestedToChangeStage && (
                          <Tooltip title="Request leader to change status">
                            <Button
                              variant="contained"
                              color="error"
                              sx={{ textTransform: "capitalize" }}
                              className="d-block mx-auto"
                              onClick={() => requestToChange(_id)}
                              disabled={assignedUserRequestedToChangeStage}
                            >
                              Request
                            </Button>
                          </Tooltip>
                        )
                      ) : assignedUserRequestedToChangeStage ? (
                        <EditTaskStage taskId={_id} status={stage} />
                      ) : (
                        !isVerifiedByTeamLeader &&
                        (!openBox ? (
                          <div>
                            <Button
                              color="success"
                              variant="contained"
                              onClick={() => verifyTask(_id)}
                              disabled={loading}
                            >
                              Correct
                            </Button>
                            <Button
                              color="error"
                              variant="contained"
                              className="ms-1"
                              disabled={loading}
                              onClick={() => setOpenBox(true)}
                            >
                              Wrong
                            </Button>
                          </div>
                        ) : (
                          <div className="mt-2">
                            <TextFieldInput
                              type="text"
                              others="message"
                              value={messageValue}
                              onChange={(e) => setMessageValue(e.target.value)}
                              multiline={true}
                              rows={3}
                              title="What is the fault in the work?"
                              autoFocus={true}
                            />
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => unVerifyTask(_id)}
                              disabled={loading}
                            >
                              Submit
                            </Button>
                          </div>
                        ))
                      )}
                    </TableCell>
                    {!isVerifiedByTeamLeader && !fromAssigned && (
                      <TableCell align="center">
                        <Chip
                          label="Under Verification"
                          color="error"
                          variant="outlined"
                          className="fw-bold"
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

export default Table3;
