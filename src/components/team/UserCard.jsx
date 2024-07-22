import React from "react";
import { Avatar, Chip, Tooltip } from "@mui/material";

const UserCard = ({
  user,
  addUser,
  removeUser,
  grpLeaderCanDelete,
}) => {
  const { name, profilePic, _id, expertise } = user;
  const skillsStr = expertise?.join(", ");

  return (
    <Tooltip title={`Skills -> ${skillsStr}`}>
      {grpLeaderCanDelete ? (
        <Chip
          avatar={<Avatar alt={name} src={profilePic} />}
          variant="outlined"
          className="mb-2"
          onDelete={(e) => {
            e.stopPropagation();
            removeUser(_id);
          }}
          label={name}
        />
      ) : (
        <Chip
          avatar={<Avatar alt={name} src={profilePic} />}
          label={name}
          variant="outlined"
          className="mb-2"
          onClick={() => addUser(user)}
        />
      )}
    </Tooltip>
  );
};

export default UserCard;
