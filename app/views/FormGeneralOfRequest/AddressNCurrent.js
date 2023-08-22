import React from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import "../../../styles/views/_formReneral.scss";
import { LIST_POSITION, TEAM } from "../../Constants/ListSelectItem";
import { getNameById } from "../../../utils/handleGeneral";

const AddressNCurrent = ({infoData}) => {
  return (
    <Grid className="info-block">
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">
                Nơi ở:{" "}
                <span className="input-address-dotted">
                  <input readOnly type="text" value={infoData?.address || ""} />
                </span>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">
                Hiện đang là nhân viên của công ty OCEANTECH
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mb-10 ">
          <Grid item xs={12}>
            <div className=" mb-10 mt-14 ">
              <Typography className="font-style ">
                Đơn vị công tác:{" "}
                <span className="input-team-dotted">
                  <input
                    readOnly
                    type="text"
                    value={getNameById(Number(infoData?.team), TEAM) || ""}
                  />
                </span>
                Chức vụ:{" "}
                <span className=" input-current-dotted">
                  <input
                    readOnly
                    type="text"
                    value={
                      getNameById(
                        Number(infoData?.currentPosition),
                        LIST_POSITION
                      ) || ""
                    }
                  />
                </span>
              </Typography>
            </div>
          </Grid>
        </Grid>
    </Grid>
  )
}
export default AddressNCurrent