import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";

const TextFieldInput = ({
  title,
  text,
  type,
  others,
  autoFocus,
  value,
  onChange,
  icon,
  multiline,
  rows,
  fromAuth,
  readOnly,
}) => {
  return (
    <FormControl fullWidth className="mb-4">
      <Typography fontSize={18}>{title}</Typography>
      {fromAuth && (
        <Typography fontSize={16} color="GrayText" mb={1}>
          {text}
        </Typography>
      )}
      <OutlinedInput
        id="outlined-adornment-password"
        type={type}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" edge="end">
              {icon}
            </IconButton>
          </InputAdornment>
        }
        name={others}
        placeholder={title}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        required
        multiline={multiline}
        rows={rows}
        readOnly={readOnly}
      />
    </FormControl>
  );
};

export default TextFieldInput;
