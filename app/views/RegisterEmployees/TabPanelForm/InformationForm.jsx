import React from "react";
import {
  Paper,
  Grid,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
} from "@material-ui/core";
import "../../../../styles/views/_informationForm.scss";
import { GENDER, RELATIONSHIP } from "app/Constants/ListSelectItem";
import moment from "moment/moment";
const InformationForm = ({ employeeDetail }) => {
  const currentDate = new Date();
  return (
    <Paper className="root-info">
      <Grid
        container
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className="background-info"
      >
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <Avatar
            className="avatar-info"
            alt="4x6"
            src={employeeDetail?.image}
            variant="square"
          />
        </Grid>
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <h3 className="title-information">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </h3>
          <h4 className="title-information">Độc lập - Tự do - Hạnh phúc</h4>
          <p className="title-information mb-48">---------------</p>
          <h2 className="title-info mb-8">SƠ YẾU LÝ LỊCH</h2>
          <h2 className="title-info-2 ">TỰ THUẬT</h2>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} className="mb-28">
          <Grid item className="mb-20">
            <h3 className="font-custom-title mt-48">I. THÔNG TIN CÁ NHÂN</h3>
          </Grid>
          <Grid item container className="mb-16">
            <Grid container item lg={8} md={8} sm={8} xs={8}>
              <Typography className="font-custom">
                1. Họ và tên(chữ in hoa):{" "}
              </Typography>
              <span className="dotted-input">
                <input
                  className="font-name"
                  type="text"
                  value={employeeDetail?.name}
                  readOnly
                />
              </span>
            </Grid>
            <Grid container item lg={4} md={4} sm={4} xs={4}>
              <Typography className="font-custom">2. Giới tính: </Typography>
              <span className="dotted-input">
                <input
                  className="font-custom"
                  type="text"
                  value={
                    GENDER.find(
                      (item) => item.id === employeeDetail?.gender?.toString()
                    )?.name
                  }
                  readOnly
                />
              </span>
            </Grid>
          </Grid>
          <Grid item container className="mb-12">
            <Grid container item lg={6} md={6} sm={6} xs={6}>
              <Typography className="font-custom">3. Ngày sinh: </Typography>
              <span className="dotted-input">
                <input
                  className="font-custom"
                  type="text"
                  value={moment(employeeDetail?.dateOfBirth).format(
                    "DD/MM/YYYY"
                  )}
                  readOnly
                />
              </span>
            </Grid>
            <Grid item container lg={6} md={6} sm={6} xs={6}>
              <Typography className="font-custom">4. Nơi sinh: </Typography>
              <span className="dotted-input">
                <input
                  className="font-custom"
                  type="text"
                  value={employeeDetail.address}
                  readOnly
                />
              </span>
            </Grid>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="mb-12"
            container
          >
            <Typography className="font-custom">5. Nơi ở hiện nay: </Typography>

            <span className="area-dotted-span-address">
              <TextField
                type="text"
                name="address"
                value={employeeDetail?.address}
                readOnly
                size="small"
                multiline
                fullWidth
                className="area-dotted-address"
              />
            </span>
          </Grid>
          <Grid item container className="mb-12">
            <Grid item container lg={6} md={6} sm={6} xs={6}>
              <Typography className="font-custom">6. Điện thoại: </Typography>
              <span className="dotted-input">
                <input
                  className="font-custom"
                  type="text"
                  value={employeeDetail?.phone}
                  readOnly
                />
              </span>
            </Grid>
            <Grid item container lg={6} md={6} sm={6} xs={6}>
              <Typography className="font-custom">7. Email: </Typography>
              <span className="dotted-input">
                <input
                  className="font-custom"
                  type="text"
                  value={employeeDetail?.email}
                  readOnly
                />
              </span>
            </Grid>
          </Grid>
          <Grid item container className="mb-12">
            <Grid item container lg={6} md={6} sm={6} xs={6}>
              <Typography className="font-custom">8. Dân tộc: </Typography>
              <span className="dotted-input">
                <input
                  className="font-custom"
                  type="text"
                  value={employeeDetail?.ethnic}
                  readOnly
                />
              </span>
            </Grid>
            <Grid item container lg={6} md={6} sm={6} xs={6}>
              <Typography className="font-custom">9. Tôn giáo: </Typography>
              <span className="dotted-input">
                <input
                  className="font-custom"
                  type="text"
                  value={employeeDetail?.religion}
                  readOnly
                />
              </span>
            </Grid>
          </Grid>
          <Grid item container className="mb-12">
            <Grid container item lg={6} md={6} sm={6} xs={6}>
              <Typography className="font-custom">
                10. Số chứng minh:
              </Typography>
              <span className="dotted-input">
                <input
                  className="font-custom"
                  type="text"
                  value={employeeDetail?.citizenIdentificationNumber}
                  readOnly
                />
              </span>
            </Grid>
            <Grid container item lg={6} md={6} sm={6} xs={6}>
              <Typography className="font-custom">11. Ngày cấp: </Typography>
              <span className="dotted-input">
                <input
                  className="font-custom"
                  type="text"
                  value={moment(employeeDetail?.dateOfIssuanceCard).format(
                    "DD/MM/YYYY"
                  )}
                  readOnly
                />
              </span>
            </Grid>
          </Grid>
          <Grid
            container
            item
            className="mb-12"
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Typography className="font-custom">12. Nơi cấp: </Typography>
            <span className="area-dotted">
              <TextField
                type="text"
                name="placeOfIssueCard"
                value={employeeDetail?.placeOfIssueCard}
                readOnly
                size="small"
                multiline
                fullWidth
                className="area-dotted-placeOfIssueCard"
              />
            </span>
          </Grid>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} className="mb-32">
          <Grid item className="mb-20">
            <h3 className="font-custom-title mb-24">II. QUAN HỆ GIA ĐÌNH</h3>
            <p className="mb-16 custom-note">Ghi rõ họ tên, năm sinh, địa chỉ , mối quan hệ, căn cước công dân của bố mẹ đẻ, anh chị em ruột, vợ (hoặc chồng), con.</p>
            <Grid item container className="mb-20">
              <Table className="TableComponent">
                <TableHead>
                  <TableRow>
                    <TableCell width={"10%"}>STT</TableCell>
                    <TableCell width={"20%"}>Họ tên</TableCell>
                    <TableCell width={"17%"}>Ngày sinh</TableCell>
                    <TableCell width={"13%"}>Quan hệ</TableCell>
                    <TableCell width={"20%"}>
                      Địa chỉ
                    </TableCell>
                    <TableCell width={"20%"}>Số CCCD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeDetail?.employeeFamilyDtos ? (
                    employeeDetail?.employeeFamilyDtos?.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell width={"10%"}>{index + 1}</TableCell>
                        <TableCell width={"20%"} className="address-table">{row.name}</TableCell>
                        <TableCell width={"17%"}>
                          {moment(row?.dateOfBirth).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell width={"13%"}>
                          {
                            RELATIONSHIP.find(
                              (item) => item.id === row?.relationShip
                            )?.name
                          }
                        </TableCell>
                        <TableCell className="address-table" width={"20%"}>
                          {row.address}
                        </TableCell>
                        <TableCell width={"20%"}>
                          {row.citizenIdentificationNumber}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableCell colSpan={5} align="center"></TableCell>
                  )}
                </TableBody>
              </Table>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              justifyContent="center"
              className="mt-16"
            >
              <Grid item xs={12} className="title-promise">
                <h5 className="title-promise">LỜI CAM ĐOAN</h5>
              </Grid>
              <Grid item xs={12}>
                <p className="title-des">
                  Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật,
                  nếu có điều gì không đúng tôi chịu trách nhiệm trước pháp luật
                  về lời khai của mình.
                </p>
              </Grid>
            </Grid>
            <Grid item container className="signature-class">
              <Grid item className="signature-employee">
                <p className="signature-text signature-font-style">
                  <span className="signature-text signature-font-style">
                    Hà Nội, ngày
                  </span>
                  <span className="dotted-input-day">
                    <input
                      type="text"
                      value={
                        employeeDetail?.submitDay
                          ? moment(employeeDetail.submitDay).format("DD")
                          : currentDate.getDate()?.toString()?.padStart(2, "0")
                      }
                      readOnly
                    />
                  </span>

                  <span className="signature-text signature-font-style">
                    tháng
                  </span>
                  <span className="dotted-input-day">
                    <input
                      type="text"
                      value={
                        employeeDetail?.submitDay
                          ? moment(employeeDetail.submitDay).format("MM")
                          : (currentDate.getMonth() + 1)
                              ?.toString()
                              ?.padStart(2, "0")
                      }
                      readOnly
                    />
                  </span>
                  <span className="signature-text signature-font-style">
                    năm
                  </span>
                  <span className="dotted-input-day">
                    <input
                      type="text"
                      value={
                        employeeDetail?.submitDay
                          ? moment(employeeDetail.submitDay).year()
                          : currentDate.getFullYear()
                      }
                      readOnly
                    />
                  </span>
                </p>
                <h5 className="signature-text signature-font-weight signature-font-size-1">
                  NGƯỜI KHAI
                </h5>
                <p className="signature-text signature-font-style signature-margin">
                  {" "}
                  (Ký, ghi rõ họ tên)
                </p>
                <p className="signature-text signature-font-weight signature-font-size-2">
                  {employeeDetail?.name}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InformationForm;
