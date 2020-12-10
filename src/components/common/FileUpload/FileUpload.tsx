import React from "react";
import Message from "./Message";
import Progress from "./Progress";
import { toast } from "react-toastify";

const mimeTypes = {
  video: {
    types: ["mp4", "mpeg4", "avi", "3gp"],
    message: `${["mp4", "mpeg4", "avi", "3gp"].join(
      ", "
    )} Supported video types`,
  },
  image: {
    types: ["jpg", "png", "jpeg"],
    message: `${["jpg", "png", "jpeg"].join(", ")} Supported image types`,
  },
};
const FileUpload = React.forwardRef((props: any, ref) => {
  const onChange = (e) => {
    const type = e.target.files[0].type;
    const ext = type.split("/")[1];
    const supportedTypes = mimeTypes[props.fileType || "video"];
    if (supportedTypes.types.indexOf(ext) > -1) {
      props.setFiles(e.target.files);
    } else {
      props.setFiles(null);
      toast.error(supportedTypes.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  };

  const { message = "", uploadPercentage = 0, fileName = "" } = props;
  return (
    <div>
      {message ? <Message msg={message} /> : null}
      <div className="custom-file mb-4">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          onChange={onChange}
        />
        <label className="custom-file-label" htmlFor="customFile">
          {fileName}
        </label>
      </div>

      {!props.hideProgress ? <Progress percentage={uploadPercentage} /> : null}

      {/* {fileName && !props.hideProgress ? (
        <div className="row">
          <div className="col-md-6 m-auto">
            <h5 className="text-center">{fileName}</h5>
            <img style={{ width: "100%" }} src={filePath} alt="" />
          </div>
        </div>
      ) : null} */}
    </div>
  );
});

export default FileUpload;
