import Twitter from "@mui/icons-material/Twitter";
import { CircularProgress, Stack } from "@mui/material";
import React from "react";

export const LoadingPage = () => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      spacing={12}
      sx={{ height: "100vh" }}
    >
      <Twitter sx={{ display: "flex", color: "#1da1f2", fontSize: "150px" }} />

      <CircularProgress
        className="circularProgress"
        thickness={5}
        size={80}
        sx={{ display: "flex", color: "#1da1f2" }}
      />
    </Stack>
  );
};
