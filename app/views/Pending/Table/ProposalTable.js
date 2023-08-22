import React, { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  Icon,
  makeStyles,
} from "@material-ui/core";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import "../../../../styles/views/_pending.scss";
import { getListPendingProposalRequest } from "../../../redux/actions/ProposalAction"
import { STATUSES } from "../../../Constants/ListStatus"
import moment from "moment/moment";
import { getNameById } from "utils/handleGeneral";
import GeneralOfRequestForm from "../../FormGeneralOfRequest/GeneralOfRequestForm"
import { ACTION_PROPOSAL } from "app/Constants/ListNameTab";
import MaterialTableComponent from "app/views/Component/MaterialTableComponent/MaterialTableComponent";

const useStyles = makeStyles({
  redColor: {
    color: "red",
  },

  inputSearch: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  TextFieldSearch: {
    width: "450px",
    marginLeft: "auto",
  },
});



const ProposalTable = ({ title }) => {
  const styleClass = useStyles();

  const [openGeneralOfRequestForm, setOpenGeneralOfRequestForm] = useState(false)
  const [proposalDetail, setProposalDetail] = useState({})


  const dispatch = useDispatch();
  const listProposal = useSelector((state) => state?.proposal?.listProposal);

  useEffect(() => {
    dispatch(getListPendingProposalRequest());
  }, [dispatch]);

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      width: "5%",
      render: (data) => {
        return (
          <IconButton
            onClick={() => {
              handleOpenFormDetail(data);
            }}
          >
            <Icon color="primary">visibility</Icon>
          </IconButton>
        );
      },
    },
    {
      title: "Nội dung",
      field: "content",
      align: "left",
      width: "5%",
      render: (data) => <span className="address-column">{data?.content}</span>,
    },
    {
      title: "Miêu tả cụ thể",
      field: "detailedDescription",
      align: "left",
      width: "5%",
      render: (data) => <span className="address-column">{data?.detailedDescription}</span>,
    },
    {
      title: "Ngày đề xuất",
      field: "startDate",
      align: "center",
      width: "5%",
      render: (row) => moment(row?.proposalDate).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      field: "ProposalStatus",
      align: "left",
      width: "5%",
      render: (data) => {
        return (getNameById(Number(data?.proposalStatus), STATUSES))
      }
    },
  ];
  const handleCloseFormDetail = () => {
    setOpenGeneralOfRequestForm(false);
  };

  const handleOpenFormDetail = (data) => {
    setOpenGeneralOfRequestForm(true);
    setProposalDetail(data)
  }
  return (
    <div>
      <Grid className={styleClass?.inputSearch}>
        <h4 className="mt-16 mb-16"> {"Danh sách " + title} </h4>
      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <MaterialTableComponent
            columns={columns}
            data={listProposal}
            paging={true}
            pageSize={10}
            height={"540px"}
          ></MaterialTableComponent>
        </Grid>
      </Grid>
      {openGeneralOfRequestForm && (
        <GeneralOfRequestForm
          statusOfForm={ACTION_PROPOSAL}
          open={openGeneralOfRequestForm}
          onClose={handleCloseFormDetail}
          requestOfEmployeeData={proposalDetail}
        />
      )}
    </div>
  );
};

export default ProposalTable;
