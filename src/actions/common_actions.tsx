export function showLoader(type) {
  return (dispatch) => {
    dispatch({
      type,
      payload: true,
    });
  };
}

export function hideLoader(type) {
  return (dispatch) => {
    dispatch({
      type,
      payload: false,
    });
  };
}
