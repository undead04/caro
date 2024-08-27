import * as React from "react";
import { useState } from "react";
const NotFound = () => {
  return (
    <>
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col ">
            <p className="fs-4 fw-bold text-center">
              Rất tiếc, chúng tôi không thể tìm thấy trang đó
            </p>
            <p className="fs-4  text-center">
              Nhưng chúng tôi có những trò chơi thú vị! Tại sao bạn không chơi
              một trò chơi để thay thế?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
