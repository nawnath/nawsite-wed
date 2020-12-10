import Login from "./components/login/Login";
import App from "./components/app/App";
import Register from "./components/register/Register";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import Forgotpassword from "./components/forgotpassword/Forgotpassword";
import Changepassword from "./components/changepassword/Changepassword";
import NotFound from "./components/notFound/NotFound";
import NotAuthorized from "./components/notauthorised/NotAuthorised";
import AuthComponent from './HOC/AuthComponent';

export default [
  {
    component: AuthComponent(App),
    routeName: "home",
    path: "/",
    exact: true,
  },
  {
    component: OAuth2RedirectHandler,
    routeName: "oauth",
    path: "/oauth2/redirect",
  },
  {
    component: Login,
    routeName: "login",
    path: "/login",
  },
  {
    component: Forgotpassword,
    routeName: "forgotpassword",
    path: "/forgotpassword",
  },
  {
    component: Changepassword,
    routeName: "resetPassword",
    path: "/resetPassword",
  },
  {
    component: Register,
    routeName: "signup",
    path: "/signup",
  },
  {
    component: NotAuthorized,
    routeName: "no_access",
    path: "/notauthorised",
  },
  {
    component: NotFound,
    routeName: "pagenotfound",
    path: "*",
  },
];
