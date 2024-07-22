import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SearchBox from "../SearchBox";
import Data from "./Data";
import { useGlobalUserContext } from "../../contexts/UserContext";
import ProjectRow from "./ProjectRow";

const Projects = () => {
  const { teamProjects, tasks, getTasks } = useGlobalUserContext();
  const [search, setSearch] = useState("");
  var ind = 0;

  const fetchTasks = async (_id) => await getTasks(_id);

  return (
    <Container maxWidth="xl" className="container">
      <Box>
        <Grid container spacing={2} my={1}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={35} fontWeight="bold" color="primary">
              <AccountTreeIcon className="text-dark fs-3 me-2" /> Projects
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign="end">
            <SearchBox
              title="project"
              search={search}
              handleChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Grid>
        </Grid>
        <TableContainer className="mt-3">
          <Table>
            <TableRow>
              <Data align="center" text="Sr. No." />
              <Data align="center" text="Project Title" />
              <Data align="center" text="Description" width={250} />
              <Data align="center" text="Guide" />
              <Data align="center" text="Developing Team" />
              <Data align="center" text="Start Date" />
              <Data align="center" text="End Date" />
              <Data align="center" text="Status" />
              <Data align="center" text="No. of tasks" />
              <Data align="center" text="Tasks Stats" />
            </TableRow>
            <TableBody>
              {teamProjects?.map((item) => {
                return item
                  ?.filter((i) => i?.title?.toLowerCase()?.includes(search))
                  ?.map((e) => <ProjectRow e={e} ind={ind} />);
                ind += 1;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Projects;
