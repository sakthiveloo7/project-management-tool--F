import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UploadIcon from "@mui/icons-material/Upload";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import { useGlobalUserContext } from "../../contexts/UserContext";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  maxWidth: "95%",
  background: "#fff",
  borderRadius: 2,
  p: 4,
};

const UploadCodeFile = ({ taskId, edit }) => {
  const { user, dispatch } = useGlobalUserContext();
  const [open, setOpen] = React.useState(false);
  const [codeFile, setCodeFile] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload code file", {
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
        toast.success("Code file uploaded successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setCodeFile({ fileName: resp.public_id, file: resp.url });
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
    console.log(codeFile);
    setLoading(true);

    if (Object.keys(codeFile).length === 0) {
      setLoading(false);
      return toast.error("Please upload code file.", {
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
      const res = await fetch(`${api}/api/task/uploadCodeFile/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ codeFile }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Code File Uploaded.", {
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
      {edit ? (
        <EditIcon
          className="icon fs-5 text-success"
          onClick={() => setOpen(true)}
        />
      ) : (
        <UploadIcon className="icon fs-5" onClick={() => setOpen(true)} />
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={24} fontWeight="bold">
            {edit ? "Edit" : "Upload"} Code File
          </Typography>
          <input
            className="form-control border mt-2 mb-4"
            type="file"
            name="attachment"
            id="attachment"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
          <Button
            variant="contained"
            disabled={loading}
            onClick={handlesSubmit}
          >
            Upload
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadCodeFile;
