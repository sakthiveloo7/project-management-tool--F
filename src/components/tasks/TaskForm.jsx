import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxWidth: "95%",
  background: "#fff",
  borderRadius: 2,
  p: 4,
};

const initialState = {
  name: "",
  description: "",
  assignedTo: "",
  dueDate: "",
};

const AddTask = ({ projectId, taskId, singleProject }) => {
  const { user, dispatch, tasks } = useGlobalUserContext();
  const [open, setOpen] = React.useState(false);
  const [taskDetails, setTaskDetails] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) =>
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    console.log(taskDetails);
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/task/addTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...taskDetails, project: projectId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Task Assigned", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "ADD_TASK", payload: data.task });
        setTaskDetails(initialState);
        setOpen(false);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const handleUpdateTask = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/task/updateTaskText/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(taskDetails),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Task Updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "UPDATE_TASK", payload: { taskId, task: data.task } });
        setTaskDetails(initialState);
        setOpen(false);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  React.useEffect(() => {
    tasks?.forEach((task) => {
      if (task._id === taskId) setTaskDetails(task);
    });
  }, [taskId]);

  return (
    <div>
      {!taskId ? (
        <Button
          onClick={() => setOpen(true)}
          color="secondary"
          variant="contained"
        >
          Assign Task
        </Button>
      ) : (
        <EditIcon
          color="info"
          onClick={() => setOpen(true)}
          className="icon fs-5 mx-1"
        />
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            fontSize={25}
            fontWeight="bold"
            mb={2}
          >
            {!taskId ? "Assign" : "Edit"} Task
          </Typography>
          <div className="mb-3">
            <FormControl fullWidth>
              <TextField
                type="text"
                label="Name"
                name="name"
                value={taskDetails.name}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <div className="mb-3">
            <FormControl fullWidth>
              <TextField
                type="text"
                multiline
                rows={4}
                label="Description"
                name="description"
                value={taskDetails.description}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          {singleProject?.isTeamProject && (
            <>
              <div className="mb-3">
                <Typography color="primary" className="Typography team" mb={1}>
                  Assigned To
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="select-user">User</InputLabel>
                  <Select
                    labelId="select-user"
                    id="select-user"
                    value={taskDetails.assignedTo}
                    label="User"
                    name="assignedTo"
                    onChange={handleChange}
                  >
                    {singleProject?.team?.members?.length > 0 &&
                      singleProject?.team?.members?.map((item) => {
                        return (
                          <MenuItem value={item?._id} key={item?._id}>
                            <Typography fontWeight="bold">
                              {item?.name}
                            </Typography>
                            <Typography color="GrayText" className="ms-1">
                              [Skills: {item?.expertise?.join(",")}]
                            </Typography>
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-3">
                <Typography color="primary" className="Typography team" mb={1}>
                  Due Date
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    type="date"
                    name="dueDate"
                    value={taskDetails.dueDate}
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
            </>
          )}
          <Button
            color="primary"
            variant="contained"
            onClick={!taskId ? handleSubmit : handleUpdateTask}
            disabled={loading}
          >
            {!taskId ? "Assign" : "Edit"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTask;
