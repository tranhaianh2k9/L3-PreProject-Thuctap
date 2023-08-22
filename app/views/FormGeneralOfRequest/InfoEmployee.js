import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import moment from "moment/moment";
import "../../../styles/views/_formReneral.scss";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeByIdRequest } from "app/redux/actions/EmployeeActions";
import { getAllLeadersRequest } from "app/redux/actions/LeaderAction";
import AddressNCurrent from "./AddressNCurrent";

const InfoEmployee = ({ data}) => {
    const dispatch = useDispatch();
    const employeeDetail = useSelector((state) => state?.employees?.employee);
    useEffect(() => {
        dispatch(getEmployeeByIdRequest(data?.employeeId));
        dispatch(getAllLeadersRequest());
    }, [data?.id]);

    return (
        <Grid className="info-block"> 
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14">
                <Typography className="font-style ">
                  Kính gửi: Ban giám đốc công ty OCEANTECH
                </Typography>
            </div>
          </Grid>
        </Grid>
            <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">
                Tôi tên là:{" "}
                <span className="input-name-dotted">
                  <input readOnly type="text" value={employeeDetail?.name || ""} />
                </span>
                Ngày sinh:{" "}
                <span className=" input-date-dotted">
                  <input
                    readOnly
                    type="text"
                    value={
                      moment(employeeDetail?.dateOfBirth).format("DD/MM/YYYY") || ""
                    }
                  />
                </span>
              </Typography>
            </div>
          </Grid>
          <AddressNCurrent
          infoData={employeeDetail}
        />
        </Grid>
        </Grid>
    )
}

export default InfoEmployee