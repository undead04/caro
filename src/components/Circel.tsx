import * as React from "react";
import { useState } from "react";
interface Prop {
  className: string;
  second: string;
}
const Circel: React.FC<Prop> = ({ className, second = "5s" }) => {
  return (
    <>
      <svg
        className={`progress-svg ${className}`}
        width={40}
        height={40}
        viewBox="0 0 36 36"
      >
        <path
          className="progress-bg"
          stroke="#ddd"
          strokeWidth="3.8"
          fill="none"
          d="M18 2.0845
   a 15.9155 15.9155 0 0 1 0 31.831
   a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="progress"
          stroke="#4caf50"
          strokeWidth="3.8"
          strokeDasharray="100, 100"
          strokeLinecap="round"
          fill="none"
          d="M18 2.0845
   a 15.9155 15.9155 0 0 1 0 31.831
   a 15.9155 15.9155 0 0 1 0 -31.831"
          style={{
            animationDuration: second === `${Infinity}` ? "infinite" : second,
          }}
        />
      </svg>
    </>
  );
};

export default Circel;
