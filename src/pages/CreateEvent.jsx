import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGoogleLogin } from "@react-oauth/google";
import { api } from "../utils/Api";
import { toast } from "react-toastify";
import G from "../assets/google.png";
import axios from "axios";
import TextFieldInput from "../components/authentication/auth/TextField";
import { Link } from "react-router-dom";
import { useGlobalUserContext } from "../contexts/UserContext";
import { Tooltip } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  maxWidth: "95%",
  background: "#fff",
  borderRadius: 2,
  p: 4,
};

const initialState = {
  summary: "",
  description: "",
  location: "",
  start: "",
  end: "",
};

const CreateEvent = ({ teamMembers, projectID, guide }) => {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [code, setCode] = React.useState("");
  const [details, setDetails] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const { dispatch } = useGlobalUserContext();

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const membersEmails = teamMembers?.map((item) => {
    return { email: item?.email };
  });

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResp) => {
      await axios
        .get(`${api}/api/user/callback`)
        .then((res) => setUrl(res.data))
        .catch((err) => console.log(err.message));
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      axios
        .post(`${api}/api/user/create-event?code=${code}`, {
          ...details,
          start: new Date(details.start).toISOString(),
          end: new Date(details.end).toISOString(),
          members: [...membersEmails, { email: guide }],
          _id: projectID,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(
              "Meeting Schedule. Everyone will get notifications about date and time with link",
              {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
            setDetails(initialState);
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
            dispatch({
              type: "UPDATE_PROJECT",
              payload: { projectId: projectID, pro: res.data.pro },
            });
          } else {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((err) =>
          toast.error(err.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        );
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    setCode(codeParam);
  });

  return (
    <div>
      <Tooltip title="Schedule a meet event for this project with guide">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="success"
          className="my-3 Button imp-btn me-3"
        >
          Schedule Meet
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!url && !code ? (
            <div className="text-center">
              <Typography className="mb-3" fontSize={30}>
                Sign In with Google
              </Typography>
              <Button
                onClick={() => googleLogin()}
                className="Button imp-btn"
                variant="outlined"
              >
                <img className="g-img me-1" src={G} alt="Google" />
                Sign in with Google
              </Button>
            </div>
          ) : !code ? (
            <div className="text-center">
              <Typography className="mb-3" fontSize={20}>
                Authorize yourself to schedule meeting to your calendar
              </Typography>
              <Button
                type="submit"
                className="Button imp-btn"
                variant="outlined"
              >
                <Link to={url} className="link" target="_blank">
                  <img className="g-img" src={G} alt="Google" />
                  Authorize
                </Link>
              </Button>
            </div>
          ) : (
            <div className="text-start">
              <Typography className="mb-3" fontSize={27} fontWeight="bold">
                Schedule a meeting
              </Typography>
              <div className="event-form">
                <TextFieldInput
                  title="Summary"
                  type="text"
                  others="summary"
                  value={details.summary}
                  onChange={handleChange}
                  autoFocus={true}
                />
                <TextFieldInput
                  title="Description"
                  type="text"
                  multiline={true}
                  rows={3}
                  others="description"
                  value={details.description}
                  onChange={handleChange}
                />
                <TextFieldInput
                  title="Location"
                  type="text"
                  others="location"
                  value={details.location}
                  onChange={handleChange}
                />
                <TextFieldInput
                  title="Start Date & Time"
                  type="datetime-local"
                  others="start"
                  value={details.start}
                  onChange={handleChange}
                />
                <TextFieldInput
                  title="End Date & Time"
                  type="datetime-local"
                  others="end"
                  value={details.end}
                  onChange={handleChange}
                />
              </div>
              <Button
                color="primary"
                variant="contained"
                className="mt-3"
                onClick={handleSubmit}
                disabled={loading}
              >
                Schedule
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CreateEvent;
