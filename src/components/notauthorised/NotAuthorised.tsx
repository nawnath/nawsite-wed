import * as React from "react";
import Header from "../header/Header";
import "./NotAuthorised.scss";
const NoAccess = () => {
  return (
    <div>
      <div className="no-access-wrapper">
        <Header />
        <div className="no-image">
          <img
            src={require("./../../assets/images/403_forbidden-new.jpg").default}
            alt="fobidden"
          />
        </div>
      </div>
    </div>
  );
};

export default NoAccess;
