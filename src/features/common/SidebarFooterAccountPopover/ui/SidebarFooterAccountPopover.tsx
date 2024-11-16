import {
  Stack,
  Typography,
  MenuList,
  MenuItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { AccountPopoverFooter } from "@toolpad/core/Account";
import { LogoutUserButton } from "@/features/authorization/logout/ui/LogoutUserButton";
import { useAppSelector } from "@/app/providers/StoreProvider";

export function SidebarFooterAccountPopover() {
  const user = useAppSelector((store) => store.user.user);

  return (
    user && (
      <Stack direction="column">
        <Typography variant="body2" mx={2} mt={1}>
          Аккаунты
        </Typography>
        <MenuList>
          <MenuItem
            key={user?.name}
            component="button"
            sx={{
              justifyContent: "flex-start",
              width: "100%",
              columnGap: 2,
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "0.95rem",
                  bgcolor: "#8B4513",
                }}
                src={""}
                alt={user?.name ?? ""}
              >
                {user?.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
              primary={user?.name}
              secondary={user?.email}
              primaryTypographyProps={{ variant: "body2" }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </MenuItem>
        </MenuList>
        <Divider />
        <AccountPopoverFooter>
          <LogoutUserButton />
        </AccountPopoverFooter>
      </Stack>
    )
  );
}
