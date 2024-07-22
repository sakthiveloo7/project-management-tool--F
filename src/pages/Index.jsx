import { Box, Container } from "@mui/material";
import React from "react";

import { useGlobalUserContext } from "../contexts/UserContext";
import Projects from "../components/projects/Projects";
import GuideDashboard from "../components/guide/GuideDashboard";
import AdminDash from "../components/admin/AdminDash";
// import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import About from "../components/sections/About";
// import Reviews from "../components/sections/Reviews";
// import Faqs from "../components/sections/Faqs";
// import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

const Index = () => {
  const { user } = useGlobalUserContext();

  return !user?.user ? (
    <>
      <Container maxWidth="lg">
        <Box>
          {/* <Hero /> */}
          <Features />
          <About />
          {/* <Reviews /> */}
          {/* <Faqs /> */}
          {/* <Contact /> */}
        </Box>
      </Container>
      <Footer />
    </>
  ) : user?.user?.role === "user" ? (
    <Projects />
  ) : user?.user?.role === "guide" ? (
    <GuideDashboard />
  ) : (
    <AdminDash />
  );
};

export default Index;
