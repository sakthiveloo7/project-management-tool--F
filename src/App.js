import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import { ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./components/Navbar";
import { UserContext } from "./contexts/UserContext";
import Authentication from "./pages/Authentication";
import UpdateProfile from "./components/authentication/update/UpdateProfile";
import GuideRequests from "./components/guide/GuideRequests";
import GuideProject from "./components/guide/GuideProject";
import Teams from "./components/admin/Teams";
import Projects from "./components/admin/Projects";
import Guides from "./components/admin/Guides";
import Users from "./components/admin/Users";
import QnA from "./components/admin/QnA";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: { main: "#3f51b5" },
      secondary: { main: "#90ee90" },
    },
    typography: {
      allVariants: {
        fontFamily: "Spectral",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/requests" element={<GuideRequests />} />
            <Route path="/project/:id" element={<GuideProject />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/instructors" element={<Guides />} />
            <Route path="/users" element={<Users />} />
            <Route path="/qna" element={<QnA />} />
          </Routes>
        </UserContext>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;