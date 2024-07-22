import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = [
  "C++",
  "Java",
  "Python",
  "HTML",
  "CSS",
  "JavaScript",
  "MERN Stack",
  "Data Science",
  "Machine Learning",
  "DSA",
  "Tailwind CSS",
  "Material UI",
  "Bootstrap",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Expertise = ({ title, setDetails, details }) => {
  const theme = useTheme();
  const [technologies, setTechnologies] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTechnologies(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setDetails({ ...details, skills: [...value] });
  };

  return (
    <div>
      <Typography fontSize={18}>{title}</Typography>
      <FormControl fullWidth className="my-2">
        <InputLabel id="demo-multiple-skill-label">Skills</InputLabel>
        <Select
          labelId="demo-multiple-skill-label"
          id="demo-multiple-skill"
          multiple
          value={technologies}
          onChange={handleChange}
          input={<OutlinedInput label="skills" />}
          MenuProps={MenuProps}
        >
          {skills.map((skill) => (
            <MenuItem
              key={skill}
              value={skill}
              style={getStyles(skill, technologies, theme)}
            >
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Expertise;
