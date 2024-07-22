import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { Button, Typography } from "@mui/material";

const AddSingleMember = ({ addUserToTeam, loading, setLoading }) => {
  const [userToAdd, setUserToAdd] = React.useState("");
  const handleChange = (event) => setUserToAdd(event.target.value);

  const { users, user } = useGlobalUserContext();
  const filteredUsers = users?.filter(
    (item) => item?._id !== user?.user?._id && !item?.addedToTeam
  );

  return (
    <Box className="mt-1">
      <FormControl fullWidth>
        <InputLabel id="add-member">Member</InputLabel>
        <Select
          labelId="add-member"
          id="member"
          value={userToAdd}
          label="Member"
          onChange={handleChange}
        >
          {filteredUsers?.map((item) => (
            <MenuItem value={item} key={item?._id}>
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
      <Button
        variant="contained"
        disabled={loading}
        className="mt-3"
        onClick={() => {
          addUserToTeam(userToAdd);
          setUserToAdd("");
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddSingleMember;
