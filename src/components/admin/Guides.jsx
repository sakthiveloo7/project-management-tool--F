import {
  Avatar,
  Box,
  Container,
  Grid,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useGlobalUserContext } from "../../contexts/UserContext";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SearchBox from "../SearchBox";
import Data from "./Data";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

const Guides = () => {
  const { guides } = useGlobalUserContext();
  const [search, setSearch] = useState("");

  return (
    <Container maxWidth="xl" className="container">
      <Box>
        <Grid container spacing={2} my={1}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={35} fontWeight="bold" color="primary">
              <LightbulbIcon className="text-dark fs-3 me-2" /> Instructors
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign="end">
            <SearchBox
              title="guide"
              search={search}
              handleChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Grid>
        </Grid>
        <TableContainer className="mt-3">
          <Table>
            <TableHead>
              <TableRow>
                <Data align="center" text="Sr. No." />
                <Data align="center" text="Profile" />
                <Data align="center" text="Name" />
                <Data align="center" text="Email" />
                <Data align="center" text="Experience" />
                <Data align="center" text="Expertise" width={250} />
                <Data align="center" text="Linkedin Profile" />
                <Data align="center" text="Rating" />
              </TableRow>
            </TableHead>
            <TableBody>
              {guides?.length > 0 &&
                guides
                  ?.filter((item) => item?.name.toLowerCase().includes(search))
                  ?.map((item, ind) => {
                    const {
                      name,
                      email,
                      profilePic,
                      experience,
                      expertise,
                      rating,
                      linkedin,
                    } = item;

                    return (
                      <TableRow key={ind}>
                        <Data
                          align="center"
                          text={`${ind + 1}.`}
                          fromData={true}
                        />
                        <TableCell>
                          <Avatar
                            src={profilePic}
                            alt={name}
                            className="d-block mx-auto"
                          />
                        </TableCell>
                        <Data align="center" text={name} fromData={true} />
                        <Data align="center" text={email} fromData={true} />
                        <Data
                          align="center"
                          text={`${experience} years`}
                          fromData={true}
                        />
                        <Data
                          align="center"
                          text={expertise?.join(", ")}
                          fromData={true}
                          expertise={true}
                          description={true}
                        />
                        <TableCell align="center">
                          <Link to={linkedin} target="_blank" className="link">
                            <LinkedInIcon color="primary" className="icon" />
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Rating value={rating} precision={0.5} readOnly />
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Guides;
