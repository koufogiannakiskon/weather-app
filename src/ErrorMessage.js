import React from "react";
import Typography from "@mui/material/Typography";
import useStyles from "./utils/styles.js";
import { Paper } from "@mui/material";

const ErrorMessage = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography variant="body1" className="error-message">
        No weather data available. Please try another location.
      </Typography>
    </Paper>
  );
};

export default ErrorMessage;
