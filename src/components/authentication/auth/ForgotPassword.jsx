import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TokenIcon from "@mui/icons-material/Token";
import { toast } from "react-toastify";
import { api } from "../../../utils/Api";
import TextFieldInput from "./TextField";
import PasswordField from "./PasswordField";
import OtpForm from "./OtpForm";

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
};

const initialState = {
  email: "",
  otp: "",
  password: "",
  cpassword: "",
};

const ForgotPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [passModal, setPassModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState(initialState);

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    setLoading(true);

    if (!details.email) {
      setLoading(false);
      return toast.error("Please enter your email address", {
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
      const res = await fetch(`${api}/api/user/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: details.email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("OTP has been mailed.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setPassModal(true);
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

  const handleChangePassword = async () => {
    setLoading(true);

    if (!details.otp || !details.cpassword || !details.password) {
      setLoading(false);
      return toast.error("Please fill all the fields", {
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

    if (details.cpassword !== details.password) {
      setLoading(false);
      return toast.error("Mismatch Password", {
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
      const res = await fetch(`${api}/api/user/changePassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Password Updated. Please Login", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setPassModal(false);
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
      <Button
        onClick={() => setOpen(true)}
        className="mt-3 fs-6"
        sx={{ textTransform: "capitalize", color: "#6c757d" }}
      >
        Forgot password
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!passModal ? (
            <>
              <Typography id="modal-modal-title" variant="h5" mb={2}>
                Email
              </Typography>
              <TextFieldInput
                type="email"
                others="email"
                icon={<EmailIcon />}
                value={details.email}
                onChange={handleChange}
              />
              <Button
                color="primary"
                variant="contained"
                disabled={loading}
                onClick={sendOtp}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <OtpForm
                length={4}
                onOtpSubmit={(otpVal) =>
                  setDetails({ ...details, otp: otpVal })
                }
              />
              <PasswordField
                others="password"
                title="Password"
                value={details.password}
                onChange={handleChange}
              />
              <PasswordField
                others="cpassword"
                title="Confirm Password"
                value={details.cpassword}
                onChange={handleChange}
              />

              <Button
                color="primary"
                variant="contained"
                disabled={loading}
                onClick={handleChangePassword}
              >
                Update Password
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
