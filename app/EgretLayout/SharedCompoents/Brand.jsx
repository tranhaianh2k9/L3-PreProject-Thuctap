import React, { Component } from "react";
import ConstantList from "../../appConfig";
import { Link } from "react-router-dom";
class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        {/* <div className="flex flex-middle brand">       
          <Link to={ConstantList.HOME_PAGE}>
             <img src= {ConstantList.ROOT_PATH+ "assets/images/logo-paster.png"} alt="company-logo" />         
          </Link>
          <span className="brand__text">PASTEUR EQA</span>
        </div> */}
        <div className="flex flex-middle brand logo-menu">
          <Link to={ConstantList.HOME_PAGE}>
            <span className="brand__text">L3-T10</span>
          </Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default Brand;
