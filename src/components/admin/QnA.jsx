import {
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
import MessageIcon from "@mui/icons-material/Message";
import SearchBox from "../SearchBox";
import Data from "./Data";
import { useGlobalUserContext } from "../../contexts/UserContext";
import Reply from "./Reply";

const QnA = () => {
  const { contacts } = useGlobalUserContext();
  const [search, setSearch] = useState("");

  return (
    <Container className="container" maxWidth="xl">
      <Box>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={35} fontWeight="bold" color="primary">
              <MessageIcon className="text-dark fs-3 me-2" /> Questions &
              Answers
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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Data align="center" text="Sr. No." />
                <Data align="center" text="Name" />
                <Data align="center" text="Email" />
                <Data align="center" text="Phone" />
                <Data align="center" text="Message" />
                <Data align="center" text="Reply" />
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts?.length > 0 ? (
                contacts?.map((item, ind) => {
                  const { name, email, message, phone, _id } = item;
                  return (
                    <TableRow key={_id}>
                      <Data
                        align="center"
                        fromData={true}
                        text={`${ind + 1}.`}
                      />
                      <Data align="center" fromData={true} text={name} />
                      <Data align="center" fromData={true} text={email} />
                      <Data align="center" fromData={true} text={phone} />
                      <Data align="center" fromData={true} text={message} />
                      <TableCell align="center">
                        <Reply
                          id={_id}
                          name={name}
                          email={email}
                          message={message}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableCell colSpan={6} align="center">
                  <Typography fontSize={16}>
                    No questions & answers till now
                  </Typography>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default QnA;
