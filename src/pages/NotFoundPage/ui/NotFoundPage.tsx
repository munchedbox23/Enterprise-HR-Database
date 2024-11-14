import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { appRoutes } from "@/shared/const/routes";

export const NotFoundPage: FC = () => {
  return (
    <Box
      sx={{
        display: "grid",
        minHeight: "100vh",
        placeItems: "center",
        backgroundColor: "white",
        padding: "6rem 1.5rem",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "8rem",
            fontWeight: 600,
            color: "#4f46e5",
          }}
        >
          404
        </Typography>
        <Typography
          sx={{
            marginTop: "1rem",
            fontSize: "3rem",
            fontWeight: "bold",
            letterSpacing: "-0.05em",
            color: "#1f2937",
          }}
        >
          Страница не найдена
        </Typography>
        <Typography
          sx={{
            marginTop: "1.5rem",
            fontSize: "2rem",
            lineHeight: 1.5,
            color: "#4b5563",
          }}
        >
          Извините, мы не смогли найти страницу, которую вы ищете.
        </Typography>
        <Box
          sx={{
            marginTop: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <Button
            component={Link}
            to={appRoutes.home()}
            sx={{
              borderRadius: "0.375rem",
              backgroundColor: "#4f46e5",
              padding: "0.625rem 0.875rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "white",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#4338ca",
              },
            }}
          >
            Вернуться на главную
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
