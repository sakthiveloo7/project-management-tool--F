import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Groups2Icon from "@mui/icons-material/Groups2";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PersonIcon from "@mui/icons-material/Person";
import { useGlobalUserContext } from "../../contexts/UserContext";
import MessageIcon from "@mui/icons-material/Message";
import "./Admin.css";

const AdminDash = () => {
  const { users, teamProjects, teams, guides, contacts } =
    useGlobalUserContext();

  const condition = (color) =>
    color === "dark" || color === "success" || color === "danger";
  const style = { fontSize: "4.5rem" };

  const data = [
    {
      title: "Teams",
      length: teams?.length,
      icon: <Groups2Icon sx={style} />,
      color: "success",
      link: "teams",
    },
    {
      title: "Projects",
      length: teamProjects
        ?.map((item) => item?.length)
        ?.reduce((prev, curr) => prev + curr, 0),
      icon: <AccountTreeIcon sx={style} />,
      color: "dark",
      link: "projects",
    },
    {
      title: "Instructors",
      length: guides?.length,
      icon: <LightbulbIcon sx={style} />,
      color: "info",
      link: "instructors",
    },
    {
      title: "Users",
      length: users?.length,
      icon: <PersonIcon sx={style} />,
      color: "warning",
      link: "users",
    },
    {
      title: "QnA",
      length: contacts?.length,
      icon: <MessageIcon sx={style} />,
      color: "danger",
      link: "contacts",
    },
  ];

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography className="Typography admin-title" fontWeight="bold" color="primary">
          <DashboardIcon className="dash-icon" /> Admin Dashboard
        </Typography>
        <Grid container rowGap={6} columnSpacing={4} my={3}>
          {data.map((item) => {
            const { title, length, icon, color, link } = item;
            return (
              <Grid key={title} item md={6} xs={12}>
                <div
                  className={`dash-card shadow shadow-lg bg-${color} rounded-2 px-4 py-3 position-relative`}
                >
                  <div className="inner">
                    <Typography
                      fontSize={40}
                      fontWeight="bold"
                      mb={1}
                      className={condition(color) && "text-white"}
                    >
                      {length}
                    </Typography>
                    <Typography
                      fontSize={20}
                      fontWeight="bold"
                      className={condition(color) && "text-white"}
                    >
                      {title}
                    </Typography>
                  </div>
                  <div
                    className={`
                      ${condition(color) && "text-white"}
                      position-absolute top-50 end-0 translate-middle`}
                  >
                    {icon}
                  </div>
                  <Link
                    to={link}
                    className={`dash-link mt-2 text-${
                      condition(color) ? "warning" : "danger"
                    }`}
                  >
                    <Typography mr={1} fontWeight="bold">
                      More Info
                    </Typography>
                    <ArrowRightAltIcon />
                  </Link>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDash;
