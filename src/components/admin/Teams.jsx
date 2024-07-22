import {
  Box,
  Chip,
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
import Groups2Icon from "@mui/icons-material/Groups2";
import { useGlobalUserContext } from "../../contexts/UserContext";
import SearchBox from "../SearchBox";
import Data from "./Data";

const Teams = () => {
  const { teams } = useGlobalUserContext();
  const [search, setSearch] = useState("");

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid container spacing={2} my={1}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={35} fontWeight="bold" color="primary">
              <Groups2Icon className="text-dark fs-3 me-2" /> Teams
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign="end">
            <SearchBox
              title="team"
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
                <Data align="center" text="Name" />
                <Data align="center" text="Leader" />
                <Data align="center" text="Other Members" />
              </TableRow>
            </TableHead>
            <TableBody>
              {teams?.length > 0 &&
                teams
                  ?.filter((item) =>
                    item?.name?.toLowerCase()?.includes(search)
                  )
                  ?.map((item, ind) => {
                    const { name, teamLeader, members } = item;
                    const filteredMembers = members
                      ?.filter((item) => item?._id !== teamLeader?._id)
                      ?.map((item) => item?.name);

                    return (
                      <TableRow key={ind}>
                        <Data
                          align="center"
                          text={`${ind + 1}.`}
                          fromData={true}
                        />
                        <Data align="center" text={name} fromData={true} />
                        <Data
                          align="center"
                          text={teamLeader?.name}
                          fromData={true}
                        />
                        <TableCell>
                          <div className="members">
                            {filteredMembers?.map((item) => (
                              <Chip
                                label={item}
                                key={item}
                                variant="outlined"
                                className="me-1"
                              />
                            ))}
                          </div>
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

export default Teams;
