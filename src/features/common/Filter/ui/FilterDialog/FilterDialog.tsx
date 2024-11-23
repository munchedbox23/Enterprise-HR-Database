import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  handleSearch: () => void;
}

export const FilterDialog: React.FC<PropsWithChildren<FilterDialogProps>> = ({
  isOpen,
  onClose,
  handleSearch,
  children,
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle sx={{ marginBottom: "10px" }}>Фильтры</DialogTitle>
    <DialogContent sx={{ paddingTop: "10px !important" }}>
      {children}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSearch} color="primary">
        Применить
      </Button>
      <Button onClick={onClose} color="secondary">
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
);
