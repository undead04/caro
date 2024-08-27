import * as React from "react";
import { useState } from "react";
import globalModel from "../types/model";
import Star from "./Star";
interface Prop {
  player: number;
  className?: string;
  height?: string;
  width?: string;
  isShow?: boolean;
}
const Player: React.FC<Prop> = ({
  player,
  className,
  height,
  width,
  isShow,
}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className={`${className} position-relative`}
        height={height}
        width={width}
      >
        {/*!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
        <path
          fill={player === globalModel.PLAYER_1 ? "#63E6BE" : "#74C0FC"}
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
        />
        {isShow && (
          <g transform="translate(256, 256)">
            <Star />
          </g>
        )}
      </svg>
    </>
  );
};

export default Player;
