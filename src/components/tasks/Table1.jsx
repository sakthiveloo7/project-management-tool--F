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
import AddTask from "./TaskForm";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import { useGlobalUserContext } from "../../contexts/UserContext";
import DueDate from "./DueDate";
import EditTaskStage from "./EditTaskStage";
import DeleteIcon from "@mui/icons-material/Delete";

const Table1 = ({ filteredTasks, fromAssigned }) => {
  const { user, dispatch, singleProject } = useGlobalUserContext();

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${api}/api/task/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

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
              <TableCell>
                <Typography fontSize={18} fontWeight="bold" color="GrayText" width={500}>
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
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length > 0 &&
              filteredTasks?.map((task) => {
                const { name, description, _id, stage, assignedTo, dueDate } =
                  task;

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
                      {fromAssigned ? (
                        <div className="d-flex align-items-center justify-content-center">
                          <AddTask taskId={_id} singleProject={singleProject} />
                          <DeleteIcon
                            color="error"
                            className="icon fs-5"
                            onClick={() => deleteTask(_id)}
                          />
                        </div>
                      ) : (
                        <EditTaskStage taskId={_id} status={stage} />
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

export default Table1;
