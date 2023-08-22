import React, { useEffect, useState } from "react";
import ConfirmationDialog from "egret/components/ConfirmationDialog";
import { useTranslation } from "react-i18next";
import { Button, Icon, IconButton, Grid } from "@material-ui/core";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCertificate,
  deleteCertificate,
  getCertificateByIdRequest,
  updateCertificate,
} from "app/redux/actions/CertificateAction";
import MaterialTableComponent from "app/views/Component/MaterialTableComponent/MaterialTableComponent";

const AddCertificateForm = ({
  employee,
  certificate,
  setCertificate,
  isViewMode,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isUpdated, setIsUpdated] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const certificateReducer = useSelector(
    (state) => state.certificates.certificates
  );
  const [certificateId, setCertificateId] = useState("");
  const [certificateData, setCertificateData] = useState({
    certificateName: "",
    issueDate: "",
    content: "",
    field: "",
  });
  useEffect(() => {
    if (employee?.id) {
      dispatch(getCertificateByIdRequest(employee?.id));
    }
  }, [dispatch, employee]);

  const handleChange = (e) => {
    setCertificateData({
      ...certificateData,
      [e.target.name]: e.target.value,
    });
  };
  const columns = [
    {
      title: "STT",
      render: (rowData) => rowData.tableData.id + 1,
      width: "5%",
      align: "center",
    },
    {
      title: "Thao tác",
      field: "custom",
      width: "5%",
      align: "center",
      render: (row) => {
        return (
          <div className="flex-icon">
            {isViewMode ? (
              <IconButton
                size="small"
                onClick={() => {
                  handleViewCertificate(row);
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
      field: "certificateName",
      title: "Tên văn bằng",
      width: "20%",
    },
    {
      field: "field",
      title: "Xếp loại",
      width: "20%",
      render: (row) => <span className="address-column">{row.field}</span>,
    },
    {
      field: "issueDate",
      title: "Ngày cấp",
      width: "10%",
      render: (row) => moment(row.issueDate).format("DD/MM/YYYY"),
    },
    {
      field: "content",
      title: "Nội dung",
      width: "35%",
    },
  ];

  const handleEdit = (item) => {
    setCertificateData({
      ...item,
      issueDate: moment(item?.issueDate).format("YYYY-MM-DD"),
    });
    setIsUpdated(true);
  };

  const handleReset = () => {
    setCertificateData({
      certificateName: "",
      issueDate: "",
      content: "",
      field: "",
    });
    setIsUpdated(false);
  };

  const handleAddCertificate = () => {
    const dataTemp = {
      ...certificateData,
      employeeId: employee?.id,
    };
    if (employee?.id) {
      dispatch(addCertificate(employee?.id, [dataTemp]));
    } else {
      setCertificate([...certificate, dataTemp]);
      toast.success("Thêm thành công!");
    }
    handleReset();
  };

  const handleUpdateCertificate = () => {
    const dataTemp = {
      ...certificateData,
      employeeId: employee.id,
    };
    if (employee?.id) {
      dispatch(updateCertificate(dataTemp));
    } else {
      const updatedCertificateIndex = certificate.findIndex(
        (item) => item?.tableData?.id === certificateData?.tableData?.id
      );
      if (updatedCertificateIndex !== -1) {
        const newListCertificate = [...certificate];
        newListCertificate[updatedCertificateIndex] = dataTemp;
        setCertificate(newListCertificate);
        toast.success("Cập nhật thành công!");
      } else {
        toast.error("Không tìm thấy văn bằng để cập nhật.");
      }
    }
    handleReset();
  };

  const handleSubmit = () => {
    if (isUpdated) {
      handleUpdateCertificate();
    } else {
      handleAddCertificate();
    }
  };

  // Xóa chứng chỉ
  const handleOpenDeleteDialog = () => {
    setShowDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  const handleDelete = (item) => {
    if (item?.id) {
      setCertificateId(item?.id);
    } else {
      setCertificateId(item.tableData?.id);
    }
    handleOpenDeleteDialog();
  };
  const handleDeleteCertificate = () => {
    if (employee?.id) {
      dispatch(deleteCertificate(certificateId));
    } else {
      setCertificate(
        certificate.filter((item) => item?.tableData?.id !== certificateId)
      );
      toast.success("Xóa chứng chỉ thành công!");
    }
    handleReset();
    handleCloseDeleteDialog();
  };
  const handleViewCertificate = (item) => {
    setCertificateData({
      ...item,
      issueDate: moment(item?.issueDate).format("YYYY-MM-DD"),
    });
  };
  return (
    <div>
      <ValidatorForm className="mb-20" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <TextValidator
              name="certificateName"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Tên văn bằng
                </span>
              }
              value={certificateData?.certificateName || ""}
              onChange={handleChange}
              fullWidth
              validators={["required", "maxStringLength:50"]}
              errorMessages={[
                "Vui lòng nhập tên văn bằng",
                "Tên văn bằng không quá 50 ký tự",
              ]}
              placeholder="Nhập tên văn bằng"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: isViewMode,
              }}
            />
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <TextValidator
              name="issueDate"
              type="date"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Ngày cấp
                </span>
              }
              value={certificateData?.issueDate || ""}
              onChange={handleChange}
              fullWidth
              validators={["required"]}
              errorMessages={["Vui lòng chọn ngày cấp"]}
              placeholder="Chọn ngày cấp"
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: isViewMode,
              }}
            />
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <TextValidator
              name="field"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Xếp loại
                </span>
              }
              value={certificateData?.field || ""}
              onChange={handleChange}
              fullWidth
              validators={["required", "maxStringLength:30"]}
              errorMessages={[
                "Vui lòng nhập xếp loại",
                "Xêp loại không quá 30 ký tự",
              ]}
              placeholder="Nhập xếp loại"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: isViewMode,
              }}
            />
          </Grid>
          <Grid item lg={10} md={10} sm={12} xs={12}>
            <TextValidator
              name="content"
              label={
                <span>
                  <span className="red-color"> * </span>
                  Nội dung
                </span>
              }
              value={certificateData?.content || ""}
              onChange={handleChange}
              fullWidth
              validators={["required", "maxStringLength:200"]}
              errorMessages={[
                "Vui lòng nhập nội dung",
                "Nội dung không quá 200 ký tự",
              ]}
              placeholder="Nhập nội dung"
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
              className="mr-8"
              disabled={isViewMode}
            >
              Lưu
            </Button>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Hủy
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
      <MaterialTableComponent
        columns={columns}
        data={employee?.id ? certificateReducer : certificate}
        height={"300px"}
      />
      {showDeleteDialog && (
        <ConfirmationDialog
          open={showDeleteDialog}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleDeleteCertificate}
          title={"Xóa chứng chỉ"}
          text={`Bạn có muốn xóa Chứng chỉ không?`}
          Yes={t("general.delete")}
          No={t("general.cancel")}
        ></ConfirmationDialog>
      )}
    </div>
  );
};

export default AddCertificateForm;
