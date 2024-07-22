import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import "./Team.css";
import ProjectListTop from "../projects/ProjectListTop";
import ProjectsLists from "../projects/ProjectsLists";
import ProjectMembers from "../projects/ProjectMembers";
import AllTasksModal from "../projects/AllTasksModal";

const Teams = ({ teams }) => {
  const { teamProjects, user, tasks } = useGlobalUserContext();
  const [updatedTeams, setUpdatedTeams] = useState();
  
  const handleClick = async (id) =>
    setUpdatedTeams(
      updatedTeams.map((team) => {
        if (team._id === id) return { ...team, open: !team.open };
        return team;
      })
    );

  useEffect(() => {
    setUpdatedTeams(
      teams.map((team) => {
        return { ...team, open: true };
      })
    );
  }, [teams]);

  return (
    <Box>
      <Typography color="primary" fontSize={26} fontWeight="bold" mb={-2}>
        Team Name
      </Typography>
      <div className="team-lists">
        {updatedTeams?.length > 0 &&
          updatedTeams?.map((team, ind) => {
            const { name, open, _id, teamLeader, members } = team;
            return (
              <div className="teams" key={_id}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className="Grid team-card border-bottom py-3 border-2"
                  onClick={() => handleClick(_id)}
                >
                  <Grid item md={10}>
                    <Typography fontSize={18}>{name}</Typography>
                  </Grid>
                  <Grid item md={2}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </Grid>
                </Grid>
                <Box>
                  {open && (
                    <div className="team">
                      <ProjectListTop
                        isTeamProject={true}
                        team={_id}
                        ind={ind}
                        isGrpLeader={teamLeader._id === user?.user?._id}
                      />
                      <ProjectsLists
                        projects={teamProjects[ind]}
                        isTeam={true}
                        ind={ind}
                      />
                      <ProjectMembers
                        members={members}
                        teamLeader={teamLeader}
                      />
                      {tasks?.length > 0 && <AllTasksModal />}
                    </div>
                  )}
                </Box>
              </div>
            );
          })}
      </div>
    </Box>
  );
};

export default Teams;
