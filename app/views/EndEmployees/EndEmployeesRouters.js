import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const ManageEmployee = EgretLoadable({
  loader: () => import("./EndEmployees.jsx"),
});

const ViewComponent = withTranslation()(ManageEmployee);
const EndEmployeesRouters = [
  {
    path: ConstantList.ROOT_PATH + "end_employees/employees",
    exact: true,
    component: ViewComponent,
  },
];
export default EndEmployeesRouters;
