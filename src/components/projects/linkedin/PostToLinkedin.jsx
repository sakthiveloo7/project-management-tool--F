import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../../tasks/Tasks.css";
import TextFieldInput from "../../authentication/auth/TextField";
import { toast } from "react-toastify";
import { api } from "../../../utils/Api";
import { useGlobalUserContext } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  maxWidth: "96%",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const initialState = {
  text: "",
};

const PostToLinked = ({ members, github }) => {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const [posted, setPosted] = React.useState(false);
  const [url, setUrl] = React.useState(false);

  const { user } = useGlobalUserContext();

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);

    if (details.text === "") {
      setLoading(false);
      return toast.error("Please enter content", {
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
      const res = await fetch(`${api}/api/project/post/linkedin/authorize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...details,
          github,
          team: members?.map((item) => item?.name),
        }),
      });
      const data = await res.json();
      if (data.success) setUrl(data.url);
    } catch (error) {
      console.log(error);
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
      {!posted && (
        <Button
          onClick={() => setOpen(true)}
          className="Button imp linkedin"
          variant="contained"
          sx={{ textTransform: "capitalize", background: "#0077b5" }}
        >
          <LinkedInIcon className="me-1 fs-5" />
          Post Project to LinkedIn
        </Button>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={26} fontWeight="bold" mb={2}>
            {!url ? "Add necessary details" : "Authorize Yourself"}
          </Typography>
          {!url ? (
            <>
              <TextFieldInput
                title="Project Repository"
                type="text"
                value={github}
                readOnly={true}
              />
              <TextFieldInput
                title="Team"
                type="text"
                value={members?.map((item) => item?.name)}
                readOnly={true}
              />
              <TextFieldInput
                title="Content"
                type="text"
                multiline={true}
                rows={10}
                others="text"
                value={details.text}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                disabled={loading}
                className="mt-1"
                onClick={handleSubmit}
              >
                Post
              </Button>
            </>
          ) : (
            <Link to={url} target="_blank" className="link">
              <Button
                variant="contained"
                className="mt-2"
                sx={{ textTransform: "capitalize", background: "#0077b5" }}
                onClick={() => {
                  setOpen(false);
                  setPosted(true);
                }}
              >
                Authorize & Post
              </Button>
            </Link>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PostToLinked;
