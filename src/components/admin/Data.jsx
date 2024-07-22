import { TableCell, Typography } from "@mui/material";
import React from "react";

const Data = ({ align, text, fromData, description, width, expertise }) => {
  return (
    <TableCell align={align} width={width}>
      <Typography
        fontSize={fromData ? (description ? 14 : 17) : 20}
        fontWeight={!fromData && "bold"}
        textAlign={expertise ? "center" : description && "justify"}
      >
        {text}
      </Typography>
    </TableCell>
  );
};

export default Data;
