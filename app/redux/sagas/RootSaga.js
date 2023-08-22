import { all } from "redux-saga/effects";
import employeesSaga from "./EmployeesSaga";
import certificateSaga from "./CertificateSaga";
import familySaga from "./FamilySaga";
import salaryIncreaseSaga from "./SalaryIncreaseSaga";
import processSaga from "./ProcessSaga"
import proposalSaga from "./ProposalSaga"
import leadersSaga from "./LeaderSaga"
export default function* rootSaga() {
  yield all([
    employeesSaga(),
    certificateSaga(),
    familySaga(),
    salaryIncreaseSaga(),
    processSaga(),
    proposalSaga(),
    leadersSaga(),
  ]);
}
