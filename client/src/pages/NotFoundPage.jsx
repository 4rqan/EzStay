import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <ErrorOutline sx={{ fontSize: 72, color: "error.main" }} />
      <Typography variant="h4" align="center" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        The requested page does not exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
      >
        Go back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
