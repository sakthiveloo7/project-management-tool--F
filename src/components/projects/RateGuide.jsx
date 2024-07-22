import { Button, Grid, Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import TextFieldInput from "../authentication/auth/TextField";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";

const initialState = {
  rating: 0,
  feedbackToGuide: "",
};

const RateGuide = ({ guide, pid }) => {
  const { user, dispatch, ind, getSingleProject } = useGlobalUserContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(initialState);
  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/project/giveRating/${pid}/${guide}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Rated Successfully", {
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
          type: "UPDATE_TEAM_PROJECT",
          payload: { ind, projectId: pid, pro: data.pro },
        });

        getSingleProject(pid);
        setOpen(false);
        setDetails(initialState);
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
    <div className="mt-5 pb-5">
      {!open ? (
        <Button variant="contained" onClick={() => setOpen(true)}>
          Give rating to guide
        </Button>
      ) : (
        <>
          <Grid container spacing={2} alignItems="center" mb={1}>
            <Grid item md={2} xs={12}>
              <Typography fontSize={18}>Rating</Typography>
            </Grid>
            <Grid item md={10} xs={12}>
              <Rating
                value={details.rating}
                onChange={(e, newValue) =>
                  setDetails({ ...details, rating: newValue })
                }
                precision={0.5}
              />
            </Grid>
          </Grid>
          <TextFieldInput
            type="text"
            multiline={true}
            rows={4}
            title="Feedback"
            others="feedbackToGuide"
            value={details.feedbackToGuide}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            Rate
          </Button>
        </>
      )}
    </div>
  );
};

export default RateGuide;
