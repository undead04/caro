import * as React from "react";
import { useState } from "react";
import PageStart from "../pages/PageStart";
import { Route, Routes } from "react-router-dom";
import PlayGame from "../pages/PlayGame/PlayGame";
import Board from "../components/Board";
import NotFound from "../reudx/notFound/NotFound";
const LayoutDefault = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageStart />} />
        <Route path="/home" element={<PageStart />} />
        <Route path="/playGame/friend" element={<PlayGame isRobot={false} />} />
        <Route path="/playGame/robot" element={<PlayGame isRobot={true} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default LayoutDefault;
