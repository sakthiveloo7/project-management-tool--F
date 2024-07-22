import { Box, Typography } from "@mui/material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import faqs from "../../utils/FaqsData";
import SectionHeading from "../SectionHeading";

const Faqs = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <div className="section-container">
        <SectionHeading title="Frequently Asked Questions" />
        {faqs.map((item) => {
          const { id, question, answer } = item;
          return (
            <Accordion
              expanded={expanded === `panel${id}`}
              onChange={handleChange(`panel${id}`)}
              sx={{ width: "100%" }}
              key={id}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${id}bh-content`}
                id={`panel${id}bh-header`}
              >
                <Typography>{question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="gray">{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </Box>
  );
};

export default Faqs;
