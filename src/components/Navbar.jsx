import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../assets/logo.jpeg";
import styled from "@emotion/styled";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalUserContext } from "../contexts/UserContext";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import SideDrawer from "./SideDrawer";
import "../components/admin/Admin.css";

const NavHeading = styled(Typography)`
  font-size: 22px;
  margin-left: 12px;
  font-weight: bold;

  @media (max-width: 890px) {
    font-size: 22px;
    display: none;
  }
`;

const Navbar = () => {
  const { user } = useGlobalUserContext();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("project-tool-user");
    navigate("../auth");
    toast.info("You have been logged out", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="AppBar nav">
        <Toolbar>
          {user?.user?.role === "admin" && <SideDrawer />}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="logo" />
            </div>
            <NavHeading>
              Project Management Tool
              {user?.user?.role === "guide"
                ? " - Guide Panel"
                : user?.user?.role === "admin" && " - Admin Panel"}
            </NavHeading>
          </Box>

          {/* <div className="menu-icon">
            {!open ? (
              <MenuIcon onClick={() => setOpen(!open)} />
            ) : (
              <CloseIcon onClick={() => setOpen(!open)} />
            )}
          </div> */}

          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          {user?.user?.role === "guide" && (
            <NavLink to="requests" className="nav-link">
              View Requests
            </NavLink>
          )}
          {user?.user ? (
            <Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="user-profile" src={user?.user?.profilePic} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user?.user?.role !== "admin" && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <NavLink to="updateProfile" className="menu-nav-link">
                      Update Account
                    </NavLink>
                  </MenuItem>
                )}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    color="primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Button>
          ) : (
            <Button variant="contained" color="secondary">
              <NavLink to="auth" className="nav-link-login">
                Login
              </NavLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
