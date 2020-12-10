import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import "./App.scss";
import Header from "../header/Header";

interface IProps {}

interface IState {}

class App extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div>I am App Component</div>
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default hot(module)(
  connect(mapStateToProps, {
  })(App)
);
