import React, { useState, PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  Stack,
} from "@mui/material";
import { SalaryRecord } from "../model/types";
import { useGetEmployeesQuery } from "@/entities/employee";
import { SkeletonItem } from "@/shared/ui/Skeleton";

export const SalaryCard: React.FC<
  PropsWithChildren<{ salary: SalaryRecord }>
> = ({ salary, children }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { data: employees = [], isLoading } = useGetEmployeesQuery();

  const employee = employees.find(
    (emp) => emp.IdСотрудника === salary.IdСотрудника
  );

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return isLoading ? (
    <SkeletonItem />
  ) : (
    <Card variant="outlined" sx={{ width: "100%", marginBottom: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h6">{`ФИО Сотрудника: ${employee?.ФИО}`}</Typography>
          <Typography variant="body1">{`Дата Выплаты: ${salary.ДатаВыплаты}`}</Typography>
          <Typography variant="body1">{`Тип Выплаты: ${salary.ТипВыплаты}`}</Typography>
        </div>
        <Stack direction="column" spacing={2}>
          <Button
            onClick={handleToggleDetails}
            variant="contained"
            color="primary"
            sx={{
              marginLeft: 2,
              color: "#fff",
              backgroundColor: "#f5ba1a",
            }}
          >
            {showDetails ? "Скрыть детали" : "Показать подробную детализацию"}
          </Button>
          {children}
        </Stack>
      </CardContent>
      <Collapse in={showDetails}>
        <CardContent>
          <Typography variant="body2">{`Зарботная плата до вычета налогов: ${salary.Сумма}`}</Typography>
          <Typography variant="body2">{`Зарботная плата после вычета налогов: ${Number(salary.Сумма) * 0.87}`}</Typography>
          <Typography
            variant="body2"
            sx={{ color: "red", fontFamily: "cursive" }}
          >
            {`Премия с учетом выполнения КПЭ: ${Number(salary.Сумма) * 0.1}`}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1, fontWeight: "bold" }}>
            {`Итоговая сумма: ${Number(salary.Сумма) * 0.87 + Number(salary.Сумма) * 0.1}`}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
