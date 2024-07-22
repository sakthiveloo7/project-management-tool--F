import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useGlobalUserContext } from "../../contexts/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import AddProject from "./AddProject";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";

const Title = styled(Typography)`
  color: #001c30;
  font-size: 18px;
`;

const DelIcon = styled(DeleteIcon)`
  display: inline-block;
  font-size: 16px;
  margin-left: 4px;
  cursor: pointer;
`;

const ProjectsLists = ({ projects, isTeam, ind }) => {
  const { user, getSingleProject, getTasks, dispatch, getComments, setInd } =
    useGlobalUserContext();

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${api}/api/project/deleteProject/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Project Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        isTeam
          ? dispatch({ type: "DELETE_TEAM_PROJECT", payload: { id, ind } })
          : dispatch({ type: "DELETE_PROJECT", payload: id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChangeProject = (id) => {
    getSingleProject(id);
    getTasks(id);
    getComments(id);
    setInd(ind);
  };

  useEffect(() => {
    handleChangeProject();
  }, []);

  return (
    <div className="p-0">
      {projects?.length > 0 ? (
        projects?.map((pro, ind) => {
          const { title, isTeamProject, team, _id } = pro;

          return (
            <Grid
              container
              alignItems="flex-start"
              className="pro-box"
              onClick={() => handleChangeProject(_id)}
              key={_id}
            >
              <Grid item md={10} xs={10}>
                <Title>{title}</Title>
              </Grid>
              <Grid item md={2} xs={2}>
                {(!isTeamProject ||
                  (isTeamProject &&
                    user?.user?._id === team?.teamLeader?._id)) && (
                  <div className="icons">
                    <AddProject
                      projectId={_id}
                      isTeamProject={isTeamProject}
                      ind={ind}
                    />
                    <DelIcon
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(_id);
                      }}
                      className="mt-1"
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Typography mt={3} mb={2} fontSize={16}>
          No projects. Please add projects
        </Typography>
      )}
    </div>
  );
};

export default ProjectsLists;
