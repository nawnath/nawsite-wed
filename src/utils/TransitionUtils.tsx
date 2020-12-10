export const parseQueryParams = (url: string) => {
  const values = {};
  const data = url && url.trim();
  if (url !== "") {
    const qp = data.substring(1, data.length);
    const qparams = qp.split("&");

    qparams.forEach((param) => {
      const temp = param.split("=");
      values[temp[0]] = temp[1];
    });
  }
  return values;
};
