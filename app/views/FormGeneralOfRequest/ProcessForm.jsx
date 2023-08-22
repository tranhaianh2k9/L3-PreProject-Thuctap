import React, { useEffect } from "react";
import { Paper, Grid, Typography, TextField } from "@material-ui/core";
import moment from "moment/moment";
import "../../../styles/views/_formReneral.scss";
import { LIST_POSITION } from "../../Constants/ListSelectItem";
import { getNameById } from "../../../utils/handleGeneral";
import HeaderOfForm from "./HeaderOfForm";
import InfoEmployee from "./InfoEmployee";
import Footer from "./Footer";
import { getEmployeeByIdRequest } from "app/redux/actions/EmployeeActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeadersRequest } from "app/redux/actions/LeaderAction";

const ProcessForm = ({ processDetail, statusOfForm , setProcessDetail }) => {
  const dispatch = useDispatch();
  const employeeDetail = useSelector((state) => state?.employees?.employee);
  const leaderData = useSelector((state) => state.leaders.leadersItem);

  useEffect(() => {
      dispatch(getEmployeeByIdRequest(processDetail?.employeeId));
      dispatch(getAllLeadersRequest());
  }, [processDetail?.id]);


  return (
    <Paper className="paper">
      <Grid container spacing={2} className="mb-10 mt-16 background">
        <HeaderOfForm></HeaderOfForm>
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="text-center mb-10 mt-14">
              <Typography align="center" variant="h5" className="font-style font-weight">
                ĐƠN XIN THĂNG CHỨC
              </Typography>
            </div>
          </Grid>
        </Grid>
        <InfoEmployee data={processDetail} />
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="mb-10 mt-14">
              <Typography className="font-style">
                Sau khi xem sét các quy định về thăng chức và các điều luật liên
                quan, tôi tự đánh giá bản thân đủ điều kiện để được thăng chức
                lên{" "}
                <span className="input-current-dotted">
                  <input
                    readOnly
                    type="text"
                    value={getNameById(
                      Number(processDetail?.newPosition),
                      LIST_POSITION
                    )}
                  />
                </span>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">Ghi chú:</Typography>
              <span>
                  <TextField
                  type="text"
                  name="reasonForEnding"
                  value={processDetail?.note}
                  fullWidth
                  readOnly
                  size="small"
                  multiline
                  className="current-dotted "
                />
              </span>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="mb-10 mt-14">
              <Typography className="font-style">
                Rất mong Ban Giám Đốc xem xét thăng chức cho tôi từ ngày{" "}
                <span className="input-endDay-dotted">
                  <input
                    readOnly
                    type="text"
                    value={moment(processDetail?.promotionDay).format(
                      "DD/MM/YYYY"
                    )}
                  />
                </span>
                . Có như vậy mới đảm bảo công bằng và hiệu quả, tạo ra động lực
                để tôi tiếp tục cống hiến cho Công ty.
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Footer employeeName={employeeDetail?.name} leaderName={getNameById(Number(processDetail?.leaderId  ), leaderData)} />
      </Grid>
    </Paper>
  );
};

export default ProcessForm;
