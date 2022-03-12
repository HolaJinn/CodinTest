import { RootStateOrAny, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import EmailVerification from "../components/EmailVerification";
import CandidateAuth from "../screens/CandidateAuth";
import DashboardScreen from "../screens/DashboardScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OwnerSignup from "../screens/OwnerSignup";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isLoggedIn);
  return useRoutes([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/candidate/signup",
      element: <CandidateAuth path={"signup"} />,
    },
    {
      path: "/candidate/login",
      element: <CandidateAuth path={"login"} />,
    },
    {
      path: "/owner/signup",
      element: <OwnerSignup />,
    },
    {
      path: "/auth/verify",
      element: <EmailVerification />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordScreen />,
    },
    {
      path: "/reset-password",
      element: <ResetPasswordScreen />,
    },
    {
      element: <PrivateRoute isAuth={isAuth} />,
      children: [
        {
          path: "/candidate/dashboard",
          element: <DashboardScreen />,
        },
        {
          path: "/profile",
          element: <HomeScreen />,
        },
      ],
    },
  ]);
};

export default AppRoutes;
