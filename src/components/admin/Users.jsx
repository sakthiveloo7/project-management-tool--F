import {
  Avatar,
  Box,
  Container,
  Grid,
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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchBox from "../SearchBox";
import Data from "./Data";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

const Users = () => {
  const { users, allTasks } = useGlobalUserContext();
  const [search, setSearch] = useState("");

  return (
    <Container maxWidth="xl" className="container">
      <Box>
        <Grid container spacing={2} my={1}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={35} fontWeight="bold" color="primary">
              <PeopleAltIcon className="text-dark fs-3 me-2" /> Users
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign="end">
            <SearchBox
              title="user"
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
                <Data align="center" text="Skills" width={250} />
                <Data align="center" text="Linkedin Profile" />
                <Data align="center" text="Tasks Completed" />
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.length > 0 &&
                users
                  ?.filter((item) => item?.name.toLowerCase().includes(search))
                  ?.map((item, ind) => {
                    const {
                      name,
                      email,
                      profilePic,
                      expertise,
                      linkedin,
                      _id,
                    } = item;

                    const completedTasks = allTasks?.filter(
                      (item) =>
                        item?.assignedTo?._id === _id &&
                        item?.stage === "completed"
                    )?.length;

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
                          text={expertise?.join(", ")}
                          fromData={true}
                          description={true}
                          expertise={true}
                        />
                        <TableCell align="center">
                          <Link to={linkedin} target="_blank" className="link">
                            <LinkedInIcon color="primary" className="icon" />
                          </Link>
                        </TableCell>
                        <Data align="center" text={completedTasks} />
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

export default Users;
