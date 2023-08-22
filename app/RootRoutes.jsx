import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./views/HomePage/HomeRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import ConstantList from "./appConfig";
import pendingRoutes from "./views/Pending/PendingRoutes";
import EmployeeRoutes from "./views/Employees/EmployeeRoutes";
import ManageEmployeeRouters from "./views/ManageEmployee/ManageRouters";
import EndEmployeesRouters from "./views/EndEmployees/EndEmployeesRouters";
import ConfirmRoutes from "./views/LeaderConfirm/ConfirmRoutes";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.ROOT_PATH + "home"} /> //Luôn trỏ về HomePage được khai báo trong appConfig
  }
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />
  }
];

const routes = [
  ...homeRoutes,
  ...sessionRoutes,
  ...redirectRoute,
  ...pendingRoutes,
  ...EmployeeRoutes,
  ...ManageEmployeeRouters,
  ...EndEmployeesRouters,
  ...ConfirmRoutes,
  ...errorRoute,

];

export default routes;
