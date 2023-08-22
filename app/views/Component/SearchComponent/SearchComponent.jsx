import React from "react";
import {
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
const useStyles = makeStyles({
  widthStyle: {
    width: "300px",
  },
  TextFieldSearch: {
    width: "300px",
    marginLeft: "auto",
  },
});
const SearchComponent = ({ keywords, setKeywords }) => {
  const classes = useStyles();
  return (
    <Grid className="input-search  mt-16 mb-16 ">
      <div>
        <TextField
          name="fullName"
          label="Tìm kiếm"
          value={keywords}
          onChange={(e) => {
            setKeywords(e.target.value);
          }}
          className={classes.TextFieldSearch}
        />
      </div>
    </Grid>
  );
};

export default SearchComponent;
