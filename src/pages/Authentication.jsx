import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";
import { useGlobalUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/authentication/auth/ForgotPassword";
import TextFieldInput from "../components/authentication/auth/TextField";
import PasswordField from "../components/authentication/auth/PasswordField";
import AuthButtons from "../components/authentication/auth/AuthButtons";
import LoginImg from "../assets/login-img.jpg";
import RegisterImg from "../assets/register-img.jpeg";
import RadioField from "../components/authentication/auth/RadioField";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CodeIcon from "@mui/icons-material/Code";
import { api } from "../utils/Api";
import OtpForm from "../components/authentication/auth/OtpForm";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  experience: 0,
  expertise: "",
  linkedin: "",
  profilePic: "",
  role: "",
};

const Authentication = () => {
  const [openReg, setOpenReg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(initialState);
  const [isVerified, setIsVerified] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { registerUser, loginUser } = useGlobalUserContext();

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload your profile pic.", {
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
        toast.success("Profile pic uploaded successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setDetails({ ...details, profilePic: resp.url });
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

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!openReg) {
        const data = await loginUser(details);

        if (data.success) {
          toast.success("Logged In Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setDetails(initialState);
          localStorage.setItem("project-tool-user", JSON.stringify(data.user));
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
      } else {
        if (details.password !== details.cpassword) {
          setLoading(false);
          return toast.error("Mismatch Passwords", {
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

        if (details.role !== "admin") {
          const tempSkills = details.expertise.split(", ");
          details.expertise = tempSkills;
        } else {
          details.expertise = [];
        }

        const data = await registerUser({
          ...details,
          experience: parseInt(details.experience),
        });

        if (data.success) {
          toast.success("Registered Successfully.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setDetails(initialState);
          setOpenReg(false);
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

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user/verifyEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: details.email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("OTP send. Check your mail", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setOpenOtp(true);
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

  const verifyEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email: details.email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Email address verified", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setIsVerified(true);
        setOpenOtp(false);
        setOtp("");
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
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid container spacing={6} alignItems="center">
          <Grid item md={5} xs={12}>
            <img
              src={openReg ? RegisterImg : LoginImg}
              alt="image"
              className={!openReg ? "auth-image" : "auth-image-low-ht"}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography
              textAlign="center"
              fontSize={40}
              fontWeight="bold"
              color="primary"
            >
              {openReg ? "REGISTER" : "LOGIN"}
            </Typography>
            <Box className="Box auth-box">
              {openReg && (
                <TextFieldInput
                  title="Name"
                  type="name"
                  others="name"
                  value={details.name}
                  onChange={handleChange}
                  autoFocus={openReg && true}
                  icon={<PersonIcon />}
                />
              )}
              <TextFieldInput
                title="Email"
                type="email"
                others="email"
                value={details.email}
                onChange={handleChange}
                autoFocus={!openReg && true}
                icon={<EmailIcon />}
              />

              {!openReg && (
                <>
                  <PasswordField
                    title="Password"
                    others="password"
                    value={details.password}
                    onChange={handleChange}
                  />
                  <RadioField value={details.role} onChange={handleChange} />
                </>
              )}

              {openReg &&
                (!isVerified ? (
                  <div className="mb-4">
                    {!openOtp ? (
                      <Button
                        variant="contained"
                        sx={{ textTransform: "capitalize" }}
                        disabled={loading}
                        onClick={sendOtp}
                        className="Button auth-btn"
                      >
                        Send OTP to verfiy email address
                      </Button>
                    ) : (
                      <>
                        <OtpForm
                          length={4}
                          onOtpSubmit={(otpVal) => setOtp(otpVal)}
                        />
                        <Button
                          type="button"
                          onClick={verifyEmail}
                          variant="contained"
                          className="mt-3"
                        >
                          Verify Email
                        </Button>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <PasswordField
                      title="Password"
                      others="password"
                      value={details.password}
                      onChange={handleChange}
                    />
                    {!openReg && (
                      <RadioField
                        value={details.role}
                        onChange={handleChange}
                      />
                    )}
                    {openReg && (
                      <>
                        <PasswordField
                          title="Confirm Password"
                          others="cpassword"
                          value={details.cpassword}
                          onChange={handleChange}
                        />
                        <RadioField
                          value={details.role}
                          onChange={handleChange}
                        />
                        {details.role !== "admin" && details.role !== "" && (
                          <>
                            <TextFieldInput
                              title="Expertise/Skills"
                              text="Use comma + space to separate skills/expertise eg. HTML, CSS, JS"
                              type="text"
                              others="expertise"
                              value={details.expertise}
                              onChange={handleChange}
                              fromAuth={true}
                              icon={<CodeIcon />}
                            />
                            <TextFieldInput
                              type="text"
                              text="Let's Connect"
                              others="linkedin"
                              title="Linked In Profile URL"
                              value={details.linkedin}
                              onChange={handleChange}
                              fromAuth={true}
                              icon={<LinkedInIcon />}
                            />
                            {details.role === "guide" && (
                              <TextFieldInput
                                type="number"
                                title="Experience (in yrs)"
                                others="experience"
                                value={details.experience}
                                onChange={handleChange}
                                icon={<WorkHistoryIcon />}
                              />
                            )}
                          </>
                        )}
                        <TextFieldInput
                          title="Profile Pic"
                          type="file"
                          others="profile"
                          onChange={(e) => handleUpload(e.target.files[0])}
                        />
                      </>
                    )}
                  </>
                ))}
              <AuthButtons
                openReg={openReg}
                setOpenReg={setOpenReg}
                loading={loading}
                handleSubmit={handleSubmit}
              />
              {!openReg && <ForgotPassword />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Authentication;
