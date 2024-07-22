import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useGlobalUserContext } from "../../contexts/UserContext";
import "./Team.css";
import styled from "@emotion/styled";
import AddMembers from "./AddMembers";
import { api } from "../../utils/Api";

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

const CreateBtn = styled(Button)`
  margin-top: 20px;
`;

const CreateTeam = () => {
  const { user, dispatch } = useGlobalUserContext();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [members, setMembers] = React.useState([]);

  const createTeam = async () => {
    setLoading(true);

    if (!name || !members) {
      setLoading(false);
      return toast.error("Please fill the required fields", {
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
      const res = await fetch(`${api}/api/team/createTeam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          members: JSON.stringify([...new Set(members)]),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Team Created", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "ADD_TEAM", payload: data.team });
        setName("");
        setMembers([]);
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
      <CreateBtn
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
      >
        Form Team
      </CreateBtn>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" mb={3}>
            Create Team
          </Typography>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                label="Group Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
          </div>

          <AddMembers
            members={members}
            setMembers={setMembers}
            title="Add Members to Team"
          />

          <CreateBtn
            color="primary"
            variant="contained"
            onClick={createTeam}
            disabled={loading}
          >
            Create
          </CreateBtn>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTeam;
