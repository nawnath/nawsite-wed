/* tslint:disable */
import * as React from 'react';
import {setCookie} from './credentials/access_credentials';
import { Redirect } from 'react-router-dom' 

import { connect } from "react-redux";
import { fetchUser } from "./actions/index";


class OAuth2RedirectHandler extends React.Component<any,any> {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    componentDidMount(){
        const token = this.getUrlParameter('token');
        setCookie('Access-Token', token);
        this.props.fetchUser();
    }
    
    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        if(token) {
            debugger;
            return <Redirect to={{
                pathname: "/admin/viewschedules",
                state: { from: this.props.location }
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}
  
export default connect(null, {
    fetchUser,
  })(OAuth2RedirectHandler);
  