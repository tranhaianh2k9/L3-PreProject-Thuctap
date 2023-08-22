import { Grid, Icon, IconButton, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ExperiencesForm from "./ExperiencesForm";
import {
  deleteExperience,
  getExperienceById,
} from "app/redux/api/apiExperiences";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../styles/views/_profileForm.scss";
import ConfirmationDialog from "egret/components/ConfirmationDialog";

const ExperiencesComponent = ({ employee, isViewMode }) => {
  const { t } = useTranslation();
  const [listExperiences, setListExperiences] = useState([]);
  const [experiences, setExperiences] = useState({});
  const [experiencesId, setExperiencesId] = useState("");
  const [showDialogExp, setShowDialogExp] = useState(false);
  const [showDeleteDialogExp, setShowDeleteDialogExp] = useState(false);

  const handleOpenDialog = () => {
    setShowDialogExp(!showDialogExp);
  };

  const handleCloseDialog = () => {
    setShowDialogExp(false);
  };

  const handleAddExp = () => {
    handleOpenDialog();
    setExperiences({});
  };

  useEffect(() => {
    if (employee?.id) {
      handleGetExperience();
    }
  }, [employee]);

  const handleGetExperience = async () => {
    if (employee?.id) {
      const res = await getExperienceById(employee?.id);
      if (res?.code === 200) {
        setListExperiences(res?.data);
      }
    }
  };

  const handleEditExp = (item) => {
    setExperiences(item);
    setShowDialogExp(true);
  };

  const handleOpenDeleteDialogExp = () => {
    setShowDeleteDialogExp(true);
  };

  const handleCloseDeleteDialogExp = () => {
    setShowDeleteDialogExp(false);
  };

  const handleDeleteExp = (id) => {
    setExperiencesId(id);
    handleOpenDeleteDialogExp();
  };

  const handleDialogDeleteExp = async () => {
    const response = await deleteExperience(experiencesId);
    if (response?.code === 200) {
      handleGetExperience();
      toast.success("Xóa kinh nghiệm làm việc thành công!");
    } else {
      toast.error(response?.message);
    }
    handleCloseDeleteDialogExp();
  };

  return (
    <div>
      <Grid>
        <Grid container className="flex-space-between mb-4">
          <h3 className="font-weight-bold my-auto  custom-font">
            {"KINH NGHIỆM LÀM VIỆC"}{" "}
          </h3>
          <IconButton
            size="medium"
            onClick={() => {
              handleAddExp();
            }}
            className={isViewMode ? "hidden" : ""}
          >
            <Icon fontSize="large" color="default">
              add
            </Icon>
          </IconButton>
        </Grid>
        {showDialogExp && (
          <ExperiencesForm
            onClose={handleCloseDialog}
            experiences={experiences}
            employeeId={employee?.id}
            handleGetExperience={handleGetExperience}
          ></ExperiencesForm>
        )}
        {listExperiences &&
          listExperiences.map((item) => {
            return (
              <Grid item key={item.id}  className="mb-16 experience-item">
                <Grid
                  container
                  spacing={1}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <div className="companyName-class">
                    <span className="date-font line-break">
                      {item.companyName}
                    </span>
                    <span className="experience-buttons">
                      <IconButton
                        size="small"
                        onClick={() => {
                          handleEditExp(item);
                        }}
                        className={isViewMode ? "hidden" : ""}
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          handleDeleteExp(item?.id);
                        }}
                        className={isViewMode ? "hidden" : ""}
                      >
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </span>
                  </div>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="mb-8"
                >
                  <div className="box-date">
                    <span class="date-font">
                      {moment(item.startDate).format("DD/MM/YYYY")}
                    </span>
                    <span className="font-weight-bold icon-custom">-</span>
                    <span class="date-font">
                      {moment(item.endDate).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="mb-8 description-container"
                >
                  <div className="box-description">
                     <h4>Mô tả công việc:</h4>
                    <span className="description-exp">
                      <TextField
                        type="text"
                        value={item.jobDescription}
                        readOnly
                        multiline
                        className="area-dotted-exp"
                        fullWidth
                        size="small"
                        InputProps={{
                          readOnly: isViewMode,
                        }}
                      />
                    </span>
                  </div>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
      {showDeleteDialogExp && (
        <ConfirmationDialog
          open={showDeleteDialogExp}
          onConfirmDialogClose={handleCloseDeleteDialogExp}
          onYesClick={handleDialogDeleteExp}
          title={"Xóa nhân viên"}
          text={`Bạn có muốn xóa kinh nghiệm làm việc không?`}
          Yes={t("general.delete")}
          No={t("general.cancel")}
        ></ConfirmationDialog>
      )}
    </div>
  );
};

export default ExperiencesComponent;
