import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalUserContext } from "../../../contexts/UserContext";
import { toast } from "react-toastify";
import { api } from "../../../utils/Api";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import TextFieldInput from "../auth/TextField";
import UpdateSkills from "./UpdateSkills";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const UpdateProfile = () => {
  const { user, users, guides } = useGlobalUserContext();
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload ypur profile pic.", {
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

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setLoading(false);
      return toast.error("JPEG/PNG images are accepted.", {
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
      const url = "https://api.cloudinary.com/v1_1/dztxhls16/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "project-management-tool");
      data.append("class", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();
      if (resp) {
        toast.success("Profile Pic Updated.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setUpdate({ ...update, profilePic: resp.url });
        setLoading(false);
      }
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

  const handleChange = (e) =>
    setUpdate({ ...update, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(update),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile Updated.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem(
          "project-tool-user",
          JSON.stringify({ token: user.token, user: data.user })
        );

        navigate("/");
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

  useEffect(() => {
    setUpdate(
      user?.user?.role === "user"
        ? users?.filter((item) => item?._id === user?.user?._id)[0]
        : guides?.filter((item) => item?._id === user?.user?._id)[0]
    );
  }, [user?.user, users, guides]);

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography
          color="primary"
          textAlign="center"
          fontWeight="bold"
          fontSize={30}
          mb={4}
        >
          Update Profile
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item md={4}>
            <div className="image-container rounded rounded-circle">
              <img
                src={update?.profilePic}
                alt={update?.name}
                className="rounded rounded-circle"
              />
              <label htmlFor="profile-pic">
                <EditIcon color="primary" sx={{ cursor: "pointer" }} />
              </label>
              <input
                type="file"
                name="profilePic"
                id="profile-pic"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <TextFieldInput
              title="Name"
              others="name"
              value={update?.name}
              onChange={handleChange}
              icon={<BadgeIcon />}
            />
            <TextFieldInput
              title="Email"
              others="email"
              value={update?.email}
              onChange={handleChange}
              icon={<AlternateEmailIcon />}
            />
            <TextFieldInput
              title="Linked In Profile"
              others="linkedin"
              value={update?.linkedin}
              onChange={handleChange}
              icon={<LinkedInIcon />}
            />
            {update?.role === "guide" && (
              <TextFieldInput
                type="number"
                title="Experience"
                others="experience"
                value={update?.experience}
                onChange={handleChange}
                icon={<WorkHistoryIcon />}
              />
            )}
            <UpdateSkills
              update={update}
              setUpdate={setUpdate}
              role={update?.role}
            />
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UpdateProfile;
