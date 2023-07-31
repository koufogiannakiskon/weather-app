import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useStyles from "./utils/styles.js";

const Header = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Typography variant="h4" component="h1" gutterBottom>
        Weather App
      </Typography>
    </Box>
  );
};

export default Header;
