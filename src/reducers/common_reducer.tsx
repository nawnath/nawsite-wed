import { SHOW_LOADER, HIDE_LOADER } from "../actions/types";

export default function (
  state = {
    isMobile: false,
    isBot: false,
    isLoading: false,
  },
  action: any
) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, isLoading: true };
    case HIDE_LOADER:
      return { ...state, isLoading: false };
    default:
      return { ...state };
  }
}
