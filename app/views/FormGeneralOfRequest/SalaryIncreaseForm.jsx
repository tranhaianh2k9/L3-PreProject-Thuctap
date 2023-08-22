import React, { useEffect } from "react";
import { Paper, Grid, Typography, TextField } from "@material-ui/core";
import moment from "moment/moment";
import "../../../styles/views/_formReneral.scss";
import HeaderOfForm from "./HeaderOfForm";
import InfoEmployee from "./InfoEmployee";
import Footer from "./Footer";
import { formatCurrency, getNameById } from "../../../utils/handleGeneral";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeByIdRequest } from "app/redux/actions/EmployeeActions";
import { getAllLeadersRequest } from "app/redux/actions/LeaderAction";


const SalaryIncreaseForm = ({ salaryIncreaseData, statusOfForm , setSalaryIncreaseData }) => {
  const dispatch = useDispatch();
  const employeeDetail = useSelector((state) => state?.employees?.employee);
  const leaderData = useSelector((state) => state.leaders.leadersItem);

  useEffect(() => {
      dispatch(getEmployeeByIdRequest(salaryIncreaseData?.employeeId));
      dispatch(getAllLeadersRequest());
  }, [salaryIncreaseData?.id]);

  return (
    <Paper className="paper">
      <Grid container spacing={2} className="mb-10 mt-16 background">
        <HeaderOfForm></HeaderOfForm>
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="text-center mb-10 mt-14">
              <Typography
                align="center"
                variant="h5"
                className="font-style font-weight"
              >
                ĐƠN XIN TĂNG LƯƠNG
              </Typography>
            </div>
          </Grid>
        </Grid>
        <InfoEmployee data={salaryIncreaseData} />
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14">
              <Typography className="font-style">
                Căn cứ vào Bộ luật lao động 2012 và tình hình thực tế nên tôi
                viết đơn này mong Ban Giám đốc xem xét tăng lương cho tôi Bởi
                các lý do sau:
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">Lý Do:</Typography>
              <span>
                  <TextField
                  type="text"
                  name="reasonForEnding"
                  value={salaryIncreaseData?.reason}
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
                Như vậy, việc tăng lương cho tôi là cần thiết để phù hợp với
                chất lượng làm việc của tôi trong thời gian qua.
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10">
          <Grid item xs={12}>
            <div className="mb-10 mt-14">
              <Typography className="font-style">
                Rất mong Ban Giám Đốc xem xét tăng cho tôi số tiền lương từ{" "}
                <span className="input-endDay-dotted">
                  <input
                    readOnly
                    type="text"
                    value={formatCurrency(salaryIncreaseData?.oldSalary)}
                  />
                </span>
                lên thành{" "}
                <span className="input-endDay-dotted">
                  <input
                    readOnly
                    type="text"
                    value={formatCurrency(salaryIncreaseData?.newSalary)}
                  />
                </span>
                từ ngày{" "}
                <span className="input-endDay-dotted">
                  <input
                    readOnly
                    type="text"
                    value={moment(salaryIncreaseData?.startDate).format(
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
        <Footer employeeName={employeeDetail?.name} leaderName={getNameById(Number(salaryIncreaseData?.leaderId  ), leaderData)} />
      </Grid>
    </Paper>
  );
};

export default SalaryIncreaseForm;
