import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../utils/Api";
import { useGlobalUserContext } from "../../contexts/UserContext";

const DueDate = ({ dueDate, stage, email, fromAssigned }) => {

  const { user } = useGlobalUserContext();
  const [notificationSend, setNotificationSend] = useState(false);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short", 
      day: "numeric",
    };

    return new Date(date).toLocaleDateString(undefined, options);
  };

  const sendNotification = async () => {
    try {
      const res = await fetch(`${api}/api/task/sendDueEmail/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) setNotificationSend(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (stage !== "completed" && !fromAssigned && !notificationSend) {
      const d = new Date(dueDate);
      const curr = new Date();

      const dueYear = d.getFullYear();
      const dueMonth = d.getMonth();
      const dDate = d.getDate();

      const currYear = curr.getFullYear();
      const currMonth = curr.getMonth();
      const currDate = curr.getDate();

      if (dueYear === currYear) {
        if (dueMonth === currMonth) {
          if (dDate - currDate >= 0 && dDate - currDate < 2) {
            sendNotification();
          }
        }
      }
    }
  }, []);

  return <Typography>{formatDate(dueDate)}</Typography>;
};

export default DueDate;