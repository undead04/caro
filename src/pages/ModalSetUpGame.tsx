import * as React from "react";
import { useState } from "react";
import Input from "../components/InputReact";
import SelectReact from "../components/SelectReac";
import { settingGameState } from "../types";
interface Prop {
  handleChange: any;
  settingGame: settingGameState;
  isRobot?: boolean;
}
const ModalSetUpGame: React.FC<Prop> = ({
  handleChange,
  settingGame,
  isRobot,
}) => {
  const [isSelect, setIsSelect] = useState(true);
  const handleToggleSelect = () => setIsSelect(!isSelect);
  return (
    <>
      <div className="container">
        <div className="row row-cols-1 g-3">
          <div className="col">
            <SelectReact
              label="Trò chơi"
              data={[
                {
                  lable: "Caro",
                  value: "caro",
                },
              ]}
              name="caro"
              value={settingGame.caro}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            {isSelect ? (
              <>
                <SelectReact
                  label="Thời gian mỗi lượt"
                  onChange={handleChange}
                  value={settingGame.timeTurn}
                  data={[
                    {
                      lable: "10 giây",
                      value: 10,
                    },
                    {
                      lable: "20 giây",
                      value: 20,
                    },
                    {
                      lable: "30 giây",
                      value: 30,
                    },
                    {
                      lable: "40 giây",
                      value: 40,
                    },
                    {
                      lable: "Không giới hạn",
                      value: Infinity,
                    },
                  ]}
                  name="timeTurn"
                  information="Mỗi người chơi có bao nhiêu thời gian để chơi một nước"
                />
              </>
            ) : (
              <>
                <Input
                  col={3}
                  name="timeTurn"
                  information="Mỗi người chơi có bao nhiêu thời gian để chơi một nước"
                  onChange={handleChange}
                  label="Thời gian mỗi lượt"
                  label2="Giây"
                  value={settingGame.timeTurn}
                />
              </>
            )}
          </div>
          <div className="col">
            {isSelect ? (
              <>
                <SelectReact
                  label="Số phút cho mỗi người chơi"
                  onChange={handleChange}
                  value={settingGame.timePeople}
                  data={[
                    {
                      lable: "2 phút",
                      value: 2,
                    },
                    {
                      lable: "3 phút",
                      value: 3,
                    },
                    {
                      lable: "4 phút",
                      value: 4,
                    },
                    {
                      lable: "5 phút",
                      value: 5,
                    },
                    {
                      lable: "Không giới hạn",
                      value: Infinity,
                    },
                  ]}
                  name="timePeople"
                  information="Mỗi người nhận được bao nhiêu thời gian để xong một ván chơi"
                />
              </>
            ) : (
              <>
                <Input
                  name="timePeople"
                  information="Mỗi người nhận được bao nhiêu thời gian để xong một ván chơi"
                  onChange={handleChange}
                  label="Số phút cho mỗi người chơi"
                  col={3}
                  label2="Phút"
                  value={settingGame.timePeople}
                />
              </>
            )}
          </div>
          <div className="col">
            <button
              className="btn btn-light border-black"
              onClick={handleToggleSelect}
            >
              Điều khiển thời gian tùy chỉnh
            </button>
          </div>
          <div className="col">
            <SelectReact
              label="Ai chơi trước"
              onChange={handleChange}
              value={settingGame.start}
              data={[
                {
                  lable: "Ngẫu nhiên",
                  value: 0,
                },
                {
                  lable: "Tôi bắt đầu trước",
                  value: 1,
                },
                {
                  lable: "Đối thủ bắt đầu trước",
                  value: 2,
                },
              ]}
              name="start"
            />
          </div>
          {isRobot === false && (
            <div className="col">
              <SelectReact
                label="Chế độ chơi"
                onChange={handleChange}
                value={settingGame.mode}
                data={[
                  {
                    lable: "Online",
                    value: 0,
                  },
                  {
                    lable: "Offline",
                    value: 1,
                  },
                ]}
                name="mode"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalSetUpGame;
