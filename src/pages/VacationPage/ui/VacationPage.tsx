import { useGetVacationsQuery } from "@/entities/vacation/api/vacationApi";
import { Container, Stack } from "@mui/material";
import { SkeletonItem } from "@/shared/ui/Skeleton";
import { GroupOfItem } from "@/widgets/GroupOfItem";
import { VacationItem } from "@/entities/vacation";
import { CreateVacationForm } from "@/features/vacation/createVacataion";
import { CreateAnEntity } from "@/features/common/CreateAnEntity";
import { useSnackbar } from "@/shared/lib/hooks/useSnackbar";
import { NotificationSnackbar } from "@/shared/ui/NotificationSnackbar.tsx";
import { VacationFilterForm } from "@/features/vacation/filterVacation";
import { Filter } from "@/features/common/Filter";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "@/shared/lib/hooks/useForm";
import { SortVacationSelect } from "@/features/vacation/sortVacation";

export const VacationPage = () => {
  const { data: vacations = [], isLoading } = useGetVacationsQuery();
  const { openSnackbar, handleCloseSnackbar, handleOpenSnackbar } =
    useSnackbar();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const { formState, handleChange } = useForm({
    type: searchParams.get("type") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    employeeId: searchParams.get("employeeId") || "",
  });

  const [filteredVacations, setFilteredVacations] = useState(vacations);

  

  const handleSearch = () => {
    setSearchParams({
      type: formState.type,
      startDate: formState.startDate,
      endDate: formState.endDate,
      employeeId: formState.employeeId,
    });

    const newFilteredVacations = vacations.filter((vacation) => {
      const vacationStartDate = new Date(vacation.ДатаНачала);
      const vacationEndDate = new Date(vacation.ДатаОкончания);
      const filterStartDate = formState.startDate
        ? new Date(formState.startDate)
        : null;
      const filterEndDate = formState.endDate
        ? new Date(formState.endDate)
        : null;

      return (
        (formState.type
          ? vacation.Тип.toLowerCase().includes(formState.type.toLowerCase())
          : true) &&
        (filterStartDate ? vacationStartDate >= filterStartDate : true) &&
        (filterEndDate ? vacationEndDate <= filterEndDate : true) &&
        (formState.employeeId
          ? vacation.IdСотрудника?.toString() === formState.employeeId
          : true)
      );
    });

    setFilteredVacations(newFilteredVacations);
  };

  useEffect(() => {
    const type = searchParams.get("type") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const employeeId = searchParams.get("employeeId") || "";

    setFilteredVacations(
      vacations.filter((vacation) => {
        const vacationStartDate = new Date(vacation.ДатаНачала);
        const vacationEndDate = new Date(vacation.ДатаОкончания);
        const filterStartDate = startDate ? new Date(startDate) : null;
        const filterEndDate = endDate ? new Date(endDate) : null;

        return (
          (type
            ? vacation.Тип.toLowerCase().includes(type.toLowerCase())
            : true) &&
          (filterStartDate ? vacationStartDate >= filterStartDate : true) &&
          (filterEndDate ? vacationEndDate <= filterEndDate : true) &&
          (employeeId ? vacation.IdСотрудника?.toString() === employeeId : true)
        );
      })
    );
  }, [searchParams, vacations]);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonItem key={index} />
        ))
      ) : (
        <>
          <Stack
            direction="row"
            gap={2}
            justifyContent="flex-end"
            sx={{ marginBottom: 2 }}
          >
            <CreateAnEntity title="Создать отпуск">
              <CreateVacationForm onSuccess={handleOpenSnackbar} />
            </CreateAnEntity>
            <Filter
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              handleSearch={handleSearch}
              onOpen={() => setIsDialogOpen(true)}
            >
              <VacationFilterForm
                formState={formState}
                handleChange={handleChange}
              />
            </Filter>
            <SortVacationSelect
              filteredVacations={filteredVacations}
              setFilteredVacations={setFilteredVacations}
            />
          </Stack>

          <GroupOfItem
            items={filteredVacations}
            renderItem={(vacation) => <VacationItem vacation={vacation} />}
            getKey={(vacation) => vacation.НомерЗаписи}
          />
          <NotificationSnackbar
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            message="Отпуск успешно создан"
            severity="success"
          />
        </>
      )}
    </Container>
  );
};
