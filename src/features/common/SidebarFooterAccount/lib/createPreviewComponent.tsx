import { AccountPreviewProps } from "@toolpad/core/Account";
import { AccountSidebarPreview } from "@/features/common/AccountSidebarPreview";

export const createPreviewComponent = (mini: boolean) => {
  const PreviewComponent: React.FC<AccountPreviewProps> = (props) => {
    return <AccountSidebarPreview {...props} mini={mini} />;
  };
  return PreviewComponent;
};
