import { Button } from "@mui/material";
import { FilterDialog } from "../FilterDialog/FilterDialog";
import { FilterDialogProps } from "@/features/common/Filter/model/types";
import { PropsWithChildren } from "react";

export const Filter = ({
  isOpen,
  onOpen,
  onClose,
  children,
  handleSearch,
}: PropsWithChildren<FilterDialogProps>) => {
  return (
    <>
      <Button
        onClick={onOpen}
        variant="outlined"  
        sx={{
          my: 0.3,
          maxWidth: "250px",
          borderColor: "green",
          color: "green",
        }}
      >
        Фильтр
      </Button>
      <FilterDialog
        isOpen={isOpen}
        onClose={onClose}
        handleSearch={handleSearch}
      >
        {children}
      </FilterDialog>
    </>
  );
};
