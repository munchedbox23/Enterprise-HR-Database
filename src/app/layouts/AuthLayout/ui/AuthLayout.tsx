import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Hourglass } from "@/shared/ui/Hourglass";
import { Suspense } from "react";

export const AuthLayout = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        width: "100vw",
        height: "100vh",
        paddingTop: "100px",
      }}
    >
      <Suspense fallback={<Hourglass />}>
        <Outlet />
      </Suspense>
    </Container>
  );
};