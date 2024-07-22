import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import TextFieldInput from "../../authentication/auth/TextField";
import StepsPAT from "./Steps";
import { api } from "../../../utils/Api";
import { useGlobalUserContext } from "../../../contexts/UserContext";
import { toast } from "react-toastify";

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

const initialState = {
  ownerName: "",
  repository: "",
  token: "",
};

const AddGitDetailsForm = ({ proId, gitDetails, edit }) => {
  const { user, getSingleProject, dispatch } = useGlobalUserContext();
  const [gitHubDetails, setGitHubDetails] = React.useState(initialState);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) =>
    setGitHubDetails({ ...gitHubDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/project/updateGitDetails/${proId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(gitHubDetails),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Details added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setGitHubDetails(initialState);
        setOpen(false);
        getSingleProject(proId);
        dispatch({
          type: "UPDATE_PROJECT",
          payload: { projectId: proId, pro: data.project },
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

  React.useEffect(() => {
    setGitHubDetails(gitDetails);
  }, [edit, gitDetails]);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        color="secondary"
        className="mb-4"
      >
        {edit ? "Edit" : "Add"} Git Details
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={22} mb={3} fontWeight="bold">
            {edit ? "Edit" : "Add"} Git-Hub Details (Only Teamleader Git-Hub
            Account Details)
          </Typography>
          <div>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextFieldInput
                  title="Github Account User Name"
                  type="text"
                  others="ownerName"
                  autoFocus={true}
                  value={gitHubDetails?.ownerName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextFieldInput
                  title="Project Repository Name"
                  type="text"
                  others="repository"
                  value={gitHubDetails?.repository}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container mb={2} alignItems="center">
              <Grid item md={6} xs={12}>
                <Typography fontSize={18}>Personal Access Token</Typography>
              </Grid>
              <Grid item md={6} xs={12} className="Grid steps">
                <StepsPAT />
              </Grid>
            </Grid>
            <TextFieldInput
              type="text"
              others="token"
              value={gitHubDetails?.token}
              onChange={handleChange}
            />
            <Typography fontSize={16} color="gray" mt={-2} mb={4}>
              We will not share with anyone and will be stored in hash format
            </Typography>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {!edit ? "Add" : "Edit"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddGitDetailsForm;
