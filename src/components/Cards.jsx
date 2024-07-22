import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Cards = ({ img, title, desc }) => {
  return (
    <Card sx={{ height: "360px" }}>
      <CardActionArea>
        <CardMedia component="img" image={img} alt={title} />
        <CardContent>
          <Typography gutterBottom fontWeight="bold" fontSize={26}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Cards;
