import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import Steps from "../../../assets/video-steps.mp4";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  maxWidth: "96%",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const StepsToCreateToken = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        sx={{ textTransform: "capitalize" }}
        className="fw-bold"
      >
        Steps to generate token
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={26} fontWeight="bold" mb={2}>
            Watch the entire video
          </Typography>
          <Typography fontSize={18} mb={1} >
            Visit here{" "}
            <Link target="_blank" to="https://www.linkedin.com/developers/apps">
              https://www.linkedin.com/developers/apps
            </Link>
          </Typography>
          <Card>
            <CardMedia component="video" controls src={Steps} />
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default StepsToCreateToken;
