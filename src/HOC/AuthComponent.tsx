import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "./../history";

export default function (ComposedComponent) {
  class Authentication extends Component<any, any> {
    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        browserHistory.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
