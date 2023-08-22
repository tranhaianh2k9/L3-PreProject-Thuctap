import React, { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { EgretVerticalNav } from "egret";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";
import LocalStorageService from "../../services/LocalStorageService";
const ViewEgretVerticalNav = withTranslation()(EgretVerticalNav);
function Sidenav(props) {
  const user = useSelector((state) => state.user);
  const role = user?.roles?.[0].id !== 4;
  console.log(role);
  const updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = props;
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    setLayoutSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  const renderOverlay = () => (
    <div
      onClick={() => updateSidebarMode({ mode: "close" })}
      className="sidenav__overlay"
    />
  );
  const getNavigation = () => {
    let navigation = LocalStorageService.getLocalStorageItem("navigations");
    if (navigation && navigation.length > 0) {
      return navigation;
    } else {
      return [
        {
          name: "Dashboard.dashboard",
          icon: "engineering",
          path: ConstantList.ROOT_PATH + "home",
          isVisible: true,
        },

        !role && {
          name: "Dashboard.manage",
          isVisible: true,
          icon: "engineering",
          children: [
            {
              name: "Thêm mới nhân viên",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "employees_add/employees",
              icon: "keyboard_arrow_right",
            },
            {
              name: "Quản lý nhân viên",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "employees_manage/employees",
              icon: "keyboard_arrow_right",
            },
            {
              name: "Kết thúc",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "end_employees/employees",
              icon: "keyboard_arrow_right",
            },
          ],
        },

        role && {
          name: "Dashboard.leader",
          isVisible: true,
          icon: "engineering",
          children: [
            {
              name: "Leader.pending",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "leader_pending",
              icon: "keyboard_arrow_right",
            },
            {
              name: "Leader.confirm",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "leader_confirm",
              icon: "keyboard_arrow_right",
            },
          ],
        },
      ];
    }
  };

  return (
    <Fragment>
      <Scrollbar
        option={{ suppressScrollX: true }}
        className="scrollable position-relative"
      >
        {props.children}
        <ViewEgretVerticalNav navigation={getNavigation()} />
      </Scrollbar>
      {renderOverlay()}
    </Fragment>
  );
}
Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
});
export default withRouter(
  connect(mapStateToProps, {
    setLayoutSettings,
  })(Sidenav)
);
