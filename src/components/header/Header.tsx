import * as React from "react";
import { connect } from "react-redux";
import "./header.scss";
import SideBar from "./../sideBar/sideBar";
import { browserHistory } from "./../../history";
import { signoutUser } from "./../../actions/index";

class Header extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      open: false,
      showSearch: false,
      showAuth: false,
      showInquiry: false,
      loginMenu: false,
    };
  }

  handleLogout = () => {
    this.props.signoutUser();
  };

  handleSearch = (event) => {
    const showSearch = event.length > 2;

    this.setState({
      ...this.state,
      name: event,
      showSearch,
    });
  };

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  blur = () => {
    this.setState({
      ...this.state,
      showSearch: false,
    });
  };

  focus = () => {
    this.setState({
      ...this.state,
      showSearch: true,
    });
  };

  toggleAuth = () => {
    !this.props.authenticated &&
      this.setState({
        ...this.state,
        showAuth: !this.state.showSearch,
      });
  };

  closeAuthComponent = () => {
    this.setState({
      showAuth: false,
    });
  };

  closeInquiryComponent = () => {
    this.setState({
      showInquiry: false,
    });
  };

  handleRoute(offset) {
    browserHistory.push("/");
    setTimeout(() => {
      window.scrollTo(0, offset);
    }, 0);
  }

  handleClick = (e) => {
    this.setState({
      ...this.state,
      showInquiry: !this.state.showInquiry,
    });
  };

  showMenu = () => {
    this.setState({
      ...this.state,
      loginMenu: !this.state.loginMenu,
    });
  };
  render() {
    // console.log();
    // const domainUrl =
    //   process.env.NODE_ENV === "production"
    //     ? redirectDomainName
    //     : "http://dev.local.com:8082";
    return (
      <div style={{ borderBottom: "1px solid #f2f3f3" }}>
        <div className="header-wrapper container">
          <div className="header-container row colored">
            <div className="col-sm-10 logo">
              <div className="mobile-ham" onClick={this.toggleDrawer}>
                <i className="icon_menu" />
              </div>
              <a
                href="/admin/viewschedules"
                title="Brain Wave"
                className="logo-link"
              >
                <img
                  src={require("./../../assets/images/logo_new.png").default}
                  alt="Brain Wave"
                />
              </a>
              <div className="menu-item nav-links d-none d-sm-block">
                <ul className="nav-item">
                  {/* <li>
                    <a className="menu-item" href="/">
                      <span className="content">
                        Study Materials <i className="icon_down_solid" />{" "}
                      </span>
                    </a>
                    <div className="sub-menu-1">
                      <ul>
                        <li>Class 8</li>
                        <li>Class 9</li>
                        <li>Class 10</li>
                        <li>Class 11</li>
                        <li>Class 12</li>
                        <li>State Board</li>
                        <li>Cbse Board</li>
                      </ul>
                    </div>
                  </li> */}
                  {/* <li>
                    <a className="menu-item" href="/livefreeclass">
                      <span className="content">Free Live Classes</span>
                    </a>
                  </li> */}
                  {/* <li>
                    <a className="menu-item" href="/">
                      <span className="content">
                        Courses <i className="icon_down_solid" />
                      </span>
                    </a>
                    <div className="sub-menu-1">
                      <ul>
                        <li onClick={() => this.handleRoute(400)}>
                          <a href="#collegesection">JEE Main</a>
                        </li>
                        <li onClick={() => this.handleRoute(400)}>
                          <a href="#collegesection">JEE Advance</a>
                        </li>
                        <li onClick={() => this.handleRoute(400)}>
                          <a href="#collegesection">NEET UG</a>
                        </li>
                        <li onClick={() => this.handleRoute(400)}>
                          <a href="#collegesection">NATA JEE (PART 2)</a>
                        </li>
                        <li onClick={() => this.handleRoute(1200)}>
                          <a href="#schoolsection">Class 8</a>
                        </li>
                        <li onClick={() => this.handleRoute(1200)}>
                          <a href="#schoolsection">Class 9</a>
                        </li>
                        <li onClick={() => this.handleRoute(1200)}>
                          <a href="#schoolsection">Class 10</a>
                        </li>
                        <li onClick={() => this.handleRoute(1200)}>
                          <a href="#schoolsection">Class 11</a>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                  {/* <li>
                    <a className="menu-item" href="/about">
                      <span className="content">About Us</span>
                    </a>
                  </li> */}
                  {/* <li>
                    <span className="menu-item" onClick={this.handleClick}>
                      <span className="content">Enquiry</span>
                    </span>
                  </li> */}
                  {/* <li>
                    <a className="menu-item" href="/admission">
                      <span className="content">Admission</span>
                    </a>
                  </li> */}
                  {/* <li>
                    <a className="menu-item" href="/contact">
                      <span className="content">Contact Us</span>
                    </a>
                  </li> */}
                </ul>
              </div>
              <div
                className="mobile-login col-sm-6 d-sm-none d-block"
                onClick={this.toggleAuth}
              >
                <div className="elem-mob" onClick={this.showMenu}>
                  {/* <div className="login"> */}
                  {/* {this.state.authenticated && this.state.loginMenu ? (
                      <>
                        <div className="caret-login" />
                        <div className="user-section">
                          <ul>
                            <li>Logout</li>
                          </ul>
                        </div>
                      </>
                    ) : null} */}
                  {/* <div className="text">
                      <span>
                        {this.props.authenticated ? this.props.firstName : ""}
                      </span>
                    </div> */}
                  {/* {this.props.authenticated && this.props.image ? (
                      <img style={{ height: "35px" }} src={this.props.image} />
                    ) : null} */}
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="col-sm-2 cta " onClick={this.toggleAuth}>
              <div className="elem">
                <div className="text">
                  <span>
                    {/* {this.props.authenticated ? `Hi, ${this.props.firstName}` : ""} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideBar
          onClose={this.toggleDrawer}
          isOpen={this.state.open}
          handleLogout={this.handleLogout}
          authenticated={this.props.authenticated}
          firstName={this.props.firstName}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    firstName: state.auth.first_name,
    image: state.auth.imageUrl,
  };
}

export default connect(mapStateToProps, {
  signoutUser,
})(Header);
