import React from "react";
import {
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import "../../../../styles/views/_certificateForm.scss";
import moment from "moment/moment";
const CertificateForm = ({ employeeDetail }) => {
  return (
    <Paper className="root-degree">
      <Grid container lg={12} md={12} sm={12} xs={12} className="background-degree">
        <Grid item>
          <h5 className="title-degree mb-16">VĂN BẰNG</h5>
        </Grid>
        <Grid item>
          <Table className="TableComponent">
            <TableHead>
              <TableRow>
                <TableCell width={"10%"}>STT</TableCell>
                <TableCell width={"25%"}>Tên văn bằng</TableCell>
                <TableCell>Xếp loại</TableCell>
                <TableCell width={"30%"}>Nội dung</TableCell>
                <TableCell>Ngày cấp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeDetail?.certificatesDto ? (
                employeeDetail?.certificatesDto?.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell width={"10%"}>{index + 1}</TableCell>
                    <TableCell width={"25%"} className="content-table">{row.certificateName}</TableCell>
                    <TableCell>{row.field}</TableCell>
                    <TableCell width={"30%"} className="content-table">{row.content}</TableCell>
                    <TableCell>
                      {moment(row?.issueDate).format("DD/MM/YYYY")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={5} align="center">
                  
                </TableCell>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CertificateForm;
