import React, { createContext, useContext, useEffect, useReducer } from "react";
import { api } from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { UserReducer } from "../reducers/UserReducer";
import { toast } from "react-toastify";

const Context = createContext();

const initialState = {
  user: {},
  users: [],
  projects: [],
  singleProject: {},
  tasks: [],
  teams: [],
  teamProjects: [[]],
  comments: [],
  guides: [],
  ind: 0,
  allTasks: [],
  contacts: [],
};

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const navigate = useNavigate();

  const registerUser = async (auth) => {
    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  const loginUser = async ({ email, password, role }) => {
    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch(`${api}/api/user/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_USERS", payload: data.users });
    } catch (error) {
      return error.message;
    }
  };

  const getUserProjects = async () => {
    if (state.user) {
      try {
        const res = await fetch(`${api}/api/project/getAllProjects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        const data = await res.json();
        if (data.success)
          dispatch({ type: "SET_PROJECTS", payload: data.projects });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getSingleProject = async (id) => {
    if (id) {
      try {
        const res = await fetch(`${api}/api/project/getProject/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        const data = await res.json();
        if (data.success)
          dispatch({ type: "SET_SINGLE_PROJECT", payload: data.project });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getTasks = async (id) => {
    if (id) {
      try {
        const res = await fetch(`${api}/api/task/getAllTasks/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        const data = await res.json();
        if (data.success) dispatch({ type: "SET_TASKS", payload: data.tasks });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getAllTasks = async () => {
    try {
      const res = await fetch(`${api}/api/task/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_ALL_TASKS", payload: data.tasks });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTeams = async () => {
    try {
      const res = await fetch(`${api}/api/team/getTeams`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "GET_TEAMS", payload: data.teams });
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamProjects = async (id, ind) => {
    try {
      const res = await fetch(`${api}/api/project/getTeamProjects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({
          type: "GET_TEAM_PROJECTS",
          payload: { projects: data.projects, ind },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (id) => {
    try {
      const res = await fetch(`${api}/api/comment/getComments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "GET_COMMENTS", payload: data.comments });
    } catch (error) {
      console.log(error.message);
    }
  };

  const requestGuide = async (tid, pid, guide, ind) => {
    try {
      const res = await fetch(`${api}/api/project/requestGuide/${tid}/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ status: "requested", guide }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Guide Requested", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch({
          type: "UPDATE_TEAM_PROJECT",
          payload: { projectId: pid, pro: data.project, ind },
        });
        getSingleProject(pid);
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
      toast.error("User already added", {
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

  const getGuides = async () => {
    try {
      const res = await fetch(`${api}/api/guide/guides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "GET_GUIDES", payload: data.guides });
    } catch (error) {}
  };

  const setInd = (ind) => dispatch({ type: "SET_IND", payload: ind });

  const acceptApproval = async (status, tid, pid, guide, ind) => {
    try {
      const res = await fetch(`${api}/api/guide/acceptApproval/${tid}/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ guide, status }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Request Accepted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "UPDATE_TEAM_PROJECT",
          payload: { projectId: pid, pro: data.project, ind },
        });
        navigate("/");
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

  const rejectApproval = async (status, tid, pid, guide, ind) => {
    try {
      const res = await fetch(`${api}/api/guide/rejectApproval/${tid}/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ guide, status }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Request Accepted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch({
          type: "UPDATE_TEAM_PROJECT",
          payload: { projectId: pid, pro: data.project, ind },
        });
        navigate("/");
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

  const getContacts = async () => {
    try {
      const res = await fetch(`${api}/api/contact/contacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_CONTACTS", payload: data.contacts });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsers();
    getUserProjects();
    getTasks();
    getTeams();
    getComments();
    getGuides();
    getAllTasks();
    getContacts();
  }, [state?.user]);

  useEffect(() => {
    if (state.user?.user?.role === "user") {
      const filteredTeams = state.teams.filter(
        (element) =>
          element?.teamLeader?._id === state?.user?.user?._id ||
          element?.members?.find((item) => item?._id === state?.user?.user?._id)
      );

      filteredTeams.forEach((elem, index) => getTeamProjects(elem._id, index));
    } else {
      state.teams.forEach((elem, index) => getTeamProjects(elem._id, index));
    }
  }, [state.teams, state.teamProjects]);

  useEffect(() => {
    const storedUser = localStorage.getItem("project-tool-user");
    if (storedUser)
      dispatch({ type: "SET_USER", payload: JSON.parse(storedUser) });
    else dispatch({ type: "REMOVE_USER" });
  }, [navigate]);

  /* useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
  }); */

  return (
    <Context.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        getSingleProject,
        getTasks,
        getComments,
        dispatch,
        requestGuide,
        setInd,
        acceptApproval,
        rejectApproval,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalUserContext = () => useContext(Context);

export { UserContext, useGlobalUserContext };
