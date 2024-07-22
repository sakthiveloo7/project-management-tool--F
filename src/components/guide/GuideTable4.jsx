import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DueDate from "../tasks/DueDate";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { api } from "../../utils/Api";
import VerifiedIcon from "@mui/icons-material/Verified";
import TextFieldInput from "../authentication/auth/TextField";

const GuideTable4 = ({ filteredTasks }) => {
  const [openBox, setOpenBox] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useGlobalUserContext();

  const verifyTask = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/guide/verifyTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Work verified and marked as completed 👍", {
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
      const res = await fetch(`${api}/api/guide/unverifyTask/${id}`, {
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
              <TableCell align="center">
                <Typography fontSize={18} fontWeight="bold" color="GrayText">
                  Verify Work
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length > 0 &&
              filteredTasks?.map((task) => {
                const {
                  _id,
                  name,
                  description,
                  stage,
                  assignedTo,
                  dueDate,
                  isVerifiedByTeamLeader,
                  isVerifiedByGuide,
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
                    <TableCell align="center">
                      {!isVerifiedByGuide &&
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
                        ))}
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

export default GuideTable4;
