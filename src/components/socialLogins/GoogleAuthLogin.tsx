import * as React from "react";
import { GOOGLE_AUTH_URL } from "./../../services/apiUrls";
import "./social.scss";

interface IProps {
  customClass?: string;
  closeModal?: (response?: any) => void;
}

class GoogleAuthLogin extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  responseFailure = (error) => {};

  responseSuccess = (response) => {
    this.props.closeModal && this.props.closeModal(response);
  };

  render() {
    const { customClass = "" } = this.props;
    return (
      <div className={`${customClass}`}>
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img
            src={require("./../../assets/images/google-logo.png").default}
            alt="Google"
          />{" "}
          <span className="google-text">Log in with Google</span>
        </a>
      </div>
    );
  }
}

export default GoogleAuthLogin;
