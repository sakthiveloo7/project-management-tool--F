import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import M from "../../assets/meet.png";
import { useGlobalUserContext } from "../../contexts/UserContext";

const GuideDashboard = () => {
  const { teamProjects, user } = useGlobalUserContext();
  const approvedProjects = teamProjects?.map((e) => {
    const arr = e?.filter(
      (item) =>
        item?.guide?._id === user?.user?._id &&
        item?.approvalStatus === "accepted"
    );

    if (arr.length > 0) return arr;
  });

  const undefinedArrays = approvedProjects?.filter(
    (item) => item === undefined
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography className="Typography guide-dash-title" fontWeight="bold" color="primary">
          Teams to give guidance
        </Typography>
        <Grid container spacing={2} mt={1}>
          {approvedProjects?.map(
            (e) =>
              e?.length > 0 &&
              e?.map((item, ind) => {
                return (
                  <Grid item md={6} xs={12} key={ind}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2} mb={1}>
                          <Grid item md={4}>
                            <Typography fontSize={18} fontWeight="bold">
                              Team Name
                            </Typography>
                          </Grid>
                          <Grid item md={6}>
                            <Typography fontSize={18}>
                              {item?.team?.name}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} mb={1}>
                          <Grid item md={4}>
                            <Typography fontSize={18} fontWeight="bold">
                              Project Name
                            </Typography>
                          </Grid>
                          <Grid item md={6}>
                            <Typography fontSize={18}>{item?.title}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4}>
                            <Typography fontSize={18} fontWeight="bold">
                              Leader Name
                            </Typography>
                          </Grid>
                          <Grid item md={6}>
                            <Typography fontSize={18}>
                              {item?.team?.teamLeader?.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions className="px-3 pt-0 pb-3">
                        <Link to={`../project/${item?._id}`} className="link">
                          <Button color="secondary" variant="contained">
                            View
                          </Button>
                        </Link>
                        {item?.meetDetails &&
                          new Date() >=
                            new Date(item?.meetDetails?.startDateTime) &&
                          new Date() <=
                            new Date(item?.meetDetails?.endDateTime) && (
                            <Tooltip title="This team want to discuss with you">
                              <Link
                                to={item?.meetDetails?.hangoutLink}
                                className="link"
                                target="_blank"
                              >
                                <Button
                                  className="Button imp-btn mt-2"
                                  color="success"
                                  variant="outlined"
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  <img
                                    className="g-img me-1"
                                    src={M}
                                    alt="Google"
                                  />
                                  Join with Google Meet
                                </Button>
                              </Link>
                            </Tooltip>
                          )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
          )}
        </Grid>

        {undefinedArrays?.length === approvedProjects?.length && (
          <Typography className="Typography no" fontWeight="bold">
            No Teams
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default GuideDashboard;
