import { RegistrationForm } from "@/features/authorization/registration";
import { useLocation } from "react-router-dom";
import { AuthForm } from "@/widgets/AuthForm";

export const AuthorizationPage = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname.includes("register");
  return <AuthForm initialTab={isRegisterPage ? 1 : 0} />;
};
