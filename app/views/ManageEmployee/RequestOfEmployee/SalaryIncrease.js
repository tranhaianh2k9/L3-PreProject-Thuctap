import React, { useState, useEffect, useRef } from "react";
import { Grid, IconButton, Icon } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../Component/Dialog/ConfirmDialog";
import { getAllLeadersRequest } from "../../../redux/actions/LeaderAction";
import moment from "moment";
import {
  STATUSES,
  STATUS_EMPLOYEE,
  statusesForView,
  statusesForEdit,
} from "../../../Constants/ListStatus";
import {
  getListSalaryIncreaseByEmployeeIdRequest,
  createSalaryIncreaseRequest,
  deleteSalaryIncreaseRequest,
  updateSalaryIncreaseRequest,
} from "app/redux/actions/SalaryIncreaseAction";
import {
  formatCurrency,
  getNameById,
  removeMultipleSpaces,
} from "utils/handleGeneral";
import GeneralOfRequestForm from "app/views/FormGeneralOfRequest/GeneralOfRequestForm";
import {
  EDIT_SALARY_INCREASE,
  VIEW_SALARY_INCREASE,
} from "../../../Constants/ListNameTab";
import MaterialTableComponent from "app/views/Component/MaterialTableComponent/MaterialTableComponent";
import ButtonSaveNCancel from "app/views/Component/Button/ButtonSaveNCancel";

const SalaryIncrease = ({ employee }) => {
  const formRef = useRef(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [idSalaryIncrease, setIdSalaryIncrease] = useState();
  const [dataSalaryIncrease, setDataSalaryIncrease] = useState({});
  const [titleOfForm, setTitleOfForm] = useState("Thêm mới đơn");
  const [statusOfForm, setStatusOfForm] = useState("");

  const [openGeneralOfRequestForm, setOpenGeneralOfRequestForm] =
    useState(false);
  const [salaryIncreaseDetail, setSalaryIncreaseDetail] = useState({});

  const listSalaryIncrease = useSelector(
    (state) => state?.salary?.listSalaryIncrease
  );
 

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllLeadersRequest());
    dispatch(getListSalaryIncreaseByEmployeeIdRequest(employee?.id));
  
  }, [employee?.id]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isGreater", (value) => {
      if (!value) return true;
      return value > dataSalaryIncrease.oldSalary;
    });
    return () => {
      ValidatorForm.removeValidationRule("isGreater");
    };
  }, [dataSalaryIncrease.oldSalary, dataSalaryIncrease.newSalary]);

 
 
  const title = "Chắc chắn xóa";

  const handleChange = (e) => {
    setDataSalaryIncrease({
      ...dataSalaryIncrease,
      [e.target.name]: removeMultipleSpaces(e.target.value),
    });
  };

  const handleSubmit = () => {
    if (dataSalaryIncrease?.id) {
      const dataTemp = {
        ...dataSalaryIncrease,
      };
      dispatch(updateSalaryIncreaseRequest(dataTemp, employee?.id));
      handleReset();
    } else {
      dispatch(createSalaryIncreaseRequest([dataSalaryIncrease], employee?.id));
      handleReset();
    }
  };

  const handleReset = () => {
    setDataSalaryIncrease({});
    setTitleOfForm("Thêm mới đơn");
    formRef.current.resetValidations();
  };

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      width: "5%",
      render: (data) => {
        return (
          <Grid className="none_wrap ">
            <IconButton
              onClick={() => {
                handleOpenFormDetail(data);
              }}
            >
              <Icon color="danger">visibility</Icon>
            </IconButton>
            {Number(employee?.submitProfileStatus) ===
            STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE ? null : (
              <>
                {!statusesForView.includes(Number(data?.salaryIncreaseStatus)) && (
                  <IconButton
                    onClick={() => {
                      handleEditRequest(data);
                    }}
                  >
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                )}
                {Number(data?.salaryIncreaseStatus) === STATUS_EMPLOYEE.LUU_MOI.CODE && (
                  <IconButton
                    onClick={() => {
                      handleDeleteRequest(data);
                    }}
                  >
                    <Icon color="error">delete</Icon>
                  </IconButton>
                )}
              </>
            )}
          </Grid>
        );
      },
    },
    {
      title: "Lương cũ",
      field: "oldSalary",
      align: "left",
      width: "5%",
      render: (data) => <span> {formatCurrency(data?.oldSalary)} </span>,
    },
    {
      title: "Lương mới",
      field: "newSalary",
      align: "left",
      width: "5%",
      render: (data) => <span> {formatCurrency(data?.newSalary)} </span>,
    },
    {
      title: "Lý do",
      field: "reason",
      align: "left",
      width: "20%",
      render: (data) => <span className="address-column">{data?.reason}</span>,
    },
    {
      title: "Ngày tăng lương",
      field: "startDate",
      align: "center",
      width: "2%",
      render: (data) => moment(data?.startDate).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      field: "salaryIncreaseStatus",
      align: "left",
      width: "10%",
      render: (data) => {
        return getNameById(Number(data?.salaryIncreaseStatus), STATUSES);
      },
    },
  ];
  const handleOpenFormDetail = (data) => {
     setOpenGeneralOfRequestForm(true);
    if (statusesForView.includes(Number(data?.salaryIncreaseStatus))) {
      setStatusOfForm(VIEW_SALARY_INCREASE);
    } else if (statusesForEdit.includes(Number(data?.salaryIncreaseStatus))) {
      setStatusOfForm(EDIT_SALARY_INCREASE);
    }
    setSalaryIncreaseDetail(data);
  };

  const closeFormDetail = () => {
    setOpenGeneralOfRequestForm(false);
  };

  const closeConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleEditRequest = (data) => {
    setTitleOfForm("Sửa đơn");
    setDataSalaryIncrease(data);
  };

  const handleDeleteRequest = (data) => {
    setIdSalaryIncrease(data?.id);
    setOpenConfirmDialog(true);
  };
  const deleteSalaryIncreaseById = () => {
    dispatch(deleteSalaryIncreaseRequest(idSalaryIncrease, employee?.id));
    closeConfirmDialog();
    handleReset();
  };

  return (
    <div>
      {Number(employee?.submitProfileStatus) !== STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE && (
        <ValidatorForm
          className="mb-20 pt-12 width-child "
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Grid className=" mb-16 ml-8 styleColor">{titleOfForm} </Grid>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                name="startDate"
                type="date"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Ngày tăng lương
                  </span>
                }
                value={
                  dataSalaryIncrease?.startDate
                    ? moment(dataSalaryIncrease?.startDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={handleChange}
                fullWidth
                validators={["required", "isAfterOrEqualToToday"]}
                errorMessages={[
                  "Ngày tăng lương không được bỏ trống",
                  "Ngày tăng lương phải sau hoặc bằng ngày hôm nay",
                ]}
                placeholder="Chọn ngày tăng lương"
                size="small"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={Boolean(
                  dataSalaryIncrease?.salaryIncreaseStatus ===
                  STATUS_EMPLOYEE.CHO_DUYET.CODE
                )}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                type="number"
                name="oldSalary"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Lương cũ
                  </span>
                }
                value={dataSalaryIncrease?.oldSalary || ""}
                onChange={handleChange}
                fullWidth
                validators={["required", "maxNumber:999999999"]}
                errorMessages={[
                  "Vui lòng nhập Lương cũ",
                  "Lương không được quá 9 ký tự",
                ]}
                placeholder="Nhập Lương cũ"
                size="small"
                variant="outlined"
                disabled={Boolean(
                  dataSalaryIncrease?.salaryIncreaseStatus ===
                  STATUS_EMPLOYEE.CHO_DUYET.CODE
                )}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                type="number"
                name="newSalary"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Lương mới
                  </span>
                }
                value={dataSalaryIncrease?.newSalary || ""}
                onChange={handleChange}
                fullWidth
                validators={["maxNumber:999999999", "required", "isGreater"]}
                errorMessages={[
                  "Lương không được quá 9 ký tự",
                  "Vui lòng nhập Lương mới",
                  "lương mới phải lớn hơn lương cũ",
                ]}
                placeholder="Nhập Lương mới"
                size="small"
                variant="outlined"
                disabled={Boolean(
                  dataSalaryIncrease?.salaryIncreaseStatus ===
                  STATUS_EMPLOYEE.CHO_DUYET.CODE
                )}
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <TextValidator
                name="reason"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Lý do tăng lương
                  </span>
                }
                value={dataSalaryIncrease?.reason || ""}
                onChange={handleChange}
                fullWidth
                validators={["required", "maxStringLength:500"]}
                errorMessages={[
                  "Vui lòng nhập lý do ",
                  "Nhập tối đa 500 ký tự",
                ]}
                placeholder="Nhập lý do tăng lương"
                size="small"
                multiline
                variant="outlined"
                disabled={Boolean(
                  dataSalaryIncrease?.salaryIncreaseStatus ===
                  STATUS_EMPLOYEE.CHO_DUYET.CODE
                )}
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <TextValidator
                name="note"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Ghi chú
                  </span>
                }
                value={dataSalaryIncrease?.note || ""}
                onChange={handleChange}
                fullWidth
                multiline
                validators={["required", "maxStringLength:500"]}
                errorMessages={[
                  "Vui lòng nhập Ghi chú",
                  "Nhập tối đa 500 ký tự",
                ]}
                placeholder="Nhập Ghi chú"
                size="small"
                variant="outlined"
                disabled={Boolean(
                  dataSalaryIncrease?.salaryIncreaseStatus ===
                  STATUS_EMPLOYEE.CHO_DUYET.CODE
                )}
              />
            </Grid>
            <ButtonSaveNCancel handleReset={handleReset} />
          </Grid>
        </ValidatorForm>
      )}
      <div>
        <div className="mb-sm-30">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <MaterialTableComponent
                columns={columns}
                data={listSalaryIncrease}
                paging={true}
                pageSize={5}
              ></MaterialTableComponent>
            </Grid>
          </Grid>
          {openConfirmDialog && (
            <ConfirmDialog
              open={openConfirmDialog}
              onClose={closeConfirmDialog}
              handleDialogConfirm={deleteSalaryIncreaseById}
              title={title}
            />
          )}
          {openGeneralOfRequestForm && (
            <GeneralOfRequestForm
              statusOfForm={statusOfForm}
              open={openGeneralOfRequestForm}
              onClose={closeFormDetail}
              requestOfEmployeeData={salaryIncreaseDetail}
              employeeData={employee}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryIncrease;
