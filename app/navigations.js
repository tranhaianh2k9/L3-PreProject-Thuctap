import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "engineering",
    path: ConstantList.ROOT_PATH + "home",
    isVisible: true,
  },
  {
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
  {
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
