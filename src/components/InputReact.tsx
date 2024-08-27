import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from "react";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

interface Props extends DetailedHTMLProps<InputAttributes, HTMLInputElement> {
  label?: string;
  name: string;
  message?: string;
  information?: string;
  col?: number;
  label2?: string;
}
const Input: FC<Props> = ({
  label,
  name,
  message = "",
  information,
  label2,
  col,
  ...other
}): ReactElement => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div className="form-group">
        {label && (
          <>
            <label className="form-label fw-semibold fs-5 ">{label}</label>{" "}
            {information && (
              <div
                className="position-relative d-inline"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <i className="fa-solid fa-circle-question fs-5"></i>
                {isHovered && (
                  <div
                    className="position-absolute bg-dark border rounded-2 p-2 bg-gradient text-light top-100 start-100 translate-middle-x"
                    style={{ width: "200px" }}
                  >
                    {information}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        <div className="row align-items-center">
          <div className={`col-${col}`}>
            <input
              {...other}
              name={name}
              className="form-control bg-transparent text-primary"
            />
          </div>
          {label2 && <div className="col-auto">{label2}</div>}
        </div>
      </div>
    </>
  );
};

export default Input;
