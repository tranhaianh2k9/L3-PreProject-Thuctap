import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";


const Pending = EgretLoadable({
  loader: () => import("./LeaderConfirm.jsx"),
});

const ViewComponent = withTranslation()(Pending);
const ConfirmRoutes = [
  {
    path: ConstantList.ROOT_PATH + "leader_confirm",
    exact: true,
    component: ViewComponent,
  },
];
export default ConfirmRoutes;
