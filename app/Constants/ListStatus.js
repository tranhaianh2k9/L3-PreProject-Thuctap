export const STATUSES = [
  { id: 1, name: "Lưu mới" },
  { id: 2, name: "Chờ duyệt" },
  { id: 3, name: "Đã duyệt" },
  { id: 4, name: "Yêu cầu bổ sung" },
  { id: 5, name: "Đã từ chối" },
  { id: 6, name: "Chờ duyệt kết thúc" },
  { id: 7, name: "Đã kết thúc" },
  { id: 8, name: "Yêu cầu bổ sung kết thúc" },
  { id: 9, name: "Từ chối kết thúc" },
  { id: 0, name: "Đã nộp lưu" },
];

export const STATUS_EMPLOYEE = {
  LUU_MOI: {
    CODE: 1,
    NAME: "Lưu mới",
  },
  CHO_DUYET: {
    CODE: 2,
    NAME: "Chờ duyệt",
  },
  DA_DUYET: {
    CODE: 3,
    NAME: "Đã duyệt",
  },
  YEU_CAU_BO_SUNG: {
    CODE: 4,
    NAME: "Yêu cầu bổ sung",
  },
  DA_TU_CHOI: {
    CODE: 5,
    NAME: "Đã từ chối",
  },
  CHO_DUYET_KET_THUC: {
    CODE: 6,
    NAME: "Chờ duyệt kết thúc",
  },
  DA_KET_THUC: {
    CODE: 7,
    NAME: "Đã kết thúc",
  },
  YEU_CAU_BO_SUNG_KET_THUC: {
    CODE: 8,
    NAME: "Yêu cầu bổ sung kết thúc",
  },
  TU_CHOI_KET_THUC: {
    CODE: 9,
    NAME: "Từ chối kết thúc",
  },
  DA_NOP_LUU: {
    CODE: 0,
    NAME: "Đã nộp lưu",
  },
};

export const STATUS_OF_EMPLOYEE = [
  STATUS_EMPLOYEE.CHO_DUYET.CODE,
  STATUS_EMPLOYEE.LUU_MOI.CODE,
  STATUS_EMPLOYEE.DA_TU_CHOI.CODE,
  STATUS_EMPLOYEE.YEU_CAU_BO_SUNG.CODE,
];


export const STATUS_OF_PENDING = [
  STATUS_EMPLOYEE.CHO_DUYET.CODE,
  STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE,
];

export const STATUS_OF_END_EMPLOYEE = [
  STATUS_EMPLOYEE.DA_NOP_LUU.CODE,
  STATUS_EMPLOYEE.DA_KET_THUC.CODE,
];

export const STATUS_OF_MANAGE_EMPLOYEE = [
  STATUS_EMPLOYEE.DA_DUYET.CODE,
  STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE,
  STATUS_EMPLOYEE.YEU_CAU_BO_SUNG_KET_THUC.CODE,
  STATUS_EMPLOYEE.TU_CHOI_KET_THUC.CODE,
];



export const statusesForEdit = [
  STATUS_EMPLOYEE.LUU_MOI.CODE,
  STATUS_EMPLOYEE.DA_TU_CHOI.CODE,
  STATUS_EMPLOYEE.YEU_CAU_BO_SUNG.CODE,
];
export const statusesForView = [
  STATUS_EMPLOYEE.CHO_DUYET.CODE,
  STATUS_EMPLOYEE.DA_DUYET.CODE,
];
