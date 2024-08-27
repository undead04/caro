import React from "react";
import { useState } from "react";
import thumbnail from "../assets/thumbail.png";
import ProgressReact from "../components/ProgressReact";
import level from "../assets/level.svg";
import ModalReact from "../components/ModalReact";
import ModalSetUpGame from "./ModalSetUpGame";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../reudx/store";
import { settingGameState } from "../types";
import { setUp } from "../reudx/slices/settingGameSlice";
import { toast } from "react-toastify";
const PageStart = () => {
  const [show, setShow] = useState(false);
  const [isRobot, setIsRobot] = useState(true);
  const navigate = useNavigate();
  const handleShow = (isRobot: boolean) => {
    setShow(true);
    setIsRobot(isRobot);
  };
  const handleClose = () => setShow(false);
  const dispatch = useDispatch<AppDispatch>();
  const [settingGame, setSettingGame] = useState<settingGameState>({
    caro: "caro",
    timePeople: 5,
    timeTurn: 40,
    start: 0,
    mode: 0,
  });
  const handleSubmit = (
    e: React.FormEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setSettingGame({
      ...settingGame,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleSave = () => {
    if (settingGame.mode === 0 && !isRobot) {
      notify("Tính năng chơi online chưa được ra mắt");
    } else {
      dispatch(setUp(settingGame));
      handleClose();
      if (!isRobot) {
        navigate("/playGame/friend");
      } else {
        navigate("/playGame/robot");
      }
    }
  };
  const notify = (notify?: string) => {
    toast.warning(notify ? notify : "Tính năng này chưa được ra mắt");
  };
  return (
    <>
      <ModalReact
        show={show}
        data={
          <ModalSetUpGame
            handleChange={handleSubmit}
            settingGame={settingGame}
            isRobot={isRobot}
          />
        }
        handleClose={handleClose}
        title={isRobot ? "Chơi với robot" : "Chơi với một người bạn"}
        isDisabledCloseButton={true}
        handleSave={handleSave}
        labelSave="Tiếp tục"
      />
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-12 col-md-10 col-xl-8 bg-body-tertiary py-4 px-4 shadow-lg">
            <div className="row mb-3 align-items-center justify-content-center">
              <div className="col-12 col-md-auto text-center mb-3 mb-md-0 align-self-center">
                <p className="fs-3 fw-bold mb-0">Caro trực tuyến</p>
              </div>
              <div className="col-10 p-0 col-md align-self-center">
                <ProgressReact progress={50} />
              </div>
              <div className="col-2 col-md-1 align-self-center position-relative">
                <img src={level} alt="" className="img-fluid" />
                <span className="badge position-absolute top-50 start-50 translate-middle fs-4">
                  2
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-4 d-none d-md-block">
                <img src={thumbnail} alt="logo" className="img-fluid" />
              </div>
              <div className="col-12 col-md-8 p-0">
                <div className="row g-3">
                  <div className="col-12 ">
                    <button
                      type="button"
                      className="btn btn-success col-12 text-start fw-bold"
                      onClick={() => notify(undefined)}
                    >
                      <i className="fa-solid fa-globe"></i> Chơi trực tuyến
                    </button>
                  </div>
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-success col-12 text-start fw-bold"
                      onClick={() => handleShow(false)}
                    >
                      <i className="fa-solid fa-user-group"></i> Chơi với một
                      người bạn
                    </button>
                  </div>
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-outline-dark col-12 fw-bold text-start"
                      onClick={() => handleShow(true)}
                    >
                      <i className="fa-solid fa-robot"></i> Chơi với robot
                    </button>
                  </div>
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-outline-dark col-12 fw-bold text-start"
                      onClick={() => notify(undefined)}
                    >
                      <i className="fa-solid fa-trophy"></i> Tạo giải đâu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageStart;
