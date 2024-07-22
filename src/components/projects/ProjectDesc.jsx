import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import AddSingleMember from "../team/AddSingleMember";
import UserCard from "../team/UserCard";

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

  "@media (max-width: 890px)": {
    height: "630px",
    overflow: "scroll",
  },
};

const Desc = styled(Typography)`
  color: #526d82;
  font-size: 16px;
  text-align: justify;
`;

const ProjectDesc = ({ project }) => {
  const [open, setOpen] = React.useState(false);
  const [notificationSend, setNotificationSend] = React.useState(false);

  const { title, description, _id, team, start, end, approvalStatus, guide } =
    project;

  const { user, guides, ind, requestGuide } = useGlobalUserContext();

  const formatDate = (date) => {
    const option = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return new Date(date).toLocaleString(undefined, option);
  };

  const sendMailNotification = async (email) => {
    try {
      const res = await fetch(`${api}/api/project/sendDueProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) setNotificationSend(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const isGrpLeader = team?.teamLeader?._id === user?.user?._id;

  const [loading, setLoading] = React.useState(false);
  const [members, setMembers] = React.useState();
  const [selectedGuide, setSelectedGuide] = React.useState("");

  React.useEffect(() => {
    setMembers(team?.members);
  }, [team?.members]);

  React.useEffect(() => {
    if (project && isGrpLeader && !notificationSend) {
      const d = new Date(end);
      const curr = new Date();

      const dueYear = d.getFullYear();
      const dueMonth = d.getMonth();
      const dDate = d.getDate();

      const currYear = curr.getFullYear();
      const currMonth = curr.getMonth();
      const currDate = curr.getDate();

      if (dueYear === currYear) {
        if (dueMonth === currMonth) {
          if (dDate - currDate >= 0 && dDate - currDate < 2) {
            console.log("Here");
            sendMailNotification(user?.user?.email);
          }
        }
      }
    }
  }, []);

  const removeUser = async (userId) => {
    try {
      const res = await fetch(`${api}/api/team/removeFromTeam/${team?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ user: userId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("User Removed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setMembers(members.filter((delUser) => delUser._id !== userId));
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
      toast.error("User already added", {
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

  const addUserToTeam = async (addingUser) => {
    /* if (members.find((member) => member._id === addingUser._id)) {
      return toast.error("User already been added.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } */

    setLoading(true);
    try {
      const res = await fetch(`${api}/api/team/addToTeam/${team?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ user: addingUser }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("User Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setMembers([...members, addingUser]);
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
      toast.error("User already added", {
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
    <div className="eye-icon">
      <Button onClick={() => setOpen(true)}>
        <Tooltip title="View project description">
          <VisibilityIcon className="text-dark" />
        </Tooltip>
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" color="primary">
            {title}
          </Typography>
          <Desc
            id="modal-modal-description"
            sx={{ mt: 2 }}
            color="ThreeDLightShadow"
          >
            {description}
          </Desc>
          <Grid container spacing={2} mt={1}>
            <Grid item md={6}>
              <Typography display="inline-block" fontWeight="bold">
                Start Date:
              </Typography>
              <Typography display="inline-block" className="ms-1">
                {formatDate(start)}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography display="inline-block" fontWeight="bold">
                End Date:
              </Typography>
              <Typography display="inline-block" className="ms-1">
                {formatDate(end)}
              </Typography>
            </Grid>
          </Grid>
          <div className="desc-teams">
            {members && (
              <>
                <Typography color="primary" className="Typography team">
                  Team Members
                </Typography>
                <Grid container mt={1} columnSpacing={3}>
                  {members?.map((u) => {
                    return (
                      <Grid item md={3}>
                        <UserCard
                          key={u._id}
                          user={u}
                          isFromProDesc={true}
                          removeUser={removeUser}
                          grpLeaderCanDelete={
                            isGrpLeader && u._id !== team?.teamLeader?._id
                          }
                          noCursor={true}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          </div>

          {isGrpLeader && (
            <div className="mt-3">
              <Typography color="primary" className="Typography team">
                Add More Member
              </Typography>
              <AddSingleMember
                addUserToTeam={addUserToTeam}
                loading={loading}
              />
            </div>
          )}

          {guide !== undefined && (
            <div className="guide-box mt-4">
              <Typography
                display="inline-block"
                fontSize={20}
                fontWeight="bold"
              >
                Guide:
              </Typography>
              <div className="guide-name">
                <Avatar
                  src={guide?.profilePic}
                  className="d-inline-block mx-2"
                  alt={guide?.name}
                />
                <Typography display="inline-block" fontSize={20}>
                  {guide?.name}
                </Typography>
              </div>
              {team?.teamLeader?._id === user?.user?._id && (
                <Chip
                  color={approvalStatus === "requested" ? "error" : "success"}
                  label={
                    approvalStatus[0].toUpperCase() +
                    approvalStatus.substring(1)
                  }
                  variant="outlined"
                  className="ms-1"
                />
              )}
            </div>
          )}

          {isGrpLeader && (!guide || approvalStatus === "rejected") && (
            <div className="mt-3">
              <Typography color="primary" className="Typography team" mb={1}>
                Request Guide
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="select-guide">Guide</InputLabel>
                <Select
                  labelId="select-guide"
                  id="select-guide"
                  value={selectedGuide}
                  label="Guide"
                  onChange={(e) => setSelectedGuide(e.target.value)}
                >
                  {guides?.length > 0 &&
                    guides?.map((item) => {
                      return (
                        <MenuItem value={item?._id} key={item?._id}>
                          <div>
                            <Typography fontWeight="bold">
                              {item?.name}
                            </Typography>
                            <Typography color="GrayText">
                              [Expertise: {item?.expertise?.join(",")}]
                            </Typography>
                          </div>
                          <Rating
                            precision={0.5}
                            value={item?.rating}
                            className="d-block ms-2 mt-3"
                          />
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                className="mt-3"
                onClick={() => requestGuide(team?._id, _id, selectedGuide, ind)}
              >
                Request
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectDesc;
