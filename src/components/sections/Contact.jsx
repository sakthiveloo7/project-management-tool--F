// import { Box, Button, Grid } from "@mui/material";
// import React, { useState } from "react";
// import ContactImg from "../../assets/contact-img.jpeg";
// import BadgeIcon from "@mui/icons-material/Badge";
// import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import MessageIcon from "@mui/icons-material/Message";
// import SectionHeading from "../SectionHeading";
// import TextFieldInput from "../authentication/auth/TextField";
// import { api } from "../../utils/Api";
// import { toast } from "react-toastify";

// const initialState = {
//   name: "",
//   email: "",
//   message: "",
//   phone: "",
// };

// const Contact = () => {
//   const [details, setDetails] = useState(initialState);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setDetails({ ...details, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${api}/api/contact/contact`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(details),
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Thanks for contacting. We will get back to you soon!", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });

//         setDetails(initialState);
//       } else {
//         toast.error(data.message, {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       }
//     } catch (error) {
//       toast.error(error.message, {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <div className="section-container">
//         <SectionHeading title="Contact Us" />
//         <div className="contact-form">
//           <Grid container spacing={0}>
//             <Grid item md={6}>
//               <div className="auth-form">
//                 <TextFieldInput
//                   type="text"
//                   title="Name"
//                   others="name"
//                   value={details.name}
//                   onChange={handleChange}
//                   icon={<BadgeIcon />}
//                 />
//                 <TextFieldInput
//                   type="email"
//                   title="Email"
//                   others="email"
//                   value={details.email}
//                   onChange={handleChange}
//                   icon={<AlternateEmailIcon />}
//                 />
//                 <TextFieldInput
//                   type="tel"
//                   title="Phone No."
//                   others="phone"
//                   value={details.phone}
//                   onChange={handleChange}
//                   icon={<LocalPhoneIcon />}
//                 />
//                 <TextFieldInput
//                   type="text"
//                   title="Message"
//                   others="message"
//                   icon={<MessageIcon />}
//                   value={details.message}
//                   onChange={handleChange}
//                   multiline={true}
//                   rows={4}
//                 />

//                 <Button
//                   variant="contained"
//                   color="primary"
//                   disabled={loading}
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </Grid>
//             <Grid item md={6}>
//               <img src={ContactImg} alt="image" />
//             </Grid>
//           </Grid>
//         </div>
//       </div>
//     </Box>
//   );
// };

// export default Contact;
