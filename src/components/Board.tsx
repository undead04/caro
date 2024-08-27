import * as React from "react";
import { useState } from "react";
import { IBoard, Move } from "../types";
import globalModel from "../types/model";
import Player from "./Player";
import { PositionMoveWin } from "../utils/loginGame";

interface Prop {
  turn?: boolean;
  handleClick: any;
  historyGame: IBoard;
  row: number;
  col: number;
  isRobot?: boolean;
  arrayMove: Move[];
  isStop: boolean;
}

const Board: React.FC<Prop> = ({
  turn,
  handleClick,
  historyGame,
  row,
  col,
  isRobot,
  arrayMove,
  isStop,
}) => {
  const [hoveredCell, setHoveredCell] = useState<{
    row: number | null;
    col: number | null;
  }>({
    row: null,
    col: null,
  });
  const player = turn ? 1 : 2;
  const handleHoverdCell = (row: number, col: number) => {
    if (historyGame.grid[row][col] === globalModel.EMPTY && !isStop) {
      if (isRobot) {
        player === globalModel.PLAYER_1 && setHoveredCell({ row, col });
      } else {
        setHoveredCell({ row, col });
      }
    }
  };
  return (
    <table
      className="table table-bordered m-0"
      style={{
        width: `${(col - 1) * 30}px`,
        height: `${(row - 1) * 30}px`,
      }}
    >
      <tbody className="">
        {historyGame.grid.map((_, i) => (
          <tr key={i}>
            {historyGame.grid[i].map((_, j) => (
              <td
                onClick={() => handleClick({ row: i, col: j } as Move, player)}
                onMouseEnter={() => handleHoverdCell(i, j)}
                onMouseLeave={() => setHoveredCell({ row: null, col: null })}
                key={j}
                className="p-0 "
                style={{ height: "30px", width: "30px" }}
              >
                {/* Hiển thị quân cờ khi di chuột qua */}
                {hoveredCell.row === i &&
                  hoveredCell.col === j &&
                  historyGame.grid[i][j] === globalModel.EMPTY && (
                    <Player player={player} />
                  )}
                {/* Hiển thị quân cờ đã đánh */}
                {historyGame.grid[i][j] !== globalModel.EMPTY && (
                  <>
                    <Player
                      player={historyGame.grid[i][j]}
                      className="beat-icon"
                      isShow={
                        arrayMove?.length === 0
                          ? false
                          : arrayMove.some(
                              (item) => item.row === i && item.col === j
                            )
                      }
                    />
                  </>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
