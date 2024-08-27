import { FC } from "react";
interface Prop {
  data: any;
  title: string;
  labelClose?: string;
  labelSave?: string;
  handleSave?: () => void;
  handleClose?: () => void;
  show: boolean;
  size?: string;
  isDisabledButton?: boolean;
  isDisabledCloseButton?: boolean;
  height?: string;
}
const ModalReact: FC<Prop> = ({
  data,
  title,
  labelClose,
  labelSave,
  handleClose,
  handleSave,
  show,
  size,
  isDisabledButton,
  isDisabledCloseButton,
  height,
}) => {
  return (
    <div
      className={`modal ${show ? "show" : ""} ${size}`}
      tabIndex={-1}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content" style={{ height: height }}>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">{data}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              hidden={isDisabledCloseButton}
            >
              {labelClose}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              hidden={isDisabledButton}
              onClick={handleSave}
            >
              {labelSave}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReact;
