import * as React from "react";
import { useState } from "react";
type SelectAttributes = React.SelectHTMLAttributes<HTMLSelectElement>;
interface Prop
  extends React.DetailedHTMLProps<SelectAttributes, HTMLSelectElement> {
  data: { lable: string; value: number | string }[];
  label: string;
  information?: string;
}
const SelectReact: React.FC<Prop> = ({
  data,
  label,
  information,
  ...other
}) => {
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
        <div className="flex-grow-1">
          <select {...other} className="form-select">
            {data.map((item, index) => (
              <option value={item.value} key={index}>
                {item.lable}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default SelectReact;
