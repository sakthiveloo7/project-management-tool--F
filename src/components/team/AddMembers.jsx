import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { useGlobalUserContext } from "../../contexts/UserContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddMembers = ({ title, members, setMembers }) => {
  const theme = useTheme();
  const [grpMembers, setGrpMembers] = React.useState([]);
  const { users, user } = useGlobalUserContext();
  const filteredUsers = users?.filter((item) => item?._id !== user?.user?._id && !item?.addedToTeam);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGrpMembers(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setMembers([...members, ...new Set(value)]);
  };

  return (
    <div>
      <Typography fontSize={18}>{title}</Typography>
      <FormControl fullWidth className="my-2">
        <InputLabel id="demo-multiple-skill-label">Members</InputLabel>
        <Select
          labelId="demo-multiple-skill-label"
          id="demo-multiple-skill"
          multiple
          value={grpMembers}
          onChange={handleChange}
          input={<OutlinedInput label="Members" />}
          MenuProps={MenuProps}
        >
          {filteredUsers?.map((item) => (
            <MenuItem
              key={item?._id}
              value={item}
              style={getStyles(item?.name, grpMembers, theme)}
            >
              <Typography
                fontWeight="bold"
                fontSize={16}
                display="inline-block"
                className="me-2"
              >
                {item?.name}
              </Typography>
              <Typography
                color="GrayText"
                className="ms-1"
                fontSize={14}
                display="inline-block"
              >
                [Skills: {item?.expertise?.join(",")}]
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AddMembers;
