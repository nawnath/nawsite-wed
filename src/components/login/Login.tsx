import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import "./Login.scss";
import Button from "./../common/Button/Button";
import TextInput from "../common/TextInput/TextInput";
import PasswordInput from "../common/Password/PasswordInput";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import GoogleAuthLogin from "../socialLogins/GoogleAuthLogin";
import {
  signinUser,
  otpLogin,
  verifyOtp,
  verifyUser,
} from "./../../actions/index";
import {
  EMAIL_VALIDATIONS,
  PASSWORD_VALIDATIONS,
} from "./../../constants";
import { browserHistory } from "../../history";
import { parseQueryParams } from "../../utils/TransitionUtils";

interface IState {
  email?: string;
  password?: string;
  mobile?: string | number;
  showOtpLogin?: boolean;
  loginType?: string;
  showOTP?: boolean;
  otp: string;
}

class Login extends React.Component<any, IState> {
  private emailInput: React.RefObject<TextInput>;
  private passwordInput: React.RefObject<PasswordInput>;
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      mobile: "",
      showOtpLogin: false,
      loginType: "",
      showOTP: false,
      otp: "",
    };
    this.emailInput = React.createRef<TextInput>();
    this.passwordInput = React.createRef<PasswordInput>();
  }

  componentDidMount() {
    const ParsedValues = parseQueryParams(this.props.location.search);
    const value = ParsedValues["verify_user"];
    if (value) {
      this.props.verifyUser({ id: value }).then((response) => {
        if (response.success) {
          toast.success("Login to Continue", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
          });
        }
      });
    }
  }
  handleFieldChange = (fieldName, e) => {
    const value = e;
    this.setState({
      ...this.state,
      ...{ [fieldName]: value },
    });
  };

  edit = () => {
    this.setState({
      ...this.state,
      showOtpLogin: true,
      showOTP: false,
    });
  };

  showOTPField = () => {
    if (this.emailInput.current?.isValid(true)) {
      const email = this.emailInput.current?.getValue();
      this.props.otpLogin({ email }).then((response) => {
        if (response.success) {
          toast.success("Check Your Email", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
          });
          this.setState({
            ...this.state,
            showOTP: !this.state.showOTP,
          });
        }
      });
    }
  };

  handleOTPChange = (otp) =>
    this.setState({
      ...this.state,
      otp,
    });

  renderSocialLogins = () => {
    return (
      <div className="social-wrapper">
        <GoogleAuthLogin customClass={"gplus"} />
      </div>
    );
  };

  renderOtpLogin = () => {
    return (
      <div>
        {!this.state.showOTP ? (
          <TextInput
            name={"otp-email"}
            ref={this.emailInput}
            customClass={"email-input"}
            validations={EMAIL_VALIDATIONS}
            label={"Email"}
            value={this.state.email}
            onChange={(e) => this.handleFieldChange("email", e)}
            showLabel={true}
          />
        ) : null}
        {this.state.showOTP ? (
          <div style={{ position: "relative", fontSize: "12px" }}>
            <label> Enter OTP : </label>
            <label className="edit-mobile" onClick={this.edit}>
              <span> {this.state.mobile} </span> Edit
            </label>
            <OtpInput
              onChange={this.handleOTPChange}
              numInputs={6}
              separator={<span>-</span>}
              containerStyle={"otpcontainerStyle"}
              inputStyle={"otpinputStyle"}
              focusStyle={"otpfocusStyle"}
              errorStyle={"otperrorStyle"}
              isInputNum={true}
              value={this.state.otp}
            />
          </div>
        ) : null}
        <div className="link-wrapper">
          <a href="/forgotpassword">Forgot Password?</a>
        </div>
        <Button
          name={"otp-submit"}
          customClass={"auth-submit"}
          title={this.state.showOTP ? "Login" : "Continue"}
          onClick={
            !this.state.showOtpLogin ||
            (this.state.showOTP && this.state.showOtpLogin && this.state.otp)
              ? this.handleSubmit
              : this.showOTPField
          }
          theme={"lightblue"}
        />
        <p className="otp-text" onClick={this.toggleLogin}>
          <span>Login via Email</span>
        </p>
      </div>
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.showOTP && this.state.showOtpLogin && this.state.otp) {
      const email = this.state.email;
      const otp = this.state.otp;
      this.props.verifyOtp({ email, otp }).then((response) => {
        if (response.success) {
          toast.success("Logged In Successfully", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
          });
          browserHistory.push("/admin/viewschedules");
        }
      });
    } else {
      if (
        this.emailInput.current?.isValid(true) &&
        this.passwordInput.current?.isValid(true)
      ) {
        const email = this.emailInput.current?.getValue();
        const password = this.passwordInput.current?.getValue();
        this.props.signinUser({ email, password }).then((response) => {
          if (response.success) {
            toast.success("Logged In Successfully", {
              position: "top-right",
              autoClose: 3000,
              closeOnClick: true,
            });
            browserHistory.push("/admin/viewschedules");
          }
        });
      }
    }
  };

  toggleLogin = () => {
    this.setState({
      ...this.state,
      showOtpLogin: !this.state.showOtpLogin,
    });
  };
  renderLogin = () => {
    return (
      <div>
        <form>
          <TextInput
            ref={this.emailInput}
            customClass={"email-input"}
            validations={EMAIL_VALIDATIONS}
            label={"Email"}
            value={this.state.email}
            onChange={(e) => this.handleFieldChange("email", e)}
            showLabel={true}
            name={"email"}
          />
          <PasswordInput
            ref={this.passwordInput}
            customClass={"password-input"}
            validations={PASSWORD_VALIDATIONS}
            label={"Password"}
            value={this.state.password}
            onChange={(e) => this.handleFieldChange("password", e)}
            showLabel={true}
            name={"password"}
          />
          <div className="link-wrapper">
            <a href="/forgotpassword">Forgot Password?</a>
          </div>
          <Button
            name={"email-submit"}
            customClass={"auth-submit"}
            title={"Continue"}
            onClick={this.handleSubmit}
            theme={"lightblue"}
          />
        </form>
        <p className="otp-text">
          <span onClick={this.toggleLogin}>Login via OTP</span>
        </p>
      </div>
    );
  };

  render() {
    return (
      <div className={["auths-wrapper"].join(" ")}>
        <div className="auths-container">
          <div className="messagefields">
            <div className="logo">
              <img
                src={require("./../../assets/images/logo.jpg").default}
                style={{ display: "block", width: "80px" }}
              />
            </div>
            <div className="greeting">
              <p className="heading">Welcome ,</p>
              <p className="access">Login to continue access</p>
            </div>
          </div>
          <div className="auth-forms">
            <p className="login-header">Login</p>
            {!this.state.showOtpLogin
              ? this.renderLogin()
              : this.renderOtpLogin()}
            <p className="or">or Connect with Social Media</p>
            {this.renderSocialLogins()}
            <div className="sign-up-wrapper">
              <a href="/signup">Register</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(
  connect(null, {
    signinUser,
    otpLogin,
    verifyOtp,
    verifyUser,
  })(Login)
);
