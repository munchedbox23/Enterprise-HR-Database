import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import { RegistrationForm } from "@/features/authorization/registration";
import { LoginForm } from "@/features/authorization/login";

interface AuthFormProps {
  initialTab: number;
}

export const AuthForm: React.FC<AuthFormProps> = ({ initialTab }) => {
  const [tabValue, setTabValue] = useState(initialTab);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 700,
        minWidth: { md: "550px", xs: "220px" },
        margin: "auto",
        padding: 2,
        borderRadius: 1,
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
        borderTop: "5px solid #f5ba1a",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ fontWeight: "bold", fontSize: "20px", marginBottom: "15px" }}
      >
        Личный кабинет
      </Typography>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{ style: { backgroundColor: "#f5ba1a" } }}
      >
        <Tab
          label="Вход"
          sx={{ color: "#000", "&.Mui-selected": { color: "#266d15" } }}
        />
        <Tab
          label="Регистрация"
          sx={{ color: "#000", "&.Mui-selected": { color: "#266d15" } }}
        />
      </Tabs>
      <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
        {tabValue === 0 && <LoginForm />}
        {tabValue === 1 && <RegistrationForm />}
      </Box>
    </Paper>
  );
};
