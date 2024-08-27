import * as React from "react";
import { useState } from "react";
interface Prop {
  progress: number;
}
const ProgressReact: React.FC<Prop> = ({ progress }) => {
  return (
    <>
      <div
        className="progress"
        role="progressbar"
        aria-label="Example with label"
        aria-valuenow={25}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          Cấp độ
        </div>
      </div>
    </>
  );
};

export default ProgressReact;
