import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import { useGlobalUserContext } from "../../contexts/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxWidth: "95%",
  background: "#fff",
  borderRadius: 2,
  p: 4,
};

const Label = styled(FormControlLabel)`
  text-transform: capitalize;
  margin-top: 5px;
  margin-right: 20px;
`;

const EditTaskStage = ({ taskId, status }) => {
  const [open, setOpen] = React.useState(false);
  const [stage, setStage] = React.useState("");
  const [attachment, setAttachment] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { user, dispatch } = useGlobalUserContext();

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload your work", {
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

    if (file.type !== "application/pdf") {
      setLoading(false);
      return toast.error("Only PDF files are accepted.", {
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

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/auto/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "pmt-pdf-upload");
      data.append("class", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();
      if (resp) {
        toast.success("PDF file uploaded successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setAttachment({ fileName: resp.public_id, file: resp.url });
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

  const handlesSubmit = async () => {
    setLoading(true);

    if (!stage) {
      setLoading(false);
      return toast.error("Please select stage.", {
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

    if (stage === "to verify by teamLeader" && Object.keys(attachment).length === 0) {
      setLoading(false);
      return toast.error("Please upload pdf file.", {
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

    try {
      const res = await fetch(`${api}/api/task/updateTaskStage/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          stage,
          attachment,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Task Stage Updated.", {
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
          payload: { taskId, task: data.task },
        });
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

  return (
    <div>
      <Tooltip title="Change task status">
        <AutorenewIcon
          color="primary"
          onClick={() => setOpen(true)}
          className="icon fs-5"
        />
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            fontSize={26}
            mb={1}
            fontWeight="bold"
          >
            Change Your Task Status
          </Typography>
          <div>
            <Typography fontSize={20}>Select Status</Typography>
            <FormControl fullWidth>
              <RadioGroup row>
                {["todo", "inProgress", "to verify by teamLeader"]
                  .filter((item) => item !== status)
                  .map((stg, index) => {
                    return (
                      <Label
                        key={index}
                        value={stg}
                        label={stg}
                        control={<Radio />}
                        onChange={(e) => setStage(e.target.value)}
                      />
                    );
                  })}
              </RadioGroup>
            </FormControl>
          </div>
          {stage === "to verify by teamLeader" && (
            <div className="mt-3">
              <Typography fontSize={18} mb={1}>
                Upload your work in PDF format to be reviewed by guide (Add
                Screenshots also for better understanding)
              </Typography>
              <input
                className="form-control border"
                type="file"
                name="attachment"
                id="attachment"
                onChange={(e) => handleUpload(e.target.files[0])}
                accept=".pdf"
              />
            </div>
          )}
          <Button
            className="mt-4"
            variant="contained"
            color="primary"
            onClick={handlesSubmit}
            disabled={loading}
          >
            Change
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditTaskStage;
