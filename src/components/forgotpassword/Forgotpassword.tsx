import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import "./Forgotpassword.scss";
import Button from "./../common/Button/Button";
import TextInput from "../common/TextInput/TextInput";
import { toast } from "react-toastify";
import { forgotpassword } from "./../../actions/index";
import { EMAIL_VALIDATIONS } from "./../../constants";
import { browserHistory } from "../../history";

interface IState {
  email?: string;
}

class ForgotPassword extends React.Component<any, IState> {
  private emailInput: React.RefObject<TextInput>;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.emailInput = React.createRef<TextInput>();
  }

  handleFieldChange = (fieldName, e) => {
    const value = e;
    this.setState({
      ...this.state,
      ...{ [fieldName]: value },
    });
  };

  handleSubmit = () => {
    if (this.emailInput.current?.isValid(true)) {
      const email = this.emailInput.current?.getValue();
      this.props.forgotpassword({ email }).then((response) => {
        if (response.success) {
          toast.success("Check Your Email", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
          });
        }
        browserHistory.push("/login");
      });
    }
  };

  renderForgotPassword = () => {
    return (
      <div>
        <TextInput
          ref={this.emailInput}
          customClass={"email-input"}
          validations={EMAIL_VALIDATIONS}
          label={"Email"}
          value={this.state.email}
          onChange={(e) => this.handleFieldChange("email", e)}
          showLabel={true}
        />
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
      <div className={["fp-wrapper"].join(" ")}>
        <div className="fp-container">
          <div className="messagefields">
            <div className="logo">
              <img
                src={require("./../../assets/images/logo_new.png").default}
                style={{ display: "block", width: "210px" }}
              />
            </div>
            <div className="greeting">
              <p className="heading">Welcome ,</p>
              <p className="access">Enter email to proceed </p>
            </div>
          </div>
          <div className="fp-forms">
            <p className="fp-header">Forgot password</p>
            {this.renderForgotPassword()}
            <div className="sign-up-wrapper">
              <a href="/login">Already a member? Login </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(
  connect(null, {
    forgotpassword,
  })(ForgotPassword)
);
