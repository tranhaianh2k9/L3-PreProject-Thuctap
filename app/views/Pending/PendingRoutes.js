import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";


const Pending = EgretLoadable({
  loader: () => import("./LeaderPending"),
});

const ViewComponent = withTranslation()(Pending);
const pendingRoutes = [
  {
    path: ConstantList.ROOT_PATH + "leader_pending",
    exact: true,
    component: ViewComponent,
  },
];
export default pendingRoutes;
