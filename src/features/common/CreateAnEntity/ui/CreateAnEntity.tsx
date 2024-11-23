import { Button } from "@mui/material";
import { ModalWithOverlay } from "@/shared/ui/Modal";
import { FC, PropsWithChildren } from "react";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";

export const CreateAnEntity: FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ title, children }) => {
  const { isOpen, openModal, closeModal } = useModalContext();
  return (
    <>
      <Button
        sx={{ my: 0.3, maxWidth: "250px", borderColor: "#f5ba1a", color: "#f5ba1a" }}
        color="primary"
        variant="outlined"
        onClick={openModal}
      >
        {title}
      </Button>
      <ModalWithOverlay title={title} onClose={closeModal} open={isOpen}>
        {children}
      </ModalWithOverlay>
    </>
  );
};
