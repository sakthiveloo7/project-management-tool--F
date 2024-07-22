import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { useGlobalUserContext } from "../../contexts/UserContext";

const GuideRequests = () => {
  const { teamProjects, user, acceptApproval, rejectApproval } =
    useGlobalUserContext();

  const requestedProjects = teamProjects?.map((e) => {
    const arr = e?.filter(
      (item) =>
        item?.guide?._id === user?.user?._id &&
        item?.approvalStatus === "requested"
    );

    if (arr.length > 0) return arr;
  });

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return new Date(date).toLocaleString(undefined, options);
  };

  const undefinedArrays = requestedProjects?.filter(
    (item) => item === undefined
  );

  return (
    <Container className="container">
      <Box>
        <Typography
          className="Typography guide-request-title"
          color="primary"
          fontWeight="bold"
          mb={2}
        >
          Team requesting for your guidance & assurance
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          {requestedProjects?.map(
            (e) =>
              e?.length > 0 &&
              e?.map((item) => {
                const { title, description, start, end, team, _id, index } =
                  item;

                return (
                  <Grid item md={6} xs={12} key={_id}>
                    <Card>
                      <CardContent className="p-0">
                        <Typography
                          fontSize={30}
                          fontWeight="bold"
                          color="primary"
                          className="p-3"
                        >
                          {team?.name}
                        </Typography>
                        <Grid
                          container
                          className="p-3 py-1"
                          justifyContent="space-between"
                        >
                          <Grid item md={4} xs={4}>
                            <Typography fontSize={20} fontWeight="bold">
                              Team Leader
                            </Typography>
                          </Grid>
                          <Grid item md={8} xs={8}>
                            <Tooltip
                              title={`Skills - ${team?.teamLeader?.expertise?.join(
                                ", "
                              )}`}
                              placement="bottom"
                            >
                              <Typography fontSize={20}>
                                {team?.teamLeader?.name}
                              </Typography>
                            </Tooltip>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className="p-3"
                          justifyContent="space-between"
                        >
                          <Grid item md={4} xs={4}>
                            <Typography fontSize={20} fontWeight="bold">
                              Members
                            </Typography>
                          </Grid>
                          <Grid item md={8} xs={8}>
                            <div className="">
                              {team?.members
                                ?.filter(
                                  (item) => item?._id !== team?.teamLeader?._id
                                )
                                ?.map((e, ind) => (
                                  <Tooltip
                                    title={`Skills - ${e?.expertise.join(
                                      ", "
                                    )}`}
                                  >
                                    <Chip
                                      label={e.name}
                                      key={ind}
                                      variant="outlined"
                                      className="m-1"
                                    />
                                  </Tooltip>
                                ))}
                            </div>
                          </Grid>
                        </Grid>
                        <Typography
                          fontSize={23}
                          fontWeight="bold"
                          className="border-top p-3 mt-2"
                          color="primary"
                        >
                          Project Details
                        </Typography>
                        <Grid container className="p-3 py-1">
                          <Grid item md={4}>
                            <Typography fontWeight="bold" fontSize={20}>
                              Title
                            </Typography>
                          </Grid>
                          <Grid item md={8}>
                            <Typography fontSize={20}>{title}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container className="p-3">
                          <Grid item md={4}>
                            <Typography fontWeight="bold" fontSize={18}>
                              Description
                            </Typography>
                          </Grid>
                          <Grid item md={8}>
                            <Typography fontSize={18}>{description}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container className="p-3 py-1 pb-3">
                          <Grid item md={6}>
                            <Typography fontSize={18} fontWeight="bold">
                              Start: <Chip label={formatDate(start)} />
                            </Typography>
                          </Grid>
                          <Grid item md={6}>
                            <Typography fontSize={18} fontWeight="bold">
                              End: <Chip label={formatDate(end)} />
                            </Typography>
                          </Grid>
                        </Grid>
                        <div className="p-3">
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={() =>
                              acceptApproval(
                                "accepted",
                                team?._id,
                                _id,
                                user?.user?._id
                              )
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            color="error"
                            variant="outlined"
                            className="ms-2"
                            onClick={() =>
                              rejectApproval(
                                "rejected",
                                team?._id,
                                _id,
                                user?.user?._id
                              )
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
          )}
        </Grid>

        {undefinedArrays?.length === requestedProjects?.length && (
          <Typography className="Typography no" fontWeight="bold">
            No Requests
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default GuideRequests;
