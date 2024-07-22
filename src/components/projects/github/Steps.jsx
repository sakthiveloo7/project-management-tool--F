import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Steps from "../../../assets/steps.jpg";
import { Card, CardMedia } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  maxWidth: "95%",
  background: "#fff",
  borderRadius: 2,
  p: 4,
};

const StepsPAT = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" className="fw-bold">
        Steps to create PAT
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={24} mb={2} fontWeight="bold">
            Steps to Create Personal Access Token
          </Typography>
          <Card>
            <CardMedia component="img" src={Steps} />
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default StepsPAT;
