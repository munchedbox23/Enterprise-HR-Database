import { Stack, Divider } from "@mui/material";
import { AccountPreview, AccountPreviewProps } from "@toolpad/core/Account";

export const AccountSidebarPreview = (
  props: AccountPreviewProps & { mini: boolean }
) => {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0} overflow="hidden">
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
};
