import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UploadIcon from "@mui/icons-material/Upload";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import { useGlobalUserContext } from "../../contexts/UserContext";
import TextFieldInput from "../authentication/auth/TextField";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

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

const UploadToGithub = ({ taskId, gitHubDetails, codeFile }) => {
  const { user, dispatch } = useGlobalUserContext();
  const [open, setOpen] = React.useState(false);
  const [path, setPath] = React.useState("");
  const [paths, setPaths] = React.useState([]);
  const [commitMessage, setCommitMessgae] = React.useState("");
  const [file, setFile] = React.useState(null);

  const [addNew, setAddNew] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (!file) {
      return toast.error("Please upload file", {
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
      const owner = gitHubDetails?.ownerName;
      const repo = gitHubDetails?.repository;
      const token = gitHubDetails?.token;
      const filePath = path
        ? `${path}/${codeFile?.fileName}`
        : `${codeFile?.fileName}`;

      const reader = new FileReader();

      reader.onloadend = async () => {
        const contentArrayBuffer = reader.result;
        const contentBase64 = btoa(
          String.fromCharCode.apply(null, new Uint8Array(contentArrayBuffer))
        );

        const payload = {
          message: commitMessage,
          content: contentBase64,
        };

        try {
          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
            {
              method: "PUT",
              headers: {
                Authorization: `token ${token}`,
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json",
              },
              body: JSON.stringify(payload),
            }
          );

          if (response.ok) {
            const res = await fetch(
              `${api}/api/task/uploadedToGithub/${taskId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user?.token}`,
                },
              }
            );

            const data = await res.json();
            if (data.success) {
              toast.success("Task uploaded successfully to github repo!", {
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

              setCommitMessgae("");
              setFile("");
              setPath("");
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
          } else {
            toast.error("Failed to upload tasks", response.statusText, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            console.log("Failed to upload tasks:", response.statusText);
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

      reader.readAsArrayBuffer(file);
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

  const fetchPaths = async () => {
    try {
      const owner = gitHubDetails?.ownerName;
      const repo = gitHubDetails?.repository;
      const token = gitHubDetails?.token;
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      const data = await res.json();
      setPaths([...data?.map((item) => item?.name)]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchPaths();
  }, []);

  return (
    <div>
      <UploadIcon className="icon fs-5" onClick={() => setOpen(true)} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={24} fontWeight="bold" mb={2}>
            Upload to Github
          </Typography>
          <Grid container className="mb-2" alignItems="center">
            <Grid item md={6}>
              <Typography fontSize={18}>Select Path</Typography>
            </Grid>
            <Grid item md={6} textAlign="end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAddNew(true)}
                sx={{ textTransform: "capitalize" }}
              >
                Add New Path
              </Button>
            </Grid>
          </Grid>
          <FormControl fullWidth className="mb-4">
            <InputLabel id="select-path">Path</InputLabel>
            <Select
              labelId="select-path"
              id="select-path"
              value={path}
              label="Path"
              onChange={(e) => setPath(e.target.value)}
            >
              {paths?.length > 0 &&
                paths?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {addNew && (
            <TextFieldInput
              title="Add Path"
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
          )}
          <TextFieldInput
            title="Commit Message"
            type="text"
            value={commitMessage}
            onChange={(e) => setCommitMessgae(e.target.value)}
          />
          <Typography fontSize={18}>File</Typography>
          <input
            className="form-control border mt-2 mb-4"
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            Upload
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadToGithub;
