import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  IconButton,
  Grid,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { GENDER, RELATIONSHIP } from "app/Constants/ListSelectItem";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import "../../../Validate/Validate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "egret/components/ConfirmationDialog";
import {
  addFamily,
  deleteFamily,
  getFamilyByIdRequest,
  updateFamily,
} from "app/redux/actions/FamilyAction";
import MaterialTableComponent from "app/views/Component/MaterialTableComponent/MaterialTableComponent";

const FamilyRelationshipForm = ({
  employee,
  family,
  setFamily,
  isViewMode,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const familyReducer = useSelector((state) => state.family.listFamily);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [familyId, setFamilyId] = useState("");
  const [familyFormData, setFamilyFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    relationShip: "",
    citizenIdentificationNumber: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  useEffect(() => {
    if (employee?.id) {
      dispatch(getFamilyByIdRequest(employee?.id));
    }
  }, [dispatch, employee]);
  const handleChange = (e) => {
    setFamilyFormData({
      ...familyFormData,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    {
      title: "STT",
      render: (row) => row.tableData.id + 1,
      width: "5%",
      align: "center",
    },
    {
      title: "Thao tác",
      field: "custom",
      width: "10%",
      align: "center",
      render: (row) => {
        return (
          <div className="flex-icon">
            {isViewMode ? (
              <IconButton
                size="small"
                onClick={() => {
                  handleViewFamily(row);
                }}
              >
                <Icon color="primary">visibility</Icon>
              </IconButton>
            ) : (
              <div>
                <IconButton>
                  <Icon
                    color="primary"
                    onClick={() => {
                      handleEdit(row);
                    }}
                  >
                    edit
                  </Icon>
                </IconButton>

                <IconButton>
                  <Icon
                    color="error"
                    onClick={() => {
                      handleDelete(row);
                    }}
                  >
                    delete
                  </Icon>
                </IconButton>
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "name",
      title: "Tên thành viên",
      width: "25%",
    },
    {
      field: "gender",
      title: "Giới tính",
      width: "5%",
      align: "center",
      render: (data) =>
        GENDER.find((item) => item.id === data.gender.toString())?.name,
    },
    {
      field: "dateOfBirth",
      title: "Ngày sinh",
      width: "5%",
      render: (row) => moment(row.dateOfBirth).format("DD/MM/YYYY"),
    },
    {
      field: "relationShip",
      title: "Quan hệ",
      width: "5%",
      align: "center",
      render: (data) =>
        RELATIONSHIP.find((item) => item.id === data.relationShip)?.name,
    },
    {
      field: "citizenIdentificationNumber",
      title: "CCCD",
      width: "5%",
    },
    {
      field: "phoneNumber",
      title: "SĐT",
      width: "5%",
    },
    {
      field: "address",
      title: "Địa chỉ",
      width: "35%",
    },
  ];
  const handleReset = () => {
    setFamilyFormData({
      name: "",
      gender: "",
      dateOfBirth: "",
      relationShip: "",
      citizenIdentificationNumber: "",
      phoneNumber: "",
      email: "",
      address: "",
    });
    setIsUpdated(false);
  };

  const handleAddFamily = async () => {
    const dataTemp = {
      ...familyFormData,
      employeeId: employee?.id,
    };
    if (employee?.id) {
      dispatch(addFamily(employee?.id, [dataTemp]));
    } else {
      setFamily([...family, dataTemp]);
      toast.success("Thêm thành công!");
    }
    handleReset();
  };

  // Update
  const handleEdit = (item) => {
    setFamilyFormData({
      ...item,
      dateOfBirth: moment(item?.dateOfBirth).format("YYYY-MM-DD"),
    });
    setIsUpdated(true);
  };
  const handleUpdateFamily = async () => {
    const dataTemp = {
      ...familyFormData,
      employeeId: employee.id,
    };
    if (employee?.id) {
      dispatch(updateFamily(dataTemp));
    } else {
      const updatedFamilyIndex = family.findIndex(
        (item) => item?.tableData?.id === familyFormData?.tableData?.id
      );
      if (updatedFamilyIndex !== -1) {
        const newListCertificate = [...family];
        newListCertificate[updatedFamilyIndex] = dataTemp;
        setFamily(newListCertificate);
        toast.success("Cập nhật thành công!");
      } else {
        toast.error("Không tìm thấy văn bằng để cập nhật.");
      }
    }
    handleReset();
  };

  const handleSubmit = () => {
    if (isUpdated) {
      handleUpdateFamily();
    } else {
      handleAddFamily();
    }
  };

  // Delete
  const handleOpenDeleteDialog = () => {
    setShowDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  const handleDelete = (item) => {
    if (item?.id) {
      setFamilyId(item?.id);
    } else {
      setFamilyId(item.tableData?.id);
    }
    handleOpenDeleteDialog();
  };

  const handleDeleteFamily = async () => {
    if (employee?.id) {
      dispatch(deleteFamily(familyId));
    } else {
      setFamily(family.filter((item) => item?.tableData?.id !== familyId));
      toast.success("Xóa thành viên thành công!");
    }
    handleCloseDeleteDialog();
    handleReset();
  };
  const handleViewFamily = (item) => {
    setFamilyFormData({
      ...item,
      dateOfBirth: moment(item?.dateOfBirth).format("YYYY-MM-DD"),
    });
  };
  return (
    <div>
      <ValidatorForm className="mb-20" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              name="name"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Tên thành viên
                </span>
              }
              value={familyFormData?.name || ""}
              onChange={handleChange}
              fullWidth
              validators={[
                "required",
                'matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$',
                "maxStringLength:30",
              ]}
              errorMessages={[
                "Vui lòng nhập tên thành viên",
                "Tên không chứa kí tự đặc biệt",
                "Tên không quá 30 ký tự",
              ]}
              placeholder="Nhập tên thành viên"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: isViewMode,
              }}
            />
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <FormControl fullWidth>
              <SelectValidator
                name="gender"
                value={
                  GENDER.find(
                    (item) => item.id === familyFormData?.gender?.toString()
                  )?.id || ""
                }
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Giới tính
                  </span>
                }
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["Vui lòng chọn giới tính"]}
                size="small"
                variant="outlined"
                fullWidth
                disabled={isViewMode}
              >
                {GENDER.map((i) => (
                  <MenuItem value={i.id} key={i.id}>
                    {i.name}
                  </MenuItem>
                ))}
              </SelectValidator>
            </FormControl>
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <TextValidator
              name="dateOfBirth"
              type="date"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Ngày sinh
                </span>
              }
              value={familyFormData?.dateOfBirth || ""}
              onChange={handleChange}
              fullWidth
              validators={["required"]}
              errorMessages={["Vui lòng nhập ngày sinh"]}
              placeholder="Nhập ngày sinh"
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: isViewMode,
                inputProps: {
                  max: moment().format("YYYY-MM-DD"),
                },
              }}
            />
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <FormControl fullWidth>
              <SelectValidator
                name="relationShip"
                value={familyFormData?.relationShip || ""}
                label={
                  <span>
                    <span className="red-color"> * </span>
                    Quan hệ
                  </span>
                }
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["Vui lòng chọn quan hệ"]}
                size="small"
                variant="outlined"
                fullWidth
                disabled={isViewMode}
              >
                {RELATIONSHIP.map((i) => (
                  <MenuItem value={i.id} key={i.id}>
                    {i.name}
                  </MenuItem>
                ))}
              </SelectValidator>
            </FormControl>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              name="citizenIdentificationNumber"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Căn cước công dân
                </span>
              }
              value={familyFormData?.citizenIdentificationNumber || ""}
              onChange={handleChange}
              fullWidth
              validators={["required", "isNumber", "matchRegexp:^\\d{12}$"]}
              errorMessages={[
                "Vui lòng nhập căn cước công dân",
                "Căn cước công dân phải là số",
                "Căn cước công dân phải 12 số",
              ]}
              placeholder="Nhập CCCD"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: isViewMode,
              }}
            />
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <TextValidator
              name="phoneNumber"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Sô điện thoại
                </span>
              }
              value={familyFormData?.phoneNumber || ""}
              onChange={handleChange}
              fullWidth
              validators={[
                "required",
                "isNumber",
                "matchRegexp:^([0]{1}[0-9]{9})?$",
              ]}
              errorMessages={[
                "Vui lòng nhập số điện thoại",
                "Số điện thoại phải là số",
                "Số điện thoại không hợp lệ",
              ]}
              placeholder="Nhập số điện thoại"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: isViewMode,
              }}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              name="email"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Email
                </span>
              }
              value={familyFormData?.email || ""}
              onChange={handleChange}
              fullWidth
              validators={["required", "isEmail"]}
              errorMessages={[
                "Vui lòng nhập email",
                "Email không đúng định dạng",
              ]}
              placeholder="Nhập email"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: isViewMode,
              }}
            />
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <TextValidator
              name="address"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Địa chỉ
                </span>
              }
              value={familyFormData?.address || ""}
              onChange={handleChange}
              fullWidth
              validators={["required", "maxStringLength:60"]}
              errorMessages={["Vui lòng địa chỉ", "Địa chỉ không quá 60 ký tự"]}
              placeholder="Nhập địa chỉ"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: isViewMode,
              }}
            />
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isViewMode}
            >
              Lưu
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="ml-8"
              onClick={handleReset}
            >
              Hủy
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
      <MaterialTableComponent
        columns={columns}
        data={employee?.id ? familyReducer : family}
        height={"300px"}
      />
      {showDeleteDialog && (
        <ConfirmationDialog
          open={showDeleteDialog}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleDeleteFamily}
          title={"Xóa thành viên"}
          text={`Bạn có muốn xóa thành viên không?`}
          Yes={t("general.delete")}
          No={t("general.cancel")}
        ></ConfirmationDialog>
      )}
    </div>
  );
};

export default FamilyRelationshipForm;
