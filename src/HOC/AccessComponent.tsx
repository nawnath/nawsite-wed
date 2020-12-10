import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "./../history";
import { isPageAccessible } from "../credentials/access_credentials";

export default function (ComposedComponent) {
  class Authorisation extends Component<any, any> {
    componentWillMount() {
      if (this.props.route && this.props.route.routeName) {
        const isAccessible = isPageAccessible(this.props.route.routeName);
        if (!isAccessible) {
          browserHistory.push(
            "/notauthorised?requested_route=" + this.props.route.routeName
          );
        }
      }
    }

    componentWillUpdate(nextProps) {
      if (this.props.route && this.props.route.routeName) {
        const isAccessible = isPageAccessible(this.props.route.routeName);
        if (!isAccessible) {
          browserHistory.push(
            "/notauthorised?requested_route=" + this.props.route.routeName
          );
        }
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authorisation);
}
