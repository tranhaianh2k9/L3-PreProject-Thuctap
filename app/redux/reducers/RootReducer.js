import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import EmployeesReducer from "./EmployeesReducer";
import CertificateReducer from "./CertificateReducer";
import SalaryIncreaseReducer from "./SalaryIncreaseReduce";
import ProcessReducer from "./ProcessReducer";
import ProposalReducer from "./ProposalReduce";
import FamilyReducer from "./FamilyReducer";
import LeaderReducer from "./LeaderReducer";
const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  employees: EmployeesReducer,
  salary : SalaryIncreaseReducer,
  certificates: CertificateReducer,
  process : ProcessReducer,
  proposal : ProposalReducer,
  family: FamilyReducer,
  leaders: LeaderReducer,
});

export default RootReducer;
