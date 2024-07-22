import { Button, Container, Grid, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useGlobalUserContext } from "../../contexts/UserContext";
import AddTask from "../tasks/TaskForm";
import Tasks from "../tasks/Tasks";
import ProjectDesc from "./ProjectDesc";
import Discussions from "../discussions/Discussions";
import ProjectStatus from "./ProjectStatus";
import { api } from "../../utils/Api";
import CreateEvent from "../../pages/CreateEvent";
import M from "../../assets/meet.png";
import { Link } from "react-router-dom";
import TaskStatus from "../tasks/TaskStatus";
import CreateTeam from "../team/CreateTeam";
import Teams from "../team/Teams";
import RateGuide from "./RateGuide";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Projects = () => {
  const { tasks, singleProject, teams, user, dispatch } =
    useGlobalUserContext();

  const { title, _id, team, isTeamProject } = singleProject;

  const filteredTeams = teams.filter(
    (element) =>
      element?.teamLeader?._id === user?.user?._id ||
      element?.members?.find((item) => item?._id === user?.user?._id)
  );

  const handleUpdateMeetDetails = async (id) => {
    try {
      const res = await fetch(`${api}/api/project/deleteMeetEvent/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({
          type: "UPDATE_PROJECT",
          payload: { projectId: id, pro: data.project },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const checkDateTime = (startDateTime, endDateTime) => {
    return (
      new Date() >= new Date(startDateTime) &&
      new Date() <= new Date(endDateTime)
    );
  };

  const [openLeft, setOpenLeft] = useState(false);

  useEffect(() => {
    if (
      new Date(singleProject?.meetDetails?.endDateTime) < new Date() &&
      singleProject?.team?.teamLeader?._id === user?.user?._id
    ) {
      handleUpdateMeetDetails(singleProject?._id);
    }
  }, [singleProject]);

  return (
    <Container maxWidth="xl">
      <div className="bar-icon">
        {!openLeft && <MenuIcon onClick={() => setOpenLeft(!openLeft)} />}
      </div>

      <Grid container spacing={2} rowSpacing={4}>
        <Grid item md={2.5} xs={12}>
          <div className={`left-side-bar ${openLeft && "open-left-nav"}`}>
            <div className="close-icon close">
              <CloseIcon onClick={() => setOpenLeft(!openLeft)} />
            </div>
            {filteredTeams?.length > 0 && <Teams teams={filteredTeams} />}
            {filteredTeams?.length === 0 && <CreateTeam />}
          </div>
        </Grid>
        <Grid item md={9.5} xs={12}>
          <div className="right-side-bar">
            {Object.keys(singleProject).length > 0 ? (
              <>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  my={1}
                >
                  <Grid item>
                    <div className="top-header">
                      <Typography
                        className="Typography singleProTitle"
                        color="primary"
                      >
                        {title}
                      </Typography>
                      <ProjectDesc project={singleProject} />
                    </div>
                  </Grid>
                  <Grid item textAlign="end">
                    <div className="d-flex align-items-center justify-content-between">
                      {singleProject?.meetDetails &&
                        checkDateTime(
                          singleProject?.meetDetails?.startDateTime,
                          singleProject?.meetDetails?.endDateTime
                        ) &&
                        singleProject?.approvalStatus === "accepted" && (
                          <Link
                            to={singleProject?.meetDetails?.hangoutLink}
                            className="link"
                            target="_blank"
                          >
                            <Button
                              className="Button imp-btn me-2"
                              color="success"
                              variant="outlined"
                            >
                              <img
                                className="g-img me-1"
                                src={M}
                                alt="Google"
                              />
                              Join with Google Meet
                            </Button>
                          </Link>
                        )}

                      {team?.teamLeader?._id === user?.user?._id && (
                        <>
                          {singleProject?.team?.teamLeader?._id ===
                            user?.user?._id &&
                            !singleProject?.meetDetails &&
                            singleProject?.approvalStatus === "accepted" && (
                              <CreateEvent
                                teamMembers={singleProject?.team?.members}
                                projectID={singleProject?._id}
                                guide={singleProject?.guide?.email}
                              />
                            )}

                          {singleProject?.noOfTasks - tasks?.length > 0 && (
                            <AddTask
                              projectId={_id}
                              singleProject={singleProject}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </Grid>
                </Grid>

                <Tasks projectId={_id} />

                {tasks?.length > 0 && (
                  <TaskStatus noOfTasks={singleProject?.noOfTasks} />
                )}
              </>
            ) : (
              filteredTeams.length === 0 && (
                <Typography
                  fontSize={34}
                  fontWeight="bold"
                  textAlign="center"
                  mt={8}
                >
                  No teams created! Be the first to add.
                </Typography>
              )
            )}
            {isTeamProject && (
              <>
                {tasks?.filter((item) => item?.stage === "completed")?.length >
                  0 && <ProjectStatus />}
                <Discussions project={_id} team={team?._id} />
                {tasks?.filter((item) => item?.stage === "completed")
                  ?.length === singleProject?.noOfTasks &&
                  (!singleProject?.feedbackToGuide ? (
                    <RateGuide
                      guide={singleProject?.guide?._id}
                      pid={singleProject?._id}
                    />
                  ) : (
                    <div className="mt-5 pb-4">
                      <Typography fontSize={24} color="primary" mb={1.4}>
                        Ours Feedback
                      </Typography>
                      <Grid container spacing={2} mb={2}>
                        <Grid item md={2} xs={2}>
                          <Typography fontSize={18}>Rating</Typography>
                        </Grid>
                        <Grid item md={10} xs={10}>
                          <Rating
                            value={singleProject?.guide?.rating}
                            precision={0.5}
                            readOnly
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} mb={2}>
                        <Grid item md={2} xs={2}>
                          <Typography fontSize={18}>Message</Typography>
                        </Grid>
                        <Grid item md={10} xs={10}>
                          <Typography fontSize={17}>
                            {singleProject?.feedbackToGuide}
                          </Typography>
                        </Grid>
                      </Grid>
                      {singleProject?.feedbackFromGuide && (
                        <Grid container spacing={2} mb={2}>
                          <Grid item md={2} xs={2}>
                            <Typography fontSize={18}>
                              Guide's Feedback
                            </Typography>
                          </Grid>
                          <Grid item md={10} xs={10}>
                            <Typography fontSize={17}>
                              {singleProject?.feedbackFromGuide}
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                    </div>
                  ))}
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Projects;

{
  /* <ProjectListTop personalPro={true} />
    <ProjectsLists projects={projects} /> */
}
