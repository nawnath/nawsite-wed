import React from "react";
import { renderRoutes } from "react-router-config";
import { Router } from "react-router-dom";
import { browserHistory } from "./history";
import RoutesMap from "./routerLinks";
import { connect } from "react-redux";
const history = browserHistory;
import { fetchUser } from "./actions/auth_actions";

interface Rprops {
  isLoading?: boolean;
  fetchUser: () => void;
  authenticated: boolean;
}

class Routes extends React.Component<Rprops, any> {
  constructor(props: Rprops) {
    super(props);
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.fetchUser();
    }
  }

  render() {
    return (
      <Router history={history}>
        {/* <Header /> */}
        <div className="routerWrapper">
          {this.props.isLoading ? (
            <div className="loading">
              <div className="spinner" />
            </div>
          ) : null}
          {renderRoutes(RoutesMap as any)}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isLoading: state.common.isLoading,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, {
  fetchUser,
})(Routes);
