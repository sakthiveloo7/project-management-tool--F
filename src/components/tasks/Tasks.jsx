import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useGlobalUserContext } from "../../contexts/UserContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Tasks.css";
import AddGitDetailsForm from "../projects/github/AddGitDetailsForm";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import Table1 from "./Table1";
import Table2 from "./Table2";
import Table3 from "./Table3";
import Table4 from "./Table4";
import Table5 from "./Table5";
import PostToLinked from "../projects/linkedin/PostToLinkedin";

const Tasks = () => {
  const [expanded, setExpanded] = React.useState(true);
  const { tasks, user, singleProject } = useGlobalUserContext();

  const handleChange = (panel) => (event, isExpanded) =>
    setExpanded(isExpanded ? panel : false);

  return (
    <>
      {tasks?.filter((item) => item?.assignedTo?._id === user?.user?._id)
        ?.length > 0 && (
        <Typography color="primary" fontSize={24} mb={2}>
          Tasks assigned to me
        </Typography>
      )}
      <div className="mt-3">
        {[
          "todo",
          "inProgress",
          "to verify by teamLeader",
          "to verify by guide",
          "completed",
        ].map((stage, index) => {
          const filteredTasks = tasks?.filter(
            (task) =>
              task.stage === stage && task?.assignedTo?._id === user?.user?._id
          );

          return (
            filteredTasks?.length > 0 && (
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
                  {index === 0 ? (
                    <Table1 filteredTasks={filteredTasks} />
                  ) : index === 1 ? (
                    <Table2 filteredTasks={filteredTasks} />
                  ) : index === 2 ? (
                    <Table3 filteredTasks={filteredTasks} />
                  ) : index === 3 ? (
                    <Table4 filteredTasks={filteredTasks} />
                  ) : (
                    <Table5 filteredTasks={filteredTasks} />
                  )}
                </AccordionDetails>
              </Accordion>
            )
          );
        })}
      </div>

      {singleProject?.team?.teamLeader?._id === user?.user?._id && (
        <div className="mt-4">
          <Grid container>
            <Grid item md={8} xs={12}>
              <Typography color="primary" fontSize={24} mb={2}>
                Assigned Tasks Status
              </Typography>
            </Grid>
            <Grid item md={4} xs={12} className="Grid github-details">
              {!singleProject?.gitHubDetails ? (
                <AddGitDetailsForm proId={singleProject?._id} />
              ) : (
                <AddGitDetailsForm
                  proId={singleProject?._id}
                  gitDetails={singleProject?.gitHubDetails}
                  edit={true}
                />
              )}
            </Grid>
          </Grid>

          {tasks?.length > 0 ? (
            [
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
                  expanded={expanded === `panel${(index + 1) * 10}`}
                  onMouseOver={() =>
                    handleChange(`panel${(index + 1) * 10}`)(null, true)
                  }
                  onMouseLeave={() =>
                    handleChange(`panel${(index + 1) * 10}`)(null, false)
                  }
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${(index + 1) * 10}bh-content`}
                    id={`panel${(index + 1) * 10}bh-header`}
                    className="border-bottom"
                  >
                    <Typography fontWeight="bold">
                      {stage?.toUpperCase()}
                      <Chip
                        label={filteredTasks.length}
                        className="ms-2"
                        variant="outlined"
                      />
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {filteredTasks.length > 0 ? (
                      index === 0 ? (
                        <Table1
                          filteredTasks={filteredTasks}
                          fromAssigned={true}
                        />
                      ) : index === 1 ? (
                        <Table2
                          filteredTasks={filteredTasks}
                          fromAssigned={true}
                        />
                      ) : index === 2 ? (
                        <Table3
                          filteredTasks={filteredTasks}
                          fromAssigned={true}
                        />
                      ) : index === 3 ? (
                        <Table4
                          filteredTasks={filteredTasks}
                          fromAssigned={true}
                        />
                      ) : (
                        <Table5
                          filteredTasks={filteredTasks}
                          fromAssigned={true}
                        />
                      )
                    ) : (
                      <Typography>No tasks</Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <Typography>No tasks assigned</Typography>
          )}
        </div>
      )}

      {singleProject?.projectGithubRepository && (
        <Grid container alignItems="center" mt={4}>
          <Grid item md={6} xs={12}>
            <Link
              to={singleProject?.projectGithubRepository}
              className="link"
              target="_blank"
            >
              <Button
                className="btn btn-dark Button imp"
                variant="contained"
                sx={{ textTransform: "capitalize", background: "#0f1419" }}
              >
                <GitHubIcon className="me-1 fs-5" /> Visit Project Github Repo
              </Button>
            </Link>
          </Grid>
          {tasks?.filter((item) => item?.stage == "completed")?.length ===
            singleProject?.noOfTasks &&
            singleProject?.team?.teamLeader?._id === user?.user?._id && (
              <Grid item md={6} xs={12} textAlign="end">
                <PostToLinked
                  github={singleProject?.projectGithubRepository}
                  members={singleProject?.team?.members}
                />
              </Grid>
            )}
        </Grid>
      )}
    </>
  );
};

export default Tasks;
