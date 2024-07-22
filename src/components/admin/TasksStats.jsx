import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Data from "./Data";
import { api } from "../../utils/Api";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import PieChart from "../PieChart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1300,
  maxWidth: "96%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const TasksStats = ({ tasks, teamLeader, noOfTasks }) => {
  const { user, dispatch } = useGlobalUserContext();
  const [open, setOpen] = React.useState(false);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString(undefined, options);
  };

  const canDelete = (stage, date) => {
    if (stage === "todo" || stage === "inProgress") {
      const d = new Date(date);
      const curr = new Date();

      const dueYear = d.getFullYear();
      const dueMonth = d.getMonth();
      const dDate = d.getDate();

      const currYear = curr.getFullYear();
      const currMonth = curr.getMonth();
      const currDate = curr.getDate();

      if (dueYear === currYear) {
        if (dueMonth === currMonth) {
          if (dDate - currDate < 0) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const handleDelete = async (id, assignee) => {
    try {
      const res = await fetch(
        `${api}/api/task/adminDeleteTask/${id}?assignedToName=${assignee?.name}&assignedToEmail=${assignee?.email}&teamLeaderEmail=${teamLeader?.email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Task Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "DELETE_TASK", payload: id });
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
      toast.success(error.message, {
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

  const completed = tasks?.filter(
    (item) => item?.stage === "completed"
  )?.length;

  const uncompleted = tasks?.filter(
    (item) => item?.stage !== "completed"
  )?.length;

  const remainingToAssign = noOfTasks - tasks?.length;

  return (
    <div>
      <Button onClick={() => setOpen(true)} color="info" variant="contained">
        <VisibilityIcon />
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="height-box">
            <Typography fontSize={26} fontWeight="bold" color="primary">
              Assigned Tasks List & Status
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <Data align="center" text="Sr. No." />
                    <Data align="start" text="Task" />
                    <Data align="start" text="Description" width={250} />
                    <Data align="center" text="Assignee" />
                    <Data align="center" text="Due Date" />
                    <Data align="center" text="Status" />
                    <Data align="center" text="Action" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks?.length > 0 ? (
                    tasks?.map((item, ind) => {
                      const {
                        name,
                        description,
                        stage,
                        dueDate,
                        assignedTo,
                        _id,
                      } = item;

                      return (
                        <TableRow key={_id}>
                          <Data
                            align="center"
                            text={`${ind + 1}.`}
                            fromData={true}
                          />
                          <Data align="start" text={name} fromData={true} />
                          <Data
                            align="start"
                            text={description}
                            description={true}
                            fromData={true}
                            width={250}
                          />
                          <TableCell align="center">
                            <Tooltip title={assignedTo?.name}>
                              <Avatar
                                className="d-block mx-auto"
                                src={assignedTo?.profilePic}
                                alt={assignedTo?.name}
                              />
                            </Tooltip>
                          </TableCell>
                          <Data
                            align="center"
                            text={formatDate(dueDate)}
                            fromData={true}
                          />
                          <TableCell align="center">
                            <Chip
                              label={
                                stage[0].toUpperCase() + stage.substring(1)
                              }
                              variant="outlined"
                              color={
                                stage === "completed"
                                  ? "success"
                                  : stage === "todo"
                                  ? "error"
                                  : "info"
                              }
                            />
                          </TableCell>
                          <TableCell align="center">
                            {canDelete(stage, dueDate) ? (
                              <Tooltip title="This task is not started or not submitted to leader and due date exceeds today. Hence DELETE!!">
                                <DeleteIcon
                                  color="error"
                                  className="icon fs-5"
                                  onClick={() => handleDelete(_id, assignedTo)}
                                />
                              </Tooltip>
                            ) : (
                              <Typography fontWeight="bold" fontSize={20}>
                                -
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableCell colSpan={6}>
                      <Typography>
                        No tasks assigned by the team leader
                      </Typography>
                    </TableCell>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography fontSize={26} fontWeight="bold" color="primary" my={2}>
              Tasks Status
            </Typography>
            <Grid container spacing={4} alignItems="start">
              <Grid item md={4} xs={12}>
                <PieChart
                  completed={completed}
                  uncompleted={uncompleted}
                  remainingToAssign={remainingToAssign}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography fontSize={28} fontWeight="bold" mb={2}>
                  Total Tasks: {noOfTasks}
                </Typography>
                {[
                  { label: "Completed", color: "#15F5BA", number: completed },
                  {
                    label: "Uncompleted",
                    color: "#FFDC34",
                    number: uncompleted,
                  },
                  {
                    label: "Remaining to assign",
                    color: "#243A73",
                    number: remainingToAssign,
                  },
                ].map((item, ind) => {
                  const { label, color, number } = item;
                  return (
                    <div
                      key={ind}
                      className="shadow-sm position-relative overflow-hidden rounded-2 p-3 my-4 ps-4"
                    >
                      <Typography
                        fontSize={20}
                        fontWeight="bold"
                        display="inline-block"
                      >
                        {`${label} tasks -`}
                      </Typography>
                      <Typography
                        fontSize={20}
                        fontWeight="bold"
                        display="inline-block"
                        className="ms-1"
                      >
                        {number}
                      </Typography>
                      <Button
                        sx={{
                          backgroundColor: color,
                          "&:hover": {
                            backgroundColor: color,
                          },
                        }}
                        className="Button color-btn"
                      />
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TasksStats;
