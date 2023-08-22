import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, Tab } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_pending.scss";

import PendingTable from "./Table/PendingTable";
import SalaryIncreaseTable from "./Table/SalaryIncreaseTable";
import ProcessTable from "./Table/ProcessTable";
import ProposalTable from "./Table/ProposalTable";
import BreadcrumbComponent from "../Component/BreadcrumbComponent/BreadcrumbComponent";
import { TAB_LEADER_PENDING } from "app/Constants/ListTab";

const Pending = () => {
  const { t } = useTranslation();
  const [openTableFromTag, setOpenTableFromTag] = useState(0);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setOpenTableFromTag(newValue);
  };

  return (
    <div className="m-sm-30">
      <div>
        <BreadcrumbComponent
          manage={t("Dashboard.leader")}
          title={t("Leader.pending")}
        />
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          className="mt-12"
          centered
        >
          <Tab label={TAB_LEADER_PENDING.CHO_DUYET.LABEL} />
          <Tab label={TAB_LEADER_PENDING.CHO_DUYET_TANG_LUONG.LABEL} />
          <Tab label={TAB_LEADER_PENDING.CHO_DUYET_THANG_CHUC.LABEL} />
          <Tab label={TAB_LEADER_PENDING.DE_XUAT_THAM_MUU.LABEL} />
        </Tabs>
        {openTableFromTag === TAB_LEADER_PENDING.CHO_DUYET.KEY && (
          <PendingTable title={TAB_LEADER_PENDING.CHO_DUYET.LABEL} />
        )}
        {openTableFromTag === TAB_LEADER_PENDING.CHO_DUYET_TANG_LUONG.KEY && (
          <SalaryIncreaseTable title={TAB_LEADER_PENDING.CHO_DUYET_TANG_LUONG.LABEL} />
        )}
        {openTableFromTag === TAB_LEADER_PENDING.CHO_DUYET_THANG_CHUC.KEY && (
          <ProcessTable title={TAB_LEADER_PENDING.CHO_DUYET_THANG_CHUC.LABEL} />
        )}
        {openTableFromTag === TAB_LEADER_PENDING.DE_XUAT_THAM_MUU.KEY && (
          <ProposalTable title={TAB_LEADER_PENDING.DE_XUAT_THAM_MUU.LABEL} />
        )}
      </div>
    </div>
  );
};

export default Pending;
