import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReplyIcon from "@mui/icons-material/Reply";
import TextFieldInput from "../authentication/auth/TextField";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { api } from "../../utils/Api";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "96%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Reply = ({ id, name, email, message }) => {
  const { user, dispatch } = useGlobalUserContext();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [reply, setReply] = React.useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/contact/reply/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ email, reply, message }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Replied successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setReply("");
        dispatch({ type: "DELETE_CONTACT", payload: id });
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
      <ReplyIcon
        onClick={() => setOpen(true)}
        color="success"
        className="fs-4 icon"
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={20} mb={1} fontWeight="bold">
            Replying to {name}
          </Typography>
          <TextFieldInput
            type="text"
            others="reply"
            multiline={true}
            rows={8}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            autoFocus={true}
          />
          <Button
            className="mt-3"
            variant="contained"
            color="success"
            disabled={loading}
            onClick={handleSubmit}
          >
            Reply
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Reply;
