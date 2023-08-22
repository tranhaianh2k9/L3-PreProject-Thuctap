import { ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";

ValidatorForm.addValidationRule("isAfterOrEqualToToday", (value) => {
  if (!value) {
    return true;
  }
  const selectedDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
});

ValidatorForm.addValidationRule("equalEighteenYearsAgo", (value) => {
  if (!value) {
    return true;
  }
  const currentDate = moment();
  const eighteenYearsAgo = currentDate.subtract(18, "years");
  const selectedDate = moment(value, "YYYY-MM-DD");
  return selectedDate.isSameOrBefore(eighteenYearsAgo, "day");
});


export function isAfterOrEqualToToday(inputDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const input = new Date(inputDate);
  return input.getTime() >= today.getTime();
}