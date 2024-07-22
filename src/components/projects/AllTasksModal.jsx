import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGlobalUserContext } from "../../contexts/UserContext";
import {
  Avatar,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  maxWidth: "96%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AllTasksModal = () => {
  const [open, setOpen] = React.useState(false);
  const { tasks } = useGlobalUserContext();

  return (
    <div>
      <Button
        variant="contained"
        className="mt-4"
        onClick={() => setOpen(true)}
        sx={{ textTransform: "capitalize" }}
      >
        Assigned Tasks Lists
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold" fontSize={24}>
                      Task
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" fontSize={24} width={250}>
                      Assigned To
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold" fontSize={24}>
                      Status
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks?.length > 0 &&
                  tasks?.map((item) => {
                    const { name, assignedTo, stage, _id } = item;
                    return (
                      <TableRow key={_id}>
                        <TableCell>
                          <Typography>{name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item md={2} xs={2}>
                              <Avatar
                                src={assignedTo?.profilePic}
                                alt={assignedTo?.name}
                              />
                            </Grid>
                            <Grid item md={10} xs={10}>
                              <Typography>{assignedTo?.name}</Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            className="fw-bold"
                            color={
                              stage === "todo"
                                ? "primary"
                                : stage === "completed"
                                ? "success"
                                : "warning"
                            }
                            variant="outlined"
                            label={stage[0].toUpperCase() + stage.substr(1)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default AllTasksModal;
