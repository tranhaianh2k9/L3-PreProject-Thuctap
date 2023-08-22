import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  FormControl,
  MenuItem,
  IconButton,
  Icon,
} from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../Component/Dialog/ConfirmDialog";
import { getAllLeadersRequest } from "../../../redux/actions/LeaderAction";
import moment from "moment";
import { LIST_POSITION } from "../../../Constants/ListSelectItem";
import {
  getListProcessByEmployeeIdRequest,
  createProcessRequest,
  deleteProcessRequest,
  updateProcessRequest,
} from "app/redux/actions/ProcessAction";
import { getNameById, removeMultipleSpaces } from "utils/handleGeneral";
import GeneralOfRequestForm from "app/views/FormGeneralOfRequest/GeneralOfRequestForm";
import { EDIT_PROCESS, VIEW_PROCESS } from "../../../Constants/ListNameTab";
import {
  STATUS_EMPLOYEE,
  statusesForView,
  statusesForEdit,
  STATUSES
} from "../../../Constants/ListStatus";
import MaterialTableComponent from "app/views/Component/MaterialTableComponent/MaterialTableComponent";
import ButtonSaveNCancel from "app/views/Component/Button/ButtonSaveNCancel";

const Process = ({ employee }) => {
  const formRef = useRef(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [idProcess, setIdProcess] = useState();
  const [dataProcess, setDataProcess] = useState({});
  const [titleOfForm, setTitleOfForm] = useState("Thêm mới đơn");
  const listProcess = useSelector((state) => state?.process?.listProcess);
  const [openGeneralOfRequestForm, setOpenGeneralOfRequestForm] =
    useState(false);
  const [processDetail, setProcessDetail] = useState({});
  const [statusOfForm, setStatusOfForm] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeadersRequest());
    dispatch(getListProcessByEmployeeIdRequest(employee?.id));
  }, [employee?.id]);

  const title = "Chắc chắn xóa";

  const handleChange = (e) => {
    if (e.target.name === "newPosition") {
      setDataProcess({
        ...dataProcess,
        [e.target.name]: e.target.value,
      });
    } else
      setDataProcess({
        ...dataProcess,
        [e.target.name]: removeMultipleSpaces(e.target.value),
      });
  };

  const handleSubmit = () => {
    if (dataProcess?.id) {
      const dataTemp = {
        ...dataProcess,
      };
      dispatch(updateProcessRequest(dataTemp, employee?.id));
      handleReset();
    } else {
      dispatch(createProcessRequest([dataProcess], employee?.id));
      handleReset();
    }
  };

  const handleReset = () => {
    setDataProcess({});
    setTitleOfForm("Thêm mới đơn");
    formRef.current.resetValidations();
  };

  const closeFormDetail = () => {
    setOpenGeneralOfRequestForm(false);
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
              {!statusesForView.includes(Number(data?.processStatus)) && (
                  <IconButton
                    onClick={() => {
                      handleEditRequest(data);
                    }}
                  >
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                )}
                {Number(data?.processStatus) === STATUS_EMPLOYEE.LUU_MOI.CODE && (
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
      title: "Vị trí mới",
      field: "newPosition",
      align: "center",
      width: "5%",
      render: (data) => {
        return getNameById(Number(data?.newPosition), LIST_POSITION);
      },
    },
    {
      title: "Ghi chú",
      field: "note",
      align: "left",
      width: "5%",
      render: (data) => <span className="address-column">{data?.note}</span>,
    },
    {
      title: "Ngày thăng chức",
      field: "promotionDay",
      align: "center",
      width: "5%",
      render: (data) => moment(data?.promotionDay).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      field: "processStatus",
      align: "left",
      width: "5%",
      render: (data) => {
        return getNameById(Number(data?.processStatus), STATUSES);
      },
    },
  ];

  const handleOpenFormDetail = (data) => {
    setOpenGeneralOfRequestForm(true);
    if (statusesForView.includes(Number(data?.processStatus))) {
      setStatusOfForm(VIEW_PROCESS);
    } else if (statusesForEdit.includes(Number(data?.processStatus))) {
      setStatusOfForm(EDIT_PROCESS);
    }
    setProcessDetail(data);
  };

  const closeConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleEditRequest = (data) => {
    setTitleOfForm("Sửa đơn");
    setDataProcess({
      ...data,
      promotionDay: moment(data?.promotionDay).format("YYYY-MM-DD"),
    });
  };
  const handleDeleteRequest = (data) => {
    setIdProcess(data?.id);
    setOpenConfirmDialog(true);
  };

  const deleteProcessById = () => {
    dispatch(deleteProcessRequest(idProcess, employee?.id));
    closeConfirmDialog();
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
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextValidator
                name="promotionDay"
                type="date"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Ngày thăng chức
                  </span>
                }
                value={dataProcess?.promotionDay || ""}
                onChange={handleChange}
                fullWidth
                validators={["required", "isAfterOrEqualToToday"]}
                errorMessages={[
                  "Ngày thăng chức không được bỏ trống",
                  "Ngày thăng chức phải sau hoặc bằng ngày hôm nay",
                ]}
                placeholder="Chọn ngày thăng chức"
                size="small"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={Boolean(
                  Number(dataProcess?.processStatus) ===
                  STATUS_EMPLOYEE.CHO_DUYET.CODE
                )}
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <FormControl fullWidth>
                <SelectValidator
                  name="newPosition"
                  value={dataProcess?.newPosition || ""}
                  label={
                    <span>
                      <span className="red-color"> * </span>
                      Chọn chức vụ
                    </span>
                  }
                  onChange={handleChange}
                  size="small"
                  variant="outlined"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Vui lòng chọn chức vụ"]}
                  disabled={Boolean(
                    Number(dataProcess?.processStatus) ===
                    STATUS_EMPLOYEE.CHO_DUYET.CODE
                  )}
                >
                  {LIST_POSITION &&
                    LIST_POSITION.map((item) => {
                      return (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </SelectValidator>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                name="note"
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Ghi chú
                  </span>
                }
                multiline
                value={dataProcess?.note || ""}
                onChange={handleChange}
                fullWidth
                validators={["required", "maxStringLength:500"]}
                errorMessages={[
                  "Vui lòng nhập Ghi chú",
                  "Nhập tối đa 500 ký tự",
                ]}
                placeholder="Nhập Ghi chú"
                size="small"
                variant="outlined"
                disabled={Boolean(
                  Number(dataProcess?.processStatus) ===
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
                data={listProcess}
                height={"320px"}
                paging={true}
                pageSize={5}
              />
            </Grid>
          </Grid>
          {openConfirmDialog && (
            <ConfirmDialog
              open={openConfirmDialog}
              onClose={closeConfirmDialog}
              handleDialogConfirm={deleteProcessById}
              title={title}
            />
          )}
          {openGeneralOfRequestForm && (
            <GeneralOfRequestForm
              statusOfForm={statusOfForm}
              open={openGeneralOfRequestForm}
              onClose={closeFormDetail}
              requestOfEmployeeData={processDetail}
              employeeData={employee}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Process;
