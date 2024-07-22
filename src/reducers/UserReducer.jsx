export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_USERS":
      return {
        ...state,
        users: [...action.payload],
      };

    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };

    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "SET_ALL_TASKS":
      return {
        ...state,
        allTasks: action.payload,
      };

    case "SET_SINGLE_PROJECT":
      return {
        ...state,
        singleProject: action.payload,
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case "UPDATE_PROJECT": {
      let tempProjects = state.projects;
      const { projectId, pro } = action.payload;

      tempProjects = tempProjects.map((p) => {
        if (p._id === projectId) return pro;
        return p;
      });

      return {
        ...state,
        projects: tempProjects,
      };
    }

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((pro) => pro._id !== action.payload),
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "REQUEST_TO_CHANGE":
      let tempTasks = state.tasks;
      tempTasks = tempTasks.map((item) => {
        if (item?._id === action.payload)
          return { ...item, assignedUserRequestedToChangeStage: true };
        return item;
      });

      return {
        ...state,
        tasks: tempTasks,
      };

    case "UPDATE_TASK":
      let tempTasks1 = state.tasks;
      const { taskId, task } = action.payload;

      tempTasks1 = tempTasks1.map((t) => {
        if (t._id === taskId) return task;
        return t;
      });

      return {
        ...state,
        tasks: tempTasks1,
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };

    case "GET_TEAMS":
      return {
        ...state,
        teams: action.payload,
      };

    case "ADD_TEAM":
      return {
        ...state,
        teams: [...state.teams, action.payload],
      };

    case "UPDATE_TEAM":
      var tempTeams = state.teams;
      tempTeams = tempTeams?.map((item) => {
        if (item?._id === action.payload.tid) return action.payload.data;
        return item;
      });

      return {
        ...state,
        teams: tempTeams,
      };

    case "GET_TEAM_PROJECTS": {
      const { projects, ind } = action.payload;
      let arr = state.teamProjects;
      arr[ind] = projects;

      return {
        ...state,
        teamProjects: arr,
      };
    }

    case "ADD_TEAM_PROJECT": {
      const { project, ind } = action.payload;
      let arr = state.teamProjects;
      if (!arr[ind].find((pro) => pro?._id === project?._id))
        arr[ind] = [...arr[ind], project];

      return {
        ...state,
        teamProjects: arr,
      };
    }

    case "UPDATE_TEAM_PROJECT": {
      let tempPros = state.teamProjects;
      tempPros[action.payload.ind] = tempPros[action.payload.ind]?.map((p) => {
        if (p._id === action.payload.projectId) return action.payload.pro;
        return p;
      });

      return {
        ...state,
        teamProjects: tempPros,
      };
    }

    case "DELETE_TEAM_PROJECT": {
      return {
        ...state,
        teamProjects: state.teamProjects[action.payload.ind].filter(
          (pro) => pro._id !== action.payload.id
        ),
      };
    }

    case "GET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };

    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };

    case "GET_GUIDES":
      return {
        ...state,
        guides: [...action.payload],
      };

    case "REMOVE_USER":
      return {
        ...state,
        user: {},
      };

    case "SET_IND":
      return { ...state, ind: action.payload };

    case "UPDATE_GUIDE":
      const { gid, guide } = action.payload;
      var tempGuides = state.guides;
      tempGuides = tempGuides?.map((item) => {
        if (item?._id === gid) return guide;
        return item;
      });

      return { ...state, guides: tempGuides };

    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((item) => item?._id !== action.payload),
      };

    default:
      return state;
  }
};
