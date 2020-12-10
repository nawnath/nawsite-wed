export const ADMIN_URL = "api/";
export const API_URL =
  process.env.NODE_ENV !== "production"
    ? "https://edu.brainwave.org.in/api/"
    : "https://edu.brainwave.org.in/api/";
export const AUTHENTICATION_URL = "/authentication";

export const OAUTH2_REDIRECT_URI =
  "https://class.brainwave.org.in/oauth2/redirect";

export const GOOGLE_AUTH_URL =
  API_URL + "oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;

export const URL = "https://edu.brainwave.org.in";
