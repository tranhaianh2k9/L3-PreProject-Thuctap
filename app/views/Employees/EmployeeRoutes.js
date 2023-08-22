import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const Employee = EgretLoadable({
  loader: () => import("./Employee"),
});
const ViewComponent = withTranslation()(Employee);

const EmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employees_add/employees",
    exact: true,
    component: ViewComponent,
  },
];

export default EmployeeRoutes;
