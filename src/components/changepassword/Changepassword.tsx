import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import "./changepassword.scss";
import Button from "./../common/Button/Button";
import PasswordInput from "../common/Password/PasswordInput";
import { toast } from "react-toastify";
import { browserHistory } from "../../history";
import { parseQueryParams } from "./../../utils/TransitionUtils";
import { resetpassword } from "../../actions/index";
import { PASSWORD_VALIDATIONS } from "./../../constants";

interface IProps {
  resetpassword: ({ email, newPassword }) => any;
  location: any;
}
interface IState {
  password?: string;
  confirmpassword?: string;
  showpasswordMatchError?: boolean;
}

class ChangePassword extends React.Component<IProps, IState> {
  private passwordInput: React.RefObject<PasswordInput>;
  private cppasswordInput: React.RefObject<PasswordInput>;
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmpassword: "",
      showpasswordMatchError: false,
    };
    this.passwordInput = React.createRef<PasswordInput>();
    this.cppasswordInput = React.createRef<PasswordInput>();
    console.log(parseQueryParams(this.props.location.search));
  }

  handleFieldChange = (fieldName, e) => {
    const value = e;
    this.setState({
      ...this.state,
      ...{ [fieldName]: value },
    });
  };

  handleSubmit = () => {
    const password = this.passwordInput.current?.isValid(true);
    const cppassword = this.cppasswordInput.current?.isValid(true);
    const newPassword = this.passwordInput.current?.getValue();
    const cpvalue = this.cppasswordInput.current?.getValue();
    if (newPassword !== cpvalue) {
      this.setState({
        ...this.state,
        ...{ showpasswordMatchError: true },
      });
    }
    if (password && cppassword && newPassword === cpvalue) {
      const data: { email?: string } = parseQueryParams(
        this.props.location.search
      );
      data.email &&
        this.props
          .resetpassword({ email: data.email, newPassword })
          .then((response) => {
            if (response.success) {
              toast.success("Login With Your Email", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
              });
            }
          });
      browserHistory.push("/login");
    }
  };

  removeMismatchError = () => {
    this.setState({
      ...this.state,
      ...{ showpasswordMatchError: false },
    });
  };

  renderChangePassword = () => {
    return (
      <div>
        <PasswordInput
          ref={this.passwordInput}
          customClass={"password-input"}
          validations={PASSWORD_VALIDATIONS}
          label={"New Password"}
          value={this.state.password}
          onChange={(e) => this.handleFieldChange("password", e)}
          showLabel={true}
        />
        <PasswordInput
          ref={this.cppasswordInput}
          customClass={"password-input"}
          validations={PASSWORD_VALIDATIONS}
          label={"Confirm Password"}
          value={this.state.confirmpassword}
          onChange={(e) => this.handleFieldChange("confirmpassword", e)}
          onFocus={this.removeMismatchError}
          showLabel={true}
        />
        <p className="error-label">
          {this.state.showpasswordMatchError ? "Password Didn't Match" : null}
        </p>
        <Button
          customClass={"auth-submit"}
          title={"Continue"}
          onClick={this.handleSubmit}
          theme={"lightblue"}
        />
      </div>
    );
  };

  render() {
    return (
      <div className={["cp-wrapper"].join(" ")}>
        <div className="cp-container">
          <div className="messagefields">
            <div className="logo">
              <img
                src={require("./../../assets/images/logo_new.png").default}
                style={{ display: "block", width: "210px" }}
              />
            </div>
            <div className="greeting">
              <p className="heading">Welcome ,</p>
              <p className="access">Type your new password</p>
            </div>
          </div>
          <div className="cp-forms">
            <p className="cp-header">Reset Password</p>
            {this.renderChangePassword()}
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(
  connect(null, {
    resetpassword,
  })(ChangePassword)
);
