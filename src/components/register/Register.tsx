import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import "./Register.scss";
import Button from "./../common/Button/Button";
import TextInput from "../common/TextInput/TextInput";
import MobileInput from "../common/MobileInput/MobileInput";
import { signupUser } from "./../../actions/index";
import PasswordInput from "../common/Password/PasswordInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { toast } from "react-toastify";
import Select from "react-select";

import {
  EMAIL_VALIDATIONS,
  FIRSTNAME_VALIDATIONS,
  LASTNAME_VALIDATIONS,
  PASSWORD_VALIDATIONS,
  MOBILE_VALIDATIONS,
} from "./../../constants";

interface IProps {
  isMobileDevice?: boolean;
  fetchRegInstitute: () => void;
  signupUser: ({
    access_token,
    active,
    email,
    password,
    last_name,
    first_name,
    mobile,
    middle_name,
    imageUrl,
    provider,
    providerId,
    refresh_token,
    roles,
  }) => any;
  registeredInstitute: any;
}
interface IState {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string | number;
  middleName?: string;
  dob?: any;
  showDobError?: boolean;
  admission?: any;
  registeredValue?: any;
  showRegError?: boolean;
}

class ForgotPassword extends React.Component<IProps, IState> {
  private emailInput: React.RefObject<TextInput>;
  private passwordInput: React.RefObject<PasswordInput>;
  private firstnameInput: React.RefObject<TextInput>;
  private lastnameInput: React.RefObject<TextInput>;
  private mobileInput: React.RefObject<MobileInput>;
  private middlenameInput: React.RefObject<TextInput>;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
      middleName: "",
      dob: null,
      showDobError: false,
      showRegError: false,
      registeredValue: {},
    };
    this.emailInput = React.createRef<TextInput>();
    this.passwordInput = React.createRef<PasswordInput>();
    this.firstnameInput = React.createRef<TextInput>();
    this.lastnameInput = React.createRef<TextInput>();
    this.mobileInput = React.createRef<MobileInput>();
    this.middlenameInput = React.createRef<TextInput>();
  }

  componentDidMount() {
  }

  handleFieldChange = (fieldName, e) => {
    const value = e;
    this.setState({
      ...this.state,
      ...{ [fieldName]: value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = this.emailInput.current?.isValid(true);
    const isPasswordValid = this.passwordInput.current?.isValid(true);
    const isFirstNameValid = this.firstnameInput.current?.isValid(true);
    const isLastNameValid = this.lastnameInput.current?.isValid(true);
    const isMobileValid = this.mobileInput.current?.isValid(true);
    const isRegValid = !!this.state.registeredValue.id;
    this.setState({
      ...this.state,
      ...{ showRegError: !this.state.registeredValue.id },
    });
    if (
      isEmailValid &&
      isPasswordValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isMobileValid &&
      isRegValid
    ) {
      const data = {
        access_token: "",
        active: false,
        email: this.emailInput.current?.getValue(),
        password: this.passwordInput.current?.getValue(),
        last_name: this.lastnameInput.current?.getValue(),
        first_name: this.firstnameInput.current?.getValue(),
        mobile: this.mobileInput.current?.getValue(),
        middle_name: this.middlenameInput.current?.getValue() || "",
        imageUrl: "",
        provider: "local",
        providerId: "local",
        refresh_token: "",
        registeredInstitute: {
          id: this.state.registeredValue.id,
        },
        roles: [
          {
            id: 5,
          },
        ],
      };
      this.props.signupUser(data).then((response) => {
        if (response.success) {
          toast.success("Please Verify Registration on your Email", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
          });
        }
      });
    }
  };

  dobChange = (value) => {
    this.setState({
      ...this.state,
      dob: value,
      showDobError: false,
    });
  };

  onCalendarClose = () => {
    this.setState({
      ...this.state,
      showDobError: !this.state.dob,
    });
  };

  handleChange = (key) => {
    this.setState({
      ...this.state,
      ...{ registeredValue: key },
    });
  };

  handleFocus = (key) => {
    this.setState({
      ...this.state,
      ...{ showRegError: false },
    });
  };

  handleBlur = async (selectedValue, erroKey) => {
    await setTimeout(async () => {
      const showError = this.state[selectedValue].length === 0;
      await this.setState({
        ...this.state,
        ...{ [erroKey]: showError },
      });
    }, 100);
  };

  renderSignUp = () => {
    return (
      <div>
        <form>
          <div className="selectpackage">
            <label className="package">Select Institute : </label>
            <Select
              options={this.props.registeredInstitute}
              getOptionValue={(option) => option.name}
              getOptionLabel={(option) => option.name}
              value={this.state.registeredValue}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={() => this.handleBlur("registeredValue", "showRegError")}
              valueContainer={"valueContainer"}
            />
            {this.state.showRegError ? (
              <div className={"error-label"}>Please Select Institute</div>
            ) : null}
          </div>

          <TextInput
            ref={this.firstnameInput}
            customClass={"name-input"}
            validations={FIRSTNAME_VALIDATIONS}
            label={"FirstName"}
            value={this.state.firstName}
            onChange={(e) => this.handleFieldChange("firstName", e)}
            showLabel={true}
          />
          <TextInput
            ref={this.middlenameInput}
            customClass={"name-input"}
            label={"MiddleName"}
            value={this.state.middleName}
            onChange={(e) => this.handleFieldChange("middleName", e)}
            showLabel={true}
          />
          <TextInput
            ref={this.lastnameInput}
            customClass={"name-input"}
            validations={LASTNAME_VALIDATIONS}
            label={"LastName"}
            value={this.state.lastName}
            onChange={(e) => this.handleFieldChange("lastName", e)}
            showLabel={true}
          />
          <div className="dobwrapper">
            <label> Select Date of Birth: </label>
            <DatePicker
              showPopperArrow={false}
              selected={this.state.dob}
              onChange={this.dobChange}
              onBlur={this.onCalendarClose}
              showYearDropdown={true}
              dateFormatCalendar="MMMM"
              yearDropdownItemNumber={30}
              scrollableYearDropdown={true}
              showMonthDropdown={true}
              dateFormat="dd/MM/yyyy"
              maxDate={addDays(new Date(), 0)}
            />

            {this.state.showDobError ? (
              <p className="error-label"> Please add Date Of Birth</p>
            ) : null}
          </div>
          <TextInput
            ref={this.emailInput}
            customClass={"email-input"}
            validations={EMAIL_VALIDATIONS}
            label={"Email"}
            value={this.state.email}
            onChange={(e) => this.handleFieldChange("email", e)}
            showLabel={true}
          />
          <PasswordInput
            ref={this.passwordInput}
            customClass={"password-input"}
            validations={PASSWORD_VALIDATIONS}
            label={"Password"}
            value={this.state.password}
            onChange={(e) => this.handleFieldChange("password", e)}
            showLabel={true}
          />
          <MobileInput
            ref={this.mobileInput}
            customClass={"mobile-input"}
            validations={MOBILE_VALIDATIONS}
            label={"Phone"}
            value={this.state.mobile}
            onChange={(e) => this.handleFieldChange("mobile", e)}
            showLabel={true}
          />
          <Button
            customClass={"auth-submit"}
            title={"Continue"}
            onClick={this.handleSubmit}
            theme={"lightblue"}
          />
        </form>
      </div>
    );
  };

  render() {
    return (
      <div className={["reg-wrapper"].join(" ")}>
        <div className="reg-container">
          <div className="messagefields">
            <div className="logo">
            <img
                src={require("./../../assets/images/logo.jpg").default}
                style={{ display: "block", width: "80px" }}
              />
            </div>
            <div className="greeting">
              <p className="heading">Welcome ,</p>
              <p className="access">SignUp to continue access</p>
            </div>
          </div>
          <div className="reg-forms">
            <p className="reg-header">Sign Up</p>
            {this.renderSignUp()}
            <div className="sign-up-wrapper">
              <a href="/login">Already a member? Login </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IState) {
  return {
  };
}
export default hot(module)(
  connect(mapStateToProps, {
    signupUser
  })(ForgotPassword)
);
