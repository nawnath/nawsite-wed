import * as React from "react";
import "./sideBar.scss";

interface Iprops {
  onClose: () => void;
  isOpen?: boolean;
  handleLogout: () => void;
  authenticated?: boolean;
  firstName?: string;
}

class SideBar extends React.Component<Iprops, any> {
  constructor(props) {
    super(props);
    this.state = {
      dropdownType: null,
    };
  }

  toggleMenu = (type: string) => {
    let data: string | null = type;
    if (type === this.state.dropdownType) {
      data = null;
    }
    this.setState({
      ...this.state,
      dropdownType: data,
    });
  };

  render() {
    return (
      <div
        className={[
          "sidebar-container ",
          this.props.isOpen ? "active" : null,
        ].join(" ")}
      >
        <div onClick={this.props.onClose}>
          <i className="icon_close" />
        </div>
        <div className="top-section">
          <a className="logo">
            Welcome {this.props.authenticated ? this.props.firstName : null}
          </a>
        </div>
        <div className="main-menu">
          <ul>
            <li>
              {this.state.dropdownType === "all" ? (
                <div className="sub-menu-1">
                  <ul>
                    <li className="sub-menu-item">
                      <a href="#">Class 8</a>
                    </li>
                    <li className="sub-menu-item">
                      <a href="#">Class 9</a>
                    </li>
                    <li className="sub-menu-item">
                      <a href="#">Class 10</a>
                    </li>
                    <li className="sub-menu-item">
                      <a href="#">Class 11 </a>
                    </li>
                    <li className="sub-menu-item">
                      <a href="#">Class 12</a>
                    </li>
                    <li className="sub-menu-item">
                      <a href="#">State Board</a>
                    </li>
                    <li className="sub-menu-item">
                      <a href="#">Cbse Board</a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </li>
            {this.props.authenticated ? (
              <li className="logout" onClick={this.props.handleLogout}>
                <span className="menu-item span-tag">
                  <span>Logout</span>
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
