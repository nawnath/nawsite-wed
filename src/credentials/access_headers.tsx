import { JSON_CONTENT_TYPE } from "./../constants";
import { getAccessToken } from "./access_credentials";

export function GetHeaders() {
  const config = {
    headers: {
      "content-Type": JSON_CONTENT_TYPE,
    },
  };
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + getAccessToken();
  }
  return config;
}
