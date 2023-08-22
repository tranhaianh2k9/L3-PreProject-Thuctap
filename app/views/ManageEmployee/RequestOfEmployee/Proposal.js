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
import { LIST_TYPE_PROPOSAL } from "../../../Constants/ListSelectItem";
import {
  getListProposalByEmployeeIdRequest,
  createProposalRequest,
  deleteProposalRequest,
  updateProposalRequest,
} from "app/redux/actions/ProposalAction";
import { getNameById, removeMultipleSpaces } from "utils/handleGeneral";
import "../../../Validate/Validate";
import GeneralOfRequestForm from "app/views/FormGeneralOfRequest/GeneralOfRequestForm";
import { EDIT_PROPOSAL, VIEW_PROPOSAL } from "../../../Constants/ListNameTab";
import * as LS from "../../../Constants/ListStatus";
import MaterialTableComponent from "app/views/Component/MaterialTableComponent/MaterialTableComponent";
import ButtonSaveNCancel from "app/views/Component/Button/ButtonSaveNCancel";
const Proposal = ({ employee }) => {
  const formRef = useRef(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [idProposal, setIdProposal] = useState();
  const [dataProposal, setDataProposal] = useState({});
  const [titleOfForm, setTitleOfForm] = useState("Thêm mới đơn");
  const [openGeneralOfRequestForm, setOpenGeneralOfRequestForm] =
    useState(false);
  const [proposalDetail, setProposalDetail] = useState({});
  const [statusOfForm, setStatusOfForm] = useState();

  const listProposal = useSelector((state) => state?.proposal?.listProposal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeadersRequest());
    dispatch(getListProposalByEmployeeIdRequest(employee?.id));
  }, [employee?.id]);

  const title = "Chắc chắn xóa";

  const handleChange = (e) => {
    if(e.target.name==="type"){
      setDataProposal({
        ...dataProposal,
        [e.target.name]:e.target.value ,
      });
    }else{
      setDataProposal({
        ...dataProposal,
        [e.target.name]:removeMultipleSpaces(e.target.value) ,
      });
    }
  
  };

  const handleSubmit = () => {
      if (dataProposal?.id) {
        const dataTemp = {
          ...dataProposal,
        };
        dispatch(updateProposalRequest(dataTemp, employee?.id));
        handleReset();
      } else {
        dispatch(createProposalRequest([dataProposal], employee?.id));
        handleReset()
      }
  };

  const handleReset = () => {
    setDataProposal({});
    setTitleOfForm("Thêm mới đơn");
    formRef.current.resetValidations();
  };

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      width: "10%",
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
            LS.STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE ? null : (
              <>
                 {!LS.statusesForView.includes(Number(data?.proposalStatus)) && (
                  <IconButton
                    onClick={() => {
                      handleEditRequest(data);
                    }}
                  >
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                )}
                {Number(data?.proposalStatus) === LS.STATUS_EMPLOYEE.LUU_MOI.CODE && (
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
      title: "Loại",
      field: "type",
      align: "center",
      width: "5%",
      render: (data) => {
        return getNameById(Number(data?.type), LIST_TYPE_PROPOSAL);
      },
    },
    {
      title: "Chi tiết",
      field: "detailedDescription",
      align: "left",
      width: "5%",
      render: (data) => (
        <span className="address-column">{data?.detailedDescription}</span>
      ),
    },
    {
      title: "ghi chú",
      field: "note",
      align: "left",
      width: "5%",
      render: (data) => <span className="address-column">{data?.note}</span>,
    },
    {
      title: "Ngày hiệu lực",
      field: "proposalDate",
      align: "center",
      width: "5%",
      render: (data) => moment(data?.proposalDate).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      field: "proposalStatus",
      align: "left",
      width: "5%",
      render: (data) => {
        return getNameById(Number(data?.proposalStatus), LS?.STATUSES);
      },
    },
  ];

  const handleOpenFormDetail = (data) => {
    setOpenGeneralOfRequestForm(true);
    if (LS.statusesForView.includes(Number(data?.proposalStatus))){
      setStatusOfForm(VIEW_PROPOSAL)
    } else if (LS.statusesForEdit.includes(Number(data?.proposalStatus))) {
      setStatusOfForm(EDIT_PROPOSAL);
    }
    setProposalDetail(data)
  };
  const closeFormDetail = () => {
    setOpenGeneralOfRequestForm(false);
  };

  const closeConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleEditRequest = (data) => {
    setTitleOfForm("Sửa đơn");
    setDataProposal({
      ...data,
      proposalDate: moment(data?.startDate).format("YYYY-MM-DD"),
    });
    
  };
  const handleDeleteRequest = (data) => {
    setIdProposal(data?.id);
    setOpenConfirmDialog(true);
  };

  const deleteProposalById = () => {
    dispatch(deleteProposalRequest(idProposal, employee?.id));
    closeConfirmDialog();
  };

  return (
    <div>
      { Number(employee?.submitProfileStatus) !== LS.STATUS_EMPLOYEE.CHO_DUYET_KET_THUC.CODE && ( <ValidatorForm
        className="mb-20 pt-12 width-child "
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Grid className=" mb-16 ml-8 styleColor">{titleOfForm} </Grid>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              name="proposalDate"
              type="date"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Ngày hiệu lực
                </span>
              }
              value={dataProposal?.proposalDate || ""}
              onChange={handleChange}
              fullWidth
              validators={["required", "isAfterOrEqualToToday"]}
              errorMessages={[
                "Ngày hiệu lực không được bỏ trống",
                "Ngày hiệu lực phải sau hoặc bằng ngày hôm nay",
              ]}
              placeholder="Chọn ngày hiệu lực"
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={Boolean(
                Number(dataProposal?.proposalStatus) ===
                LS.STATUS_EMPLOYEE.CHO_DUYET.CODE
              )}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FormControl fullWidth>
              <SelectValidator
                name="type"
                value={dataProposal?.type || ""}
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Loại
                  </span>
                }
                onChange={handleChange}
                size="small"
                variant="outlined"
                fullWidth
                validators={["required"]}
                errorMessages={["Vui lòng chọn loại"]}
                disabled={Boolean(
                  Number(dataProposal?.proposalStatus) ===
                  LS.STATUS_EMPLOYEE.CHO_DUYET.CODE
                )}
              >
                {LIST_TYPE_PROPOSAL &&
                  LIST_TYPE_PROPOSAL.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </SelectValidator>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              name="content"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Nội dung
                </span>
              }
              value={dataProposal?.content || ""}
              onChange={handleChange}
              fullWidth
              multiline
              validators={["required" , "maxStringLength:500"]}
              errorMessages={["Vui lòng nhập nội dung " , "Nhập tối đa 500 ký tự"]}
              placeholder="Nhập nội dung"
              size="small"
              variant="outlined"
              disabled={Boolean(
                Number(dataProposal?.proposalStatus) ===
                LS.STATUS_EMPLOYEE.CHO_DUYET.CODE
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
              multiline
              value={dataProposal?.note || ""}
              onChange={handleChange}
              fullWidth
              validators={["required" , "maxStringLength:500"]}
              errorMessages={["Vui lòng nhập Ghi chú", "Nhập tối đa 500 ký tự"]}
              placeholder="Nhập Ghi chú"
              size="small"
              variant="outlined"
              disabled={Boolean(
                Number(dataProposal?.proposalStatus) ===
                LS.STATUS_EMPLOYEE.CHO_DUYET.CODE
              )}
            />
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <TextValidator
              name="detailedDescription"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Mô tả chi tiết
                </span>
              }
              multiline
              value={dataProposal?.detailedDescription || ""}
              onChange={handleChange}
              fullWidth
              validators={["required"  , "maxStringLength:500" ]}
              errorMessages={["Vui lòng nhập mô tả chi tiết" , "Nhập tối đa 500 ký tự" ]}
              placeholder="Nhập mô tả chi tiết"
              size="small"
              variant="outlined"
              disabled={Boolean(
                Number(dataProposal?.proposalStatus) ===
                LS.STATUS_EMPLOYEE.CHO_DUYET.CODE
              )}
            />
          </Grid>
          <ButtonSaveNCancel handleReset={handleReset} />
        </Grid>
      </ValidatorForm> )}
      <div>
        <div className="mb-sm-30">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <MaterialTableComponent
                columns={columns}
                data={listProposal}
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
              handleDialogConfirm={deleteProposalById}
              title={title}
            />
          )}

          {openGeneralOfRequestForm && (
            <GeneralOfRequestForm
              statusOfForm={statusOfForm}
              open={openGeneralOfRequestForm}
              onClose={closeFormDetail}
              requestOfEmployeeData={proposalDetail}
              employeeData={employee}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Proposal;
