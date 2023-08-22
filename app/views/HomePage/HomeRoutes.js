import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const HomePage = EgretLoadable({
  loader: () => import("./HomePage"),
});

const ViewComponent = withTranslation()(HomePage);
const HomePageRoutes = [
  {
    path: ConstantList.ROOT_PATH + "home",
    exact: true,
    component: ViewComponent,
  },
];
export default HomePageRoutes;
