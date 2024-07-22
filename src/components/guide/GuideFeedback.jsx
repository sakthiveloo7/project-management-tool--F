import { Button } from "@mui/material";
import React, { useState } from "react";
import TextFieldInput from "../authentication/auth/TextField";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { api } from "../../utils/Api";
import { toast } from "react-toastify";

const GuideFeedback = ({ pid }) => {
  const { user } = useGlobalUserContext();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/project/guideFeedback/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ feedbackFromGuide: msg }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Feedback given successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setOpen(false);
        setMsg("");
        window.location.reload();
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
    <div className="mt-4">
      {!open ? (
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ textTransform: "capitalize" }}
        >
          Give yours Feedback
        </Button>
      ) : (
        <>
          <div className="w-50">
            <TextFieldInput
              title="Feedback"
              multiline={true}
              rows={2}
              autoFocus={true}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>
          <Button
            color="success"
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default GuideFeedback;
