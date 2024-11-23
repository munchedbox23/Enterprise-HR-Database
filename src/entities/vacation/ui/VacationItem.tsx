import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { Vacation } from "../model/types";
import { calculateDaysBetween } from "../model/calculateDaysBetween";

export const VacationItem: React.FC<{ vacation: Vacation }> = ({
  vacation,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: 2,
        padding: 2,
        borderRadius: 2,
        minWidth: "300px",
        width: "400px",
        maxWidth: "500px",
        boxShadow: "0px 0px 10px 5px rgba(34, 60, 80, 0.2)",
        transform: "skew(-10deg)",
        borderColor: "rgba(255, 255, 255, 0.5)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "white",
          }}
          variant="h6"
          component="div"
          gutterBottom
        >
          <span style={{ color: "green" }}>Отпуск №{vacation.НомерЗаписи}</span>{" "}
        </Typography>
        <Divider />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          Дата начала: {vacation.ДатаНачала}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Дата окончания: {vacation.ДатаОкончания}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Количество дней:{" "}
          {calculateDaysBetween(vacation.ДатаНачала, vacation.ДатаОкончания)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Табельный номер: {vacation.IdСотрудника}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Тип отпуска: {vacation.Тип}
        </Typography>
      </CardContent>
    </Card>
  );
};
