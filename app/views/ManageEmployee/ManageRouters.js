import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const ManageEmployee = EgretLoadable({
  loader: () => import("./ManageEmployee"),
});

const ViewComponent = withTranslation()(ManageEmployee);
const ManageEmployeeRouters = [
  {
    path: ConstantList.ROOT_PATH + "employees_manage/employees",
    exact: true,
    component: ViewComponent,
  },
];
export default ManageEmployeeRouters;
