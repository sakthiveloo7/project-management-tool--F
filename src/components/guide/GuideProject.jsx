import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Typography,
  Grid,
  Rating,
} from "@mui/material";
import GuideProjectStatus from "./GuideProjectStatus";
import { useGlobalUserContext } from "../../contexts/UserContext";
import GuideTable1 from "./GuideTable1";
import GuideTable2 from "./GuideTable2";
import GuideTable3 from "./GuideTable3";
import GuideTable4 from "./GuideTable4";
import GuideTable5 from "./GuideTable5";
import TaskStatus from "../tasks/TaskStatus";
import GuideFeedback from "./GuideFeedback";

const GuideProject = () => {
  const { id } = useParams();
  const { getTasks, tasks, teamProjects, user } = useGlobalUserContext();
  const [project, setProject] = useState({});
  const [expanded, setExpanded] = React.useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTasks(id);
      teamProjects?.forEach((e) => {
        e?.forEach((item) => {
          if (item?._id === id) setProject(item);
        });
      });
    };

    fetchData();
  }, [getTasks, teamProjects, id]);

  return (
    <Container maxWidth="xl" className="container">
      <Box>
        <Grid container alignItems="center">
          <Grid item md={8} xs={12}>
            <Typography color="primary" fontSize={30} fontWeight="bold">
              {project?.title}
            </Typography>
            <Typography color="GrayText" fontSize={15} textAlign="justify">
              {project?.description}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12} className="Grid button">
            <GuideProjectStatus project={project || {}} tasks={tasks || []} />
          </Grid>
        </Grid>

        <div className="px-2 mt-2">
          {[
            "todo",
            "inProgress",
            "to verify by teamLeader",
            "to verify by guide",
            "completed",
          ].map((stage, index) => {
            const filteredTasks = tasks?.filter(
              (item) => item?.stage === stage
            );

            return (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onMouseOver={() => handleChange(`panel${index}`)(null, true)}
                onMouseLeave={() => handleChange(`panel${index}`)(null, false)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                  className="border-bottom border-top-0"
                >
                  <Typography fontWeight="bold">
                    {stage?.toUpperCase()}{" "}
                    <Chip
                      label={filteredTasks.length}
                      className="ms-2"
                      variant="outlined"
                    />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {filteredTasks?.length > 0 ? (
                    index === 0 ? (
                      <GuideTable1 filteredTasks={filteredTasks} />
                    ) : index === 1 ? (
                      <GuideTable2 filteredTasks={filteredTasks} />
                    ) : index === 2 ? (
                      <GuideTable3 filteredTasks={filteredTasks} />
                    ) : index === 3 ? (
                      <GuideTable4 filteredTasks={filteredTasks} />
                    ) : (
                      <GuideTable5 filteredTasks={filteredTasks} />
                    )
                  ) : (
                    <Typography>No Tasks</Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}

          {tasks?.length > 0 && (
            <TaskStatus noOfTasks={project?.noOfTasks} fromGuide={true} />
          )}

          {project?.feedbackToGuide && (
            <div className="my-4">
              <Typography fontSize={24} color="primary" mb={1.4}>
                Feedback
              </Typography>
              <Grid container spacing={2} mb={2}>
                <Grid item md={2} xs={2}>
                  <Typography fontSize={18}>Rating</Typography>
                </Grid>
                <Grid item md={10} xs={10}>
                  <Rating
                    value={project?.guide?.rating}
                    precision={0.5}
                    readOnly
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} mb={2}>
                <Grid item md={2} xs={2}>
                  <Typography fontSize={18}>Team Feedback</Typography>
                </Grid>
                <Grid item md={10} xs={10}>
                  <Typography fontSize={17}>
                    {project?.feedbackToGuide}
                  </Typography>
                </Grid>
              </Grid>
              {project?.feedbackFromGuide ? (
                <Grid container spacing={2} mb={2}>
                  <Grid item md={2} xs={2}>
                    <Typography fontSize={18}>My Feedback</Typography>
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <Typography fontSize={17}>
                      {project?.feedbackFromGuide}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <GuideFeedback pid={project?._id} />
              )}
            </div>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default GuideProject;
