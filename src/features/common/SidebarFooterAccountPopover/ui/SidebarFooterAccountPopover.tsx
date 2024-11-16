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

export interface Account {
  id: number;
  name: string;
  email: string;
  color: string;
}

export const accounts: Account[] = [
  {
    id: 1,
    name: "Bharat MUI",
    email: "bharat@mui.com",
    color: "#8B4513",
  },
];

export function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Аккаунты
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
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
                  bgcolor: account.color,
                }}
                src={""}
                alt={account.name ?? ""}
              >
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: "body2" }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <LogoutUserButton />
      </AccountPopoverFooter>
    </Stack>
  );
}
