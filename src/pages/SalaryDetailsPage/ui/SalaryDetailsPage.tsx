import { useGetSalaryQuery } from "@/entities/salary/api/salaryApi";
import { SalaryCard } from "@/entities/salary";
import { Container, Stack } from "@mui/material";
import { SkeletonItem } from "@/shared/ui/Skeleton";
import { GroupOfItem } from "@/widgets/GroupOfItem";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { CreateSalaryForm } from "@/features/salary/createSalary";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";
import { Filter } from "@/features/common/Filter";
import { FilterSalaryForm } from "@/features/salary/filterSalary";
import { useSearchParams } from "react-router-dom";
import { useForm } from "@/shared/lib/hooks/useForm";
import { useEffect, useState } from "react";
import { SortSalarySelect } from "@/features/salary/sortSalary";

export const SalaryDetailsPage = () => {
  const { data: salary = [], isLoading } = useGetSalaryQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { formState, handleChange } = useForm({
    type: searchParams.get("type") || "",
    salaryDate: searchParams.get("salaryDate") || "",
    salaryAmount: searchParams.get("salary") || "",
    employeeId: searchParams.get("employeeId") || "",
  });

  const [filteredSalary, setFilteredSalary] = useState(salary);

  const handleSearch = () => {
    setSearchParams({
      type: formState.type,
      salaryDate: formState.salaryDate,
      salaryAmount: formState.salaryAmount,
      employeeId: formState.employeeId,
    });

    const newFilteredSalary = salary.filter((salary) => {
      const filterSalaryDate = formState.salaryDate
        ? new Date(formState.salaryDate)
        : null;
      const salaryDate = new Date(salary.ДатаВыплаты);

      const salaryAmount =
        salary.Сумма !== undefined ? Number(salary.Сумма) : null;
      const filterSalaryAmount = formState.salaryAmount
        ? Number(formState.salaryAmount)
        : null;

      return (
        (formState.type
          ? salary.ТипВыплаты
              .toLowerCase()
              .includes(formState.type.toLowerCase())
          : true) &&
        (filterSalaryDate
          ? salaryDate.toDateString() === filterSalaryDate.toDateString()
          : true) &&
        (filterSalaryAmount !== null
          ? salaryAmount !== null && salaryAmount === filterSalaryAmount
          : true) &&
        (formState.employeeId
          ? salary.IdСотрудника?.toString() === formState.employeeId
          : true)
      );
    });

    setFilteredSalary(newFilteredSalary);
  };

  useEffect(() => {
    const type = searchParams.get("type") || "";
    const dateOfSalary = searchParams.get("salaryDate") || "";
    const salaryAmount = searchParams.get("salary") || "";
    const employeeId = searchParams.get("employeeId") || "";

    setFilteredSalary(
      salary.filter((salary) => {
        const salaryDate = new Date(salary.ДатаВыплаты);
        const filterSalaryDate = dateOfSalary ? new Date(dateOfSalary) : null;
        const filterSalaryAmount = salaryAmount ? Number(salaryAmount) : null;

        return (
          (type
            ? salary.ТипВыплаты.toLowerCase().includes(type.toLowerCase())
            : true) &&
          (filterSalaryDate
            ? salaryDate.toDateString() === filterSalaryDate.toDateString()
            : true) &&
          (filterSalaryAmount !== null
            ? salary.Сумма !== undefined && salary.Сумма === filterSalaryAmount
            : true) &&
          (employeeId ? salary.IdСотрудника?.toString() === employeeId : true)
        );
      })
    );
  }, [searchParams, salary]);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonItem key={index} />
        ))
      ) : (
        <>
          <Stack direction="row" gap={2} justifyContent="flex-end">
            <CreateAnEntity title="Добавить выплату">
              <CreateSalaryForm onSalaryAdded={handleOpenSnackbar} />
            </CreateAnEntity>
            <Filter
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              handleSearch={handleSearch}
              onOpen={() => setIsDialogOpen(true)}
            >
              <FilterSalaryForm
                formState={formState}
                handleChange={handleChange}
              />
            </Filter>
            <SortSalarySelect
              filteredSalaries={filteredSalary}
              setFilteredSalaries={setFilteredSalary}
            />
          </Stack>
          <GroupOfItem
            direction="column"
            items={filteredSalary}
            renderItem={(salary) => <SalaryCard salary={salary} />}
            getKey={(salary) => salary.НомерЗаписи}
            width="60%"
          />
          <NotificationSnackbar
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            severity="success"
            message="Выплата успешно добавлена!"
          />
        </>
      )}
    </Container>
  );
};
