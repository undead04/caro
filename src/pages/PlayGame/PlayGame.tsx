import React, { useState, useEffect } from "react";
import Board from "../../components/Board";
import level from "../../assets/level.svg";
import {
  aiMove,
  checkPossibleMove,
  checkWin,
  PositionMoveWin,
} from "../../utils/loginGame";
import ProgressReact from "../../components/ProgressReact";
import avatar1 from "../../assets/avatar1.jpg";
import avatar2 from "../../assets/avatar2.jpg";
import Circel from "../../components/Circel";
import ModalReact from "../../components/ModalReact";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../reudx/store";
import { IBoard, Move, settingGameState } from "../../types";
import LoadingReact from "../../components/LoadingReact";
import { changeTime } from "../../utils/changeTime";
import globalModel from "../../types/model";
import Player from "../../components/Player";
interface Prop {
  isRobot: boolean;
}
const PlayGame: React.FC<Prop> = ({ isRobot }) => {
  const row = 20;
  const col = 20;
  const settingGame: settingGameState = useSelector(
    (state: RootState) => state.setting
  );
  const [score, setScore] = useState([0, 0]);
  const [turnYour, setTurnYour] = useState(true);
  const [Show, setShow] = useState(false);
  const [stop, setStop] = useState(false);
  const navigate = useNavigate();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [historyGame, setHistoryGame] = useState<IBoard>({
    grid: Array.from({ length: row }, () =>
      Array.from({ length: col }, () => 0)
    ),
  });
  const [arrayMove, setArrayMove] = useState<Move[]>([]);
  const [playerWin, setPlayerWin] = useState<number>();
  const [isWin, setIsWin] = useState(false);
  const [timePeople1, setTimePeople1] = useState<number>(
    settingGame.timePeople * 60
  );
  const [timePeopel2, setTimePeople2] = useState<number>(
    settingGame.timePeople * 60
  );
  const [timeTurn, setTimeTurn] = useState(settingGame.timeTurn);
  const [loading, setLoading] = useState(true);
  const handleRadomTurn = () => {
    const random = Math.random() * 10;
    if (random > 5) {
      setTurnYour(false);
    } else {
      setTurnYour(true);
    }
  };
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    if (settingGame.start === 1 && score[0] === 0 && score[1] === 0) {
      setTurnYour(true);
    } else if (settingGame.start === 2 && score[0] === 0 && score[1] === 0) {
      setTurnYour(false);
    } else {
      handleRadomTurn();
    }
    setHistoryGame({
      grid: Array.from({ length: row }, () =>
        Array.from({ length: col }, () => 0)
      ),
    });
    setLoading(false);
  };
  // code loading
  useEffect(() => {
    if (isWin) {
      setTimePeople1(settingGame.timePeople * 60);
      setTimePeople2(settingGame.timePeople * 60);
    } else {
      const turnInterval = setInterval(() => {
        setTimeTurn(settingGame.timeTurn);
        setTimeTurn((prevTime) => {
          if (prevTime <= 0) {
            handleCheckWin(
              turnYour ? globalModel.PLAYER_1 : globalModel.PLAYER_2
            );
            clearInterval(turnInterval);
            return 0;
          }
          return prevTime - 1;
        });
        if (turnYour) {
          setTimePeople1((prevTime) => {
            if (prevTime <= 0) {
              handleCheckWin(globalModel.PLAYER_1);
              clearInterval(turnInterval);
              return 0;
            }
            return prevTime - 1;
          });
        } else {
          setTimePeople2((prevTime) => {
            if (prevTime <= 0) {
              handleCheckWin(globalModel.PLAYER_2);
              clearInterval(turnInterval);
              return 0;
            }
            return prevTime - 1;
          });
        }
      }, 1000);

      return () => clearInterval(turnInterval);
    }
  }, [turnYour, isWin]);
  // code ai
  useEffect(() => {
    if (!isWin && isRobot && !turnYour) {
      const fetchAndMove = async () => {
        await delay(2000);
        const player = globalModel.PLAYER_2;
        const move = aiMove(historyGame, player);
        if (move == null) {
          console.log("Không tìm thấy nước phù hợp để đánh");
        } else {
          handleClick(move, player);
        }
      };

      fetchAndMove();
    }
  }, [turnYour, isWin, isRobot]);

  // code đánh cờ
  const handleClick = (move: Move, player: number) => {
    if (checkPossibleMove(historyGame, move) && !stop) {
      const { row, col } = move;
      const historyTurn = historyGame;
      historyTurn.grid[row][col] = player;
      const isWiner = checkWin(historyTurn, move, player);
      if (isWiner) {
        setArrayMove(PositionMoveWin(historyGame, player, move));
        handleCheckWin(player);
      } else {
        setHistoryGame(historyTurn);
        setTurnYour(!turnYour);
      }
    }
  };
  const handleClickPlayer = (move: Move, player: number) => {
    if (isRobot) {
      if (turnYour) {
        handleClick(move, player);
      }
    } else {
      handleClick(move, player);
    }
  };
  //code chơi lại
  const handleReplay = () => {
    setIsWin(false);
    setPlayerWin(0);
    setArrayMove([]);
    setStop(false);
    loadData();
  };
  // code thoát game
  const handleBack = () => {
    navigate("/home");
  };
  //code chekc win
  const handleCheckWin = async (player: number) => {
    const currentScore = score;
    if (player === globalModel.PLAYER_1) {
      currentScore[0]++;
    } else {
      currentScore[1]++;
    }
    setScore(currentScore);
    setStop(true);
    await delay(4000);
    setIsWin(true);
    setPlayerWin(player);
  };
  return (
    <>
      <ModalReact
        title="Thoát khỏi phòng"
        data={<p>Bạn có chắc muốn thoát khoải phòng không</p>}
        show={Show}
        handleSave={handleBack}
        handleClose={handleClose}
        labelClose="Hủy"
        labelSave="Từ bỏ"
      />
      {loading === false ? (
        <>
          <section className="h-100">
            <div className="container-fluid h-100">
              <div className="row justify-content-center h-100">
                <div className="col-12 col-lg-8 h-100">
                  <div className="row py-3 px-0 border border-1 bg-body-tertiary  g-4 g-md-4">
                    <div className="col-6">
                      <div className="row justify-content-center align-items-center">
                        <div className="col-auto align-self-center position-relative d-none d-md-block">
                          <img
                            src={level}
                            alt=""
                            className=""
                            height={"30px"}
                          />
                          <span className="badge position-absolute top-50 start-50 translate-middle fs-6">
                            2
                          </span>
                        </div>
                        <div className="col-auto px-0 ">
                          <Player
                            player={globalModel.PLAYER_1}
                            height={"16px"}
                          />
                        </div>

                        <div className="col text-end px-0 ">
                          <p className="m-0">Robot1</p>
                          <p className="m-0">{changeTime(timePeople1)}</p>
                        </div>
                        <div className="col-auto position-relative ">
                          <img
                            src={avatar1}
                            alt=""
                            className="object-fit-contain rounded-circle"
                            height={"36px"}
                            width={"36px"}
                          />
                          {turnYour === true && isWin === false && (
                            <Circel
                              second={`${settingGame.timeTurn}s`}
                              className="position-absolute top-0 start-50 translate-middle"
                            />
                          )}
                        </div>
                        <div className="col-auto fw-medium ps-0 ">
                          {score[0]}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row justify-content-center align-items-center">
                        <div className="col-auto fw-medium  pe-0">
                          {score[1]}
                        </div>
                        <div className="col-auto position-relative ">
                          <img
                            src={avatar2}
                            alt=""
                            className="object-fit-contain rounded-circle"
                            height={"36px"}
                            width={"36px"}
                          />
                          {turnYour === false && isWin === false && (
                            <Circel
                              second={`${settingGame.timeTurn}s`}
                              className="position-absolute top-0  start-50 translate-middle"
                            />
                          )}
                        </div>
                        <div className="col text-start px-0 ">
                          <p className="m-0">Robot2</p>
                          <p className="m-0">{changeTime(timePeopel2)}</p>
                        </div>
                        <div className="col-auto px-0 ">
                          <Player
                            player={globalModel.PLAYER_2}
                            height={"16px"}
                          />
                        </div>
                        <div className="col-auto align-self-center position-relative d-none d-md-block">
                          <img
                            src={level}
                            alt=""
                            className=""
                            height={"30px"}
                          />
                          <span className="badge position-absolute top-50 start-50 translate-middle fs-6">
                            2
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!isWin ? (
                    <>
                      <div className="row border bg-white h-75">
                        <div
                          className="col d-md-flex justify-content-center align-items-center overflow-auto"
                          style={{ height: "100%" }}
                        >
                          <Board
                            row={row}
                            col={col}
                            turn={turnYour}
                            handleClick={handleClickPlayer}
                            historyGame={historyGame}
                            isRobot={isRobot}
                            arrayMove={arrayMove}
                            isStop={stop}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row g-3 h-75 align-items-center">
                        <div className="col-12 ">
                          <div className="row g-3 bg-white py-3 px-3 shadow-lg mb-5">
                            {isRobot ? (
                              <>
                                <div className="col-12 text-center fs-4 fw-bold text-uppercase">
                                  {playerWin === globalModel.PLAYER_1
                                    ? "Người chơi chiến thắng"
                                    : "Người chơi thua cuộc"}
                                </div>
                                <div className="col-10 col-md-11 align-self-center">
                                  <ProgressReact progress={100} />
                                </div>
                                <div className="col-2 col-md-1  align-self-center position-relative">
                                  <img
                                    src={level}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <span className="badge position-absolute top-50 start-50 translate-middle fs-5">
                                    2
                                  </span>
                                </div>

                                {playerWin === globalModel.PLAYER_1 && (
                                  <>
                                    <div className="col">Phần thưởng</div>
                                    <div className="col-auto">400</div>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="col-12 text-center fs-4 fw-bold text-uppercase">
                                  {playerWin === globalModel.PLAYER_1
                                    ? "Người chơi Robot1 chiến thắng"
                                    : "Người chơi Robot2 chiến thắng"}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="row">
                            <div className="col text-center">
                              <button
                                className="btn btn-success"
                                onClick={handleReplay}
                              >
                                Chơi lại !
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="row justify-content-between align-items-center p-3 border bg-body-tertiary">
                    <div className="col-auto">
                      <button
                        className="bg-body-tertiary rounded-2 px-3 py-1"
                        onClick={handleShow}
                      >
                        Từ bỏ
                      </button>
                    </div>
                    <div className="col-auto">
                      <i className="fa-solid fa-face-smile fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default PlayGame;
